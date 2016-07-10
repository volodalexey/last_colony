var multiplayer = {
  // Open multiplayer game lobby
  websocket_url: "ws://localhost:8181/",
  websocket: null,
  start: function() {
    game.type = "multiplayer";
    var self = this, WebSocketObject = window.WebSocket || window.MozWebSocket;
    if (!WebSocketObject) {
      game.showMessageBox("Your browser does not support WebSocket. Multiplayer will not work.");
      return;
    }
    this.websocket = new WebSocketObject(this.websocket_url);
    this.websocket.onmessage = multiplayer.handleWebSocketMessage;
    // Display multiplayer lobby screen after connecting
    this.websocket.onopen = function() {
      // Hide the starting menu layer
      hideGameLayer();
      document.querySelector('#multiplayerlobbyscreen').style.display = 'block';
    };

    this.websocket.onclose = function() {
      multiplayer.endGame("Error connecting to server.");
    };

    this.websocket.onerror = function() {
      multiplayer.endGame("Error connecting to server.");
    }
  },
  handleWebSocketMessage: function(message) {
    var messageObject = JSON.parse(message.data);
    switch (messageObject.type) {
      case "room_list":
        multiplayer.updateRoomStatus(messageObject.status);
        break;
      case "joined_room":
        multiplayer.roomId = messageObject.roomId;
        multiplayer.color = messageObject.color;
        break;
      case "init_level":
        multiplayer.initMultiplayerLevel(messageObject);
        break;
      case "start_game":
        multiplayer.startGame();
        break;
      case "latency_ping":
        multiplayer.sendWebSocketMessage({type: "latency_pong"});
        break;
      case "game_tick":
        multiplayer.lastReceivedTick = messageObject.tick;
        multiplayer.commands[messageObject.tick] = messageObject.commands;
        break;
      case "end_game":
        multiplayer.endGame(messageObject.reason);
        break;
      case "chat":
        game.showMessage(messageObject.from, messageObject.message);
        break;
    }
  },
  statusMessages: {
    'starting': 'Game Starting',
    'running': 'Game in Progress',
    'waiting': 'Awaiting second player',
    'empty': 'Open'
  },
  updateRoomStatus: function(status) {
    var list = document.querySelector("#multiplayergameslist");
    list.options = []; // remove old options
    for (var i = 0; i < status.length; i++) {
      var key = "Game " + (i + 1) + ". " + this.statusMessages[status[i]];
      var option = document.createElement('option');
      option.disabled = status[i] == "running" || status[i] == "starting";
      option.value = i + 1;
      option.textContent = key;
      option.classList.add(status[i]);
      option.selected = (i + 1) == multiplayer.roomId;
      list.appendChild(option);
    }
  },
  join: function() {
    var selectedRoom = document.getElementById('multiplayergameslist').value;
    if (selectedRoom) {
      multiplayer.sendWebSocketMessage({type: "join_room", roomId: selectedRoom});
      document.getElementById('multiplayergameslist').disabled = true;
      document.getElementById('multiplayerjoin').disabled = true;
    } else {
      game.showMessageBox("Please select a game room to join.");
    }
  },
  cancel: function() {
    // Leave any existing game room
    if (multiplayer.roomId) {
      multiplayer.sendWebSocketMessage({type: "leave_room", roomId: multiplayer.roomId});
      document.getElementById('multiplayergameslist').disabled = false;
      document.getElementById('multiplayerjoin').disabled = false;
      delete multiplayer.roomId;
      delete multiplayer.color;
    } else {
      // Not in a room, so leave the multiplayer screen itself
      multiplayer.closeAndExit();
    }
  },
  closeAndExit: function() {
    // clear handlers and close connection
    multiplayer.websocket.onopen = null;
    multiplayer.websocket.onclose = null;
    multiplayer.websocket.onerror = null;
    multiplayer.websocket.close();
    multiplayer.websocket = null;

    document.getElementById('multiplayergameslist').disabled = false;
    document.getElementById('multiplayerjoin').disabled = false;
    // Show the starting menu layer
    hideGameLayer();
    document.querySelector('#gamestartscreen').style.display = 'block';
  },
  sendWebSocketMessage: function(messageObject) {
    this.websocket.send(JSON.stringify(messageObject));
  },
  currentLevel: 0,
  initMultiplayerLevel: function(messageObject) {
    hideGameLayer();
    var i, spawnLocations = messageObject.spawnLocations;

    // Initialize multiplayer related variables
    multiplayer.commands = [[]];
    multiplayer.lastReceivedTick = 0;
    multiplayer.currentTick = 0;

    game.team = multiplayer.color;

    // Load all the items for the level
    multiplayer.currentLevel = messageObject.level;
    var level = maps.multiplayer[multiplayer.currentLevel];

    // Load all the assets for the level
    game.currentMapImage = loader.loadImage(level.mapImage);
    game.currentLevel = level;

    // Setup offset based on spawn location sent by server

    // Load level Requirements 
    game.resetArrays();
    for (var type in level.requirements) {
      var requirementArray = level.requirements[type];
      for (i = 0; i < requirementArray.length; i++) {
        var name = requirementArray[i];
        if (window[type]) {
          window[type].load(name);
        } else {
          console.log('Could not load type :', type);
        }
      }
    }

    var itemDetails;
    for (i = level.items.length - 1; i >= 0; i--) {
      itemDetails = level.items[i];
      game.add(itemDetails);
    }

    // Add starting items for both teams at their respective spawn locations
    for (var team in spawnLocations) {
      var spawnIndex = spawnLocations[team];
      for (i = 0; i < level.teamStartingItems.length; i++) {
        itemDetails = Object.assign({}, level.teamStartingItems[i]);
        itemDetails.x += level.spawnLocations[spawnIndex].x + itemDetails.x;
        itemDetails.y += level.spawnLocations[spawnIndex].y + itemDetails.y;
        itemDetails.team = team;
        game.add(itemDetails);
      }

      if (team == game.team) {
        game.offsetX = level.spawnLocations[spawnIndex].startX * game.gridSize;
        game.offsetY = level.spawnLocations[spawnIndex].startY * game.gridSize;
      }
    }

    // Create a grid that stores all obstructed tiles as 1 and unobstructed as 0
    game.currentMapTerrainGrid = [];
    for (var y = 0; y < level.mapGridHeight; y++) {
      game.currentMapTerrainGrid[y] = [];
      for (var x = 0; x < level.mapGridWidth; x++) {
        game.currentMapTerrainGrid[y][x] = 0;
      }
    }
    
    for (i = level.mapObstructedTerrain.length - 1; i >= 0; i--) {
      var obstruction = level.mapObstructedTerrain[i];
      game.currentMapTerrainGrid[obstruction[1]][obstruction[0]] = 1;
    }
    
    game.currentMapPassableGrid = undefined;

    // Load Starting Cash For Game
    game.cash = Object.assign({}, level.cash);

    // Enable the enter mission button once all assets are loaded
    if (loader.loaded) {
      multiplayer.sendWebSocketMessage({type: "initialized_level"});

    } else {
      loader.onload = function() {
        multiplayer.sendWebSocketMessage({type: "initialized_level"});
      }
    }
  },
  startGame: function() {
    fog.initLevel();
    game.animationLoop();
    multiplayer.animationInterval = setInterval(multiplayer.tickLoop, game.animationTimeout);
    game.start();
  },
  sendCommand: function(uids, details) {
    multiplayer.sentCommandForTick = true;
    multiplayer.sendWebSocketMessage({
      type: "command",
      uids: uids,
      details: details,
      currentTick: multiplayer.currentTick
    });
  },
  tickLoop: function() {
    // if the commands for that tick have been received
    // execute the commands and move on to the next tick
    // otherwise wait for server to catch up        
    if (multiplayer.currentTick <= multiplayer.lastReceivedTick) {
      var commands = multiplayer.commands[multiplayer.currentTick];
      if (commands) {
        for (var i = 0; i < commands.length; i++) {
          game.processCommand(commands[i].uids, commands[i].details);
        }
      }

      game.animationLoop();

      // In case no command was sent for this current tick, send an empty command to the server
      // So that the server knows that everything is working smoothly
      if (!multiplayer.sentCommandForTick) {
        multiplayer.sendCommand();
      }
      multiplayer.currentTick++;
      multiplayer.sentCommandForTick = false;
    }
  },
  // Tell the server that the player has lost
  loseGame: function() {
    multiplayer.sendWebSocketMessage({type: "lose_game"});
  },
  endGame: function(reason) {
    game.running = false;
    clearInterval(multiplayer.animationInterval);
    // Show reason for game ending, and on OK, exit multiplayer screen
    game.showMessageBox(reason, multiplayer.closeAndExit);
  }
};

window.onkeydown = function(e) {
  // Chatting only allowed in multiplayer when game is running
  if (game.type != "multiplayer" || !game.running) {
    return;
  }
  var keyCode = e.keyCode, chat_message = document.querySelector('#chatmessage');
  switch (keyCode) {
    case 13: // Enter key pressed
      var isVisible = chat_message.style.display !== 'none';
      if (isVisible) {
        // if chat box is visible, pressing enter sends the message and hides the chat box
        if (chat_message.value != '') {
          multiplayer.sendWebSocketMessage({type: "chat", message: chat_message.value});
          chat_message.value = '';
        }
        chat_message.style.display = 'none';
      } else {
        // if chat box is not visible, pressing enter shows the chat box
        chat_message.style.display = 'block';
        chat_message.focus();
      }
      e.preventDefault();
      break;
    case 27: // Escape key pressed
      // Pressing escape hides the chat box
      chat_message.style.display = 'none';
      chat_message.value = '';
      e.preventDefault();
      break;
  }
};