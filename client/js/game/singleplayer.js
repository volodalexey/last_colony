const
  engine = require('./engine'),
  fog = require('./fog'),
  maps = require('./maps'),
  buildings = require('./buildings'),
  vehicles = require('./vehicles'),
  bullets = require('./bullets'),
  items = {
    buildings,
    vehicles
  };

const singlePlayer = {
  start() {
    singlePlayer.currentLevel = 0;
    engine.type = "singleplayer";
    engine.team = "blue";
    this.startCurrentLevel();
  },

  exit: function() {
    // Show the starting menu layer
    hideGameLayer();
    document.querySelector('#gamestartscreen').style.display = 'block';
  },

  currentLevel: 0,

  startCurrentLevel() {
    let level = maps.singleplayer[this.currentLevel];
    engine.currentLevel = level;
    engine.offsetX = level.startX * engine.gridSize;
    engine.offsetY = level.startY * engine.gridSize;

    // Load level Requirements
    engine.resetArrays();

    for (let type of Object.keys(level.requirements)) {
      let requirementArray = level.requirements[type];
      for (let name of requirementArray) {
        if (items[type]) {
          let weaponType = items[type].load(name);
          if (weaponType) {
            bullets.load(weaponType);
          }
        } else {
          console.error('Could not load type :', type);
        }
      }
    }

    for (var i = level.items.length - 1; i >= 0; i--) {
      var itemDetails = level.items[i];
      engine.add(itemDetails);
    }

    // Create a grid that stores all obstructed tiles as 1 and unobstructed as 0
    engine.currentMapTerrainGrid = [];
    for (var y = 0; y < level.mapGridHeight; y++) {
      engine.currentMapTerrainGrid[y] = [];
      for (var x = 0; x < level.mapGridWidth; x++) {
        engine.currentMapTerrainGrid[y][x] = 0;
      }
    }
    for (var i = level.mapObstructedTerrain.length - 1; i >= 0; i--) {
      var obstruction = level.mapObstructedTerrain[i];
      engine.currentMapTerrainGrid[obstruction[1]][obstruction[0]] = 1;
    }
    engine.currentMapPassableGrid = undefined;

    // Load Starting Cash For Game
    engine.cash = Object.assign({}, level.cash);
  },

  play() {
    let level = maps.singleplayer[this.currentLevel];
    fog.initLevel(level.mapGridWidth, level.mapGridHeight, engine.gridSize);
    engine.animationLoop();
    engine.animationInterval = setInterval(engine.animationLoop, engine.animationTimeout);
    engine.start();
  },
  sendCommand: function(uids, details) {
    game.processCommand(uids, details);
  },
  endLevel: function(success) {
    var self = this;
    clearInterval(game.animationInterval);
    game.end();

    if (success) {
      var moreLevels = (singlePlayer.currentLevel < maps.singlePlayer.length - 1);
      if (moreLevels) {
        game.showMessageBox("Mission Accomplished.", function() {
          hideGameLayer();
          singlePlayer.currentLevel++;
          singlePlayer.startCurrentLevel();
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
        singlePlayer.startCurrentLevel();
      }, function() {
        hideGameLayer();
        document.querySelector('#gamestartscreen').style.display = 'block';
      });
    }
  }
};

module.exports = singlePlayer;