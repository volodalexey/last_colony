var sidebar = {
  enableSidebarButtons: function() {
    // Buttons only enabled when appropriate building is selected
    Array.prototype.slice
      .call(document.querySelectorAll("#gameinterfacescreen #sidebarbuttons input[type='button'] "))
      .forEach(function(button) {
        button.disabled = true;
      });

    // If no building selected, then no point checking below
    if (game.selectedItems.length == 0) {
      return;
    }
    var baseSelected = false;
    var starportSelected = false;
    // Check if base or starport is selected
    for (var i = game.selectedItems.length - 1; i >= 0; i--) {
      var item = game.selectedItems[i];
      //  Check If player selected a healthy,inactive building (damaged buildings can't produce)
      if (item.type == "buildings" && item.team == game.team && item.lifeCode == "healthy" && item.action == "stand") {
        if (item.name == "base") {
          baseSelected = true;
        } else if (item.name == "starport") {
          starportSelected = true;
        }
      }
    }

    var cashBalance = game.cash[game.team];
    /* Enable building buttons if base is selected,building has been loaded in requirements, not in deploy building mode and player has enough money*/
    if (baseSelected && !game.deployBuilding) {
      if (game.currentLevel.requirements.buildings.indexOf('starport') > -1 && cashBalance >= buildings.list["starport"].cost) {
        document.querySelector("#starportbutton").disabled = false;
      }
      if (game.currentLevel.requirements.buildings.indexOf('ground-turret') > -1 && cashBalance >= buildings.list["ground-turret"].cost) {
        document.querySelector("#turretbutton").disabled = false;
      }
    }

    /* Enable unit buttons if startport is selected, unit has been loaded in requirements, and player has enough money*/

    if (starportSelected) {
      if (game.currentLevel.requirements.vehicles.indexOf('scout-tank') > -1 && cashBalance >= vehicles.list["scout-tank"].cost) {
        document.querySelector("#scouttankbutton").disabled = false;
      }
      if (game.currentLevel.requirements.vehicles.indexOf('heavy-tank') > -1 && cashBalance >= vehicles.list["heavy-tank"].cost) {
        document.querySelector("#heavytankbutton").disabled = false;
      }
      if (game.currentLevel.requirements.vehicles.indexOf('harvester') > -1 && cashBalance >= vehicles.list["harvester"].cost) {
        document.querySelector("#harvesterbutton").disabled = false;
      }
      if (game.currentLevel.requirements.aircraft.indexOf('chopper') > -1 && cashBalance >= aircraft.list["chopper"].cost) {
        document.querySelector("#chopperbutton").disabled = false;
      }
      if (game.currentLevel.requirements.aircraft.indexOf('wraith') > -1 && cashBalance >= aircraft.list["wraith"].cost) {
        document.querySelector("#wraithbutton").disabled = false;
      }
    }
  },
  animate: function() {
    // Display the current cash balance value
    document.querySelector('#cash').innerHTML = game.cash[game.team];

    //  Enable or disable buttons as appropriate
    this.enableSidebarButtons();

    if (game.deployBuilding) {
      // Create the buildable grid to see where building can be placed
      game.rebuildBuildableGrid();
      // Compare with buildable grid to see where we need to place the building
      var placementGrid = buildings.list[game.deployBuilding].buildableGrid;
      game.placementGrid = placementGrid.map(g => g.slice());
      game.canDeployBuilding = true;
      for (var i = game.placementGrid.length - 1; i >= 0; i--) {
        for (var j = game.placementGrid[i].length - 1; j >= 0; j--) {
          if (game.placementGrid[i][j] &&
            (mouse.gridY + i >= game.currentLevel.mapGridHeight || mouse.gridX + j >= game.currentLevel.mapGridWidth
            || game.currentMapBuildableGrid[mouse.gridY + i][mouse.gridX + j] == 1 || fog.grid[game.team][mouse.gridY + i][mouse.gridX + j] == 1)) {
            game.canDeployBuilding = false;
            game.placementGrid[i][j] = 0;
          }
        }
      }
    }
  },
  init: function() {
    // Initialize unit construction buttons
    document.querySelector("#scouttankbutton").onclick = function() {
      sidebar.constructAtStarport({type: "vehicles", "name": "scout-tank"});
    };
    document.querySelector("#heavytankbutton").onclick = function() {
      sidebar.constructAtStarport({type: "vehicles", "name": "heavy-tank"});
    };
    document.querySelector("#harvesterbutton").onclick = function() {
      sidebar.constructAtStarport({type: "vehicles", "name": "harvester"});
    };
    document.querySelector("#chopperbutton").onclick = function() {
      sidebar.constructAtStarport({type: "aircraft", "name": "chopper"});
    };
    document.querySelector("#wraithbutton").onclick = function() {
      sidebar.constructAtStarport({type: "aircraft", "name": "wraith"});
    };

    //Initialize building construction buttons
    document.querySelector("#starportbutton").onclick = function() {
      game.deployBuilding = "starport";
    };
    document.querySelector("#turretbutton").onclick = function() {
      game.deployBuilding = "ground-turret";
    };
  },
  constructAtStarport: function(unitDetails) {
    var starport;
    // Find the first eligible starport among selected items
    for (var i = game.selectedItems.length - 1; i >= 0; i--) {
      var item = game.selectedItems[i];
      if (item.type == "buildings" && item.name == "starport"
        && item.team == game.team && item.lifeCode == "healthy" && item.action == "stand") {
        starport = item;
        break;
      }
    }
    if (starport) {
      game.sendCommand([starport.uid], {type: "construct-unit", details: unitDetails});
    }
  },
  cancelDeployingBuilding: function() {
    game.deployBuilding = undefined;
  },
  finishDeployingBuilding: function() {
    var buildingName = game.deployBuilding;
    var base;
    for (var i = game.selectedItems.length - 1; i >= 0; i--) {
      var item = game.selectedItems[i];
      if (item.type == "buildings" && item.name == "base" && item.team == game.team && item.lifeCode == "healthy" && item.action == "stand") {
        base = item;
        break;
      }
    }

    if (base) {
      var buildingDetails = {type: "buildings", name: buildingName, x: mouse.gridX, y: mouse.gridY};
      game.sendCommand([base.uid], {type: "construct-building", details: buildingDetails});
    }

    // Clear deployBuilding flag
    game.deployBuilding = undefined;
  }
};
