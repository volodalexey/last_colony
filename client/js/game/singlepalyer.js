
const singleplayer = {
  start() {
    singleplayer.currentLevel = 2;
    game.type = "singleplayer";
    game.team = "blue";

    // Finally start the level
    singleplayer.startCurrentLevel();
  },
  exit: function() {
    // Show the starting menu layer
    hideGameLayer();
    document.querySelector('#gamestartscreen').style.display = 'block';
  },
  currentLevel: 0,
  startCurrentLevel: function() {
    // Load all the items for the level
    var level = maps.singleplayer[singleplayer.currentLevel];

    // Don't allow player to enter mission until all assets for the level are loaded
    document.querySelector("#entermission").disabled = false;

    // Load all the assets for the level
    game.currentMapImage = loader.loadImage(level.mapImage);
    game.currentLevel = level;

    game.offsetX = level.startX * game.gridSize;
    game.offsetY = level.startY * game.gridSize;

    // Load level Requirements
    game.resetArrays();
    for (var type in level.requirements) {
      var requirementArray = level.requirements[type];
      for (var i = 0; i < requirementArray.length; i++) {
        var name = requirementArray[i];
        if (window[type]) {
          window[type].load(name);
        } else {
          console.log('Could not load type :', type);
        }
      }
    }

    for (var i = level.items.length - 1; i >= 0; i--) {
      var itemDetails = level.items[i];
      game.add(itemDetails);
    }

    // Create a grid that stores all obstructed tiles as 1 and unobstructed as 0
    game.currentMapTerrainGrid = [];
    for (var y = 0; y < level.mapGridHeight; y++) {
      game.currentMapTerrainGrid[y] = [];
      for (var x = 0; x < level.mapGridWidth; x++) {
        game.currentMapTerrainGrid[y][x] = 0;
      }
    }
    for (var i = level.mapObstructedTerrain.length - 1; i >= 0; i--) {
      var obstruction = level.mapObstructedTerrain[i];
      game.currentMapTerrainGrid[obstruction[1]][obstruction[0]] = 1;
    }
    game.currentMapPassableGrid = undefined;

    // Load Starting Cash For Game
    game.cash = Object.assign({}, level.cash);

    // Enable the enter mission button once all assets are loaded
    if (loader.loaded) {
      document.querySelector("#entermission").disabled = false;
    } else {
      loader.onload = function() {
        document.querySelector("#entermission").disabled = false;
      }
    }

    // Load the mission screen with the current briefing
    document.querySelector('#missonbriefing').innerHTML = '<h2>' + level.name + '</h2>' + level.briefing.replace(/\n/g, '<br /><br />');
    document.querySelector("#missionscreen").style.display = 'block';
  },
  play: function() {
    fog.initLevel();
    game.animationLoop();
    game.animationInterval = setInterval(game.animationLoop, game.animationTimeout);
    game.start();
  },
  sendCommand: function(uids, details) {
    game.processCommand(uids, details);
  },
  endLevel: function(success) {
    var self = this;
    clearInterval(game.animationInterval);
    game.end();

    if (success) {
      var moreLevels = (singleplayer.currentLevel < maps.singleplayer.length - 1);
      if (moreLevels) {
        game.showMessageBox("Mission Accomplished.", function() {
          hideGameLayer();
          singleplayer.currentLevel++;
          singleplayer.startCurrentLevel();
        });
      } else {
        game.showMessageBox("Mission Accomplished.<br><br>This was the last mission in the campaign.<br><br>Thank You for playing.", function() {
          hideGameLayer();
          document.querySelector('#gamestartscreen').style.display = 'block';
        });
      }
    } else {
      game.showMessageBox("Mission Failed.<br><br>Try again?", function() {
        hideGameLayer();
        singleplayer.startCurrentLevel();
      }, function() {
        hideGameLayer();
        document.querySelector('#gamestartscreen').style.display = 'block';
      });
    }
  }
};