'use strict';
const
  http = require('http'),
  path = require('path'),
  fs = require('fs'),
  rootFile = 'index.html',
  rootFilePath = path.join(__dirname, rootFile),
  port = 8181,
  server = http.createServer(),
  WebSocket = require('ws'),
  WebSocketServer = WebSocket.Server,
  webSocketServer = new WebSocketServer({server: server});

// convert any objects to JSON string format
var toJSON = function(_object) {
  return JSON.stringify(_object);
};

// read async file by provided path
var readStaticFile = function(options, req, res) {

  fs.stat(options.fullPath, function(err, fileStat) {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/json'});
      res.end(toJSON(err), 'utf-8');
      return;
    }

    fs.readFile(options.fullPath, options.encoding, function(err, fileContent) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/json'});
        res.end(toJSON(err), 'utf-8');
        return;
      }

      console.log(options.fullPath, options.encoding, options.contentType, fileStat.size);
      res.writeHead(200, {'Content-Type': options.contentType, 'Content-Length': fileStat.size});
      res.end(fileContent, options.encoding);
    });
  });
};

// create server that serves static files
server.on('request', function(req, res) {
  var fullPath;
  if (req.url === '/') {
    fullPath = rootFilePath;
  } else {
    fullPath = path.join(__dirname, req.url);
  }
  var extname = path.extname(fullPath), contentType, encoding;
  switch (extname) {
    case '.html':
      contentType = 'text/html';
      encoding = 'utf-8';
      break;
    case '.js':
      contentType = 'text/javascript';
      encoding = 'utf-8';
      break;
    case '.css':
      contentType = 'text/css';
      encoding = 'utf-8';
      break;
    case '.json':
      contentType = 'application/json';
      encoding = 'utf-8';
      break;
    case '.png':
      contentType = 'image/png';
      encoding = 'binary';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      encoding = 'binary';
      break;
    case '.ico':
      contentType = 'image/x-icon';
      encoding = 'binary';
      break;
    case '.gif':
      contentType = 'image/gif';
      encoding = 'binary';
      break;
    case '.mp3':
      contentType = 'audio/mpeg';
      encoding = 'binary';
      break;
    case '.ogg':
      contentType = 'audio/ogg';
      encoding = 'binary';
      break;
  }

  if (contentType && encoding) {
    readStaticFile({contentType: contentType, encoding: encoding, fullPath: fullPath}, req, res);
  } else {
    res.writeHead(400, {'Content-Type': 'text/json'});
    res.end(toJSON({message: "File is not found or doesn't exist!"}), 'utf-8');
  }
});

server.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Server is listening on http://localhost:' + server.address().port + ' Ctrl+C to stop;');
});

// Logic to determine whether a specified connection is allowed.
const
  wscIsAllowed = function(wsc) {
    // Check criteria such as request.origin, request.remoteAddress
    return true;
  },
  wscIsNotAllowed = function(wsc) {
    return !wscIsAllowed(wsc);
  },
  measureLatency = function(player) {
    let wsc = player.wsc,
      measurement = {start: Date.now()};
    player.latencyTrips.push(measurement);
    let clientMessage = {type: "latency_ping"};
    wsc.send(JSON.stringify(clientMessage));
  },
  getRoomsStatuses = function() {
    return gameRooms.map(room => room.status);
  },
  createRoomsStatusesMessage = function() {
    return {type: "room_list", status: getRoomsStatuses()};
  },
  sendRoomList = function(wsc) {
    let clientMessage = createRoomsStatusesMessage();
    wsc.send(JSON.stringify(clientMessage));
  },
  sendRoomListToEveryone = function() {
    let clientMessage = createRoomsStatusesMessage(),
      clientMessageString = JSON.stringify(clientMessage);
    // Notify all connected players of the room status changes
    for (let player of players) {
      player.wsc.send(clientMessageString);
    }
  },
  initGame = function(room) {
    console.log("Both players Joined. Initializing game for Room " + room.roomId);

    // Number of players who have loaded the level
    room.playersReady = 0;

    // Load the first multiplayer level for both players
    // This logic can change later to let the players pick a level
    // Randomly select two spawn locations between 0 and 3 for both players.
    let currentLevel = 0,
      spawns = [0, 1, 2, 3],
      spawnLocations = {
        "blue": spawns.splice(Math.floor(Math.random() * spawns.length), 1),
        "green": spawns.splice(Math.floor(Math.random() * spawns.length), 1)
      };

    sendRoomWebSocketMessage(room, {type: "init_level", spawnLocations: spawnLocations, level: currentLevel});
  },
  joinRoom = function(player, roomId) {
    let room = gameRooms[roomId - 1];
    console.log("Adding player to room", roomId);
    // Add the player to the room
    room.players.push(player);
    player.room = room;
    // Update room status
    if (room.players.length == 1) {
      room.status = "waiting";
      player.color = "blue";
    } else if (room.players.length == 2) {
      room.status = "starting";
      player.color = "green";
    }
    // Confirm to player that he was added
    let confirmationMessageString = JSON.stringify({type: "joined_room", roomId: roomId, color: player.color});
    player.connection.send(confirmationMessageString);
    return room;
  },
  leaveRoom = function(player, roomId) {
    let room = gameRooms[roomId - 1];
    console.log("Removing player from room", roomId);
    for (let i = room.players.length - 1; i >= 0; i--) {
      if (room.players[i] == player) {
        room.players.splice(i, 1);
      }
    }
    delete player.room;
    // Update room status
    if (room.players.length == 0) {
      room.status = "empty";
    } else if (room.players.length == 1) {
      room.status = "waiting";
    }
  },
  sendRoomWebSocketMessage = function(room, messageObject) {
    let messageString = JSON.stringify(messageObject);
    for (let i = room.players.length - 1; i >= 0; i--) {
      room.players[i].connection.send(messageString);
    }
  },
  startGame = function(room) {
    console.log("Both players are ready. Starting game in room", room.roomId);
    room.status = "running";
    sendRoomListToEveryone();
    // Notify players to start the game
    sendRoomWebSocketMessage(room, {type: "start_game"});

    room.commands = [];
    room.lastTickConfirmed = {"blue": 0, "green": 0};
    room.currentTick = 0;

    // Calculate tick lag for room as the max of both player's tick lags
    var roomTickLag = Math.max(room.players[0].tickLag, room.players[1].tickLag);

    room.interval = setInterval(function() {
      // Confirm that both players have send in commands for upto present tick
      if (room.lastTickConfirmed["blue"] >= room.currentTick && room.lastTickConfirmed["green"] >= room.currentTick) {
        // Commands should be executed after the tick lag
        sendRoomWebSocketMessage(room, {
          type: "game_tick",
          tick: room.currentTick + roomTickLag,
          commands: room.commands
        });
        room.currentTick++;
        room.commands = [];
      } else {
        // One of the players is causing the game to lag. Handle appropriately
        if (room.lastTickConfirmed["blue"] < room.currentTick) {
          console.log("Room", room.roomId, "Blue is lagging on Tick:", room.currentTick, "by", room.currentTick - room.lastTickConfirmed["blue"]);
        }
        if (room.lastTickConfirmed["green"] < room.currentTick) {
          console.log("Room", room.roomId, "Green is lagging on Tick:", room.currentTick, "by", room.currentTick - room.lastTickConfirmed["green"]);
        }
      }
    }, 100);
  },
  finishMeasuringLatency = function(player) {
    let measurement = player.latencyTrips[player.latencyTrips.length - 1];
    measurement.end = Date.now();
    measurement.roundTrip = measurement.end - measurement.start;
    player.averageLatency = 0;
    for (let i = 0; i < player.latencyTrips.length; i++) {
      player.averageLatency += measurement.roundTrip / 2;
    }
    player.averageLatency = player.averageLatency / player.latencyTrips.length;
    player.tickLag = Math.round(player.averageLatency * 2 / 100) + 1;
    console.log("Measuring Latency for player. Attempt", player.latencyTrips.length, "- Average Latency:", player.averageLatency, "Tick Lag:", player.tickLag);
  },
  endGame = function(room, reason) {
    clearInterval(room.interval);
    room.status = "empty";
    sendRoomWebSocketMessage(room, {type: "end_game", reason: reason});
    for (let i = room.players.length - 1; i >= 0; i--) {
      leaveRoom(room.players[i], room.roomId);
    }
    sendRoomListToEveryone();
  };

// Initialize a set of rooms
var gameRooms = [];
for (var i = 0; i < 10; i++) {
  gameRooms.push({status: "empty", players: [], roomId: i + 1});
}

var players = [];
webSocketServer.on('connection', (wsc) => {
  if (wscIsNotAllowed(wsc)) {
    wsc.close();
    return console.log('Web socket connection rejected!');
  }
  console.log('New web socket connection');
  // Add the player to the players array
  var player = {
    wsc: wsc,
    latencyTrips: []
  };
  players.push(player);

  // Measure latency for player
  measureLatency(player);

  // Send a fresh game room status list the first time player connects
  sendRoomList(wsc);

  // On Message event handler for a connection
  wsc.on('message', function(message) {
    if (message.type === 'utf8') {
      let clientMessage = JSON.parse(message.utf8Data);
      switch (clientMessage.type) {
        case "join_room":
          var room = joinRoom(player, clientMessage.roomId);
          sendRoomListToEveryone();
          if (room.players.length == 2) {
            initGame(room);
          }
          break;
        case "leave_room":
          leaveRoom(player, clientMessage.roomId);
          sendRoomListToEveryone();
          break;
        case "initialized_level":
          player.room.playersReady++;
          if (player.room.playersReady == 2) {
            startGame(player.room);
          }
          break;
        case "latency_pong":
          finishMeasuringLatency(player, clientMessage);
          // Measure latency atleast thrice
          if (player.latencyTrips.length < 3) {
            measureLatency(player);
          }
          break;
        case "command":
          if (player.room && player.room.status == "running") {
            if (clientMessage.uids) {
              player.room.commands.push({uids: clientMessage.uids, details: clientMessage.details});
            }
            player.room.lastTickConfirmed[player.color] = clientMessage.currentTick + player.tickLag;
          }
          break;
        case "lose_game":
          endGame(player.room, "The " + player.color + " team has been defeated.");
          break;
        case "chat":
          if (player.room && player.room.status == "running") {
            var cleanedMessage = clientMessage.message.replace(/[<>]/g, "");
            sendRoomWebSocketMessage(player.room, {type: "chat", from: player.color, message: cleanedMessage});
            console.log(clientMessage.message, "was cleaned to", cleanedMessage)
          }
          break;
      }
    }
  });

  wsc.on('close', function(reasonCode, description) {
    console.log('Web socket connection is closed');

    for (let i = players.length - 1; i >= 0; i--) {
      if (players[i] == player) {
        players.splice(i, 1);
      }
    }

    // If the player is in a room, remove him from room and notify everyone
    if (player.room) {
      let status = player.room.status,
        roomId = player.room.roomId;
      // If the game was running, end the game as well
      if (status == "running") {
        endGame(player.room, "The " + player.color + " player has disconnected.");
      } else {
        leaveRoom(player, roomId);
      }
      sendRoomListToEveryone();
    }

  });
});

