// TODO: implement this arg in looping of maps
;(function(exports) {
  "use strict"; //TODO: understand strict mode

  // UI Renderer object
  // ----------------

  // Abstracts visual logic from game logic
  var Renderer = function(canvasId) {
    this.canvasId = canvasId;
  };

  Renderer.prototype = {
    canvas: function() {
      return document.getElementById(this.canvasId);
    },
    ctx: function() {
      return this.canvas().getContext("2d");
    },
    gameSize: function() {
      return { x: this.canvas().width, y: this.canvas().height };
    },
    clearRect: function() {
      this.ctx().clearRect(0, 0, this.gameSize().x, this.gameSize().y);
    },
    setStrokeColour: function(colour) {
      this.ctx().strokeStyle = colour;
    },
    drawRect: function(x, y, w, h, isAlive) {
      var ctx = this.ctx();
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fillStyle = isAlive ? '#6495ed' : '#ffffff';
      ctx.stroke();
      ctx.fill();
    }
  };

  // Main game object
  // ----------------

  // Creates the game object with the game state and logic.
  var Game = function(renderer) {
    //TODO: use const's
    // const DEAD = 0;
    // const ALIVE = 1;
    this.renderer = renderer;
    this.cellSize = 10;

    this.cells = new Map();
    this.aliveCells = new Map();
    this.init();
  };

  Game.prototype = {
    start: function(seedType) {
      console.log("Starting game...");
      // first tick
      // this.init();
      // this.updateGameBoard(this.aliveCells);

      // TODO: implement UI slider to chage interval time
      var self = this;
      this.intervalId = setInterval(function() {
        self.tick();
      }, 60);
      console.log("Starting animation with id: " + this.intervalId);
    },
    stop: function() {
      console.log("Stopping animation with id: " + this.intervalId);
      clearInterval(this.intervalId);
    },
    tick: function() {
      // apply game logic and re-render canvas
      this.step();
    },
    init: function() {
      this.initCells();
      this.initGameBoard();
    },
    initCells: function() {
      console.log("Init all cells as dead.");
      this.cells.clear();
      this.aliveCells.clear();
      var numCells = this.numCells(this.renderer.gameSize(), this.cellSize);
      console.log("GameBoard initialized to width: " + numCells.x + " and height: " + numCells.y);

      // init cells to be dead
      for (var i = 0; i < numCells.y; i++) {
        for (var j = 0; j < numCells.x; j++) {
          var cell = new Cell(j, i, false, numCells);
          this.cells.set(cell.toString(), cell);
        }
      }
      console.log("Finished initializing cells");
    },
    numCells: function(gameSize, cellSize) {
      var numCellsX = gameSize.x / cellSize;
      var numCellsY = gameSize.y / cellSize;

      return {x: numCellsX, y: numCellsY, maxX: numCellsX -1, maxY: numCellsY -1};
    },
    seed: function(seedType) {
      console.log("Seeding board.");
      this.init();

      var gameSize = this.renderer.gameSize();
      var self = this;

      // TODO: refactor
      switch (seedType) {
        case "random":
          // TODO: fix this is broken
          this.cells.forEach(function(cell, key, cells) {
            var randomNumber = Math.random() >= 0.5;
            var cell1 = new Cell(cell.x, cell.y, randomNumber, gameSize);

            self.cells.set(cell1.toString(), cell1);
            if (cell1.isAlive == true) {
              self.aliveCells.set(cell1.toString(), cell1);
            }
          });
          break;
        case "glider":
          var cell1 = new Cell(1, 3, true, gameSize);
          var cell2 = new Cell(1, 4, true, gameSize);
          var cell3 = new Cell(2, 4, true, gameSize);
          var cell4 = new Cell(2, 5, true, gameSize);
          var cell5 = new Cell(0, 5, true, gameSize);

          this.cells.set(cell1.toString(), cell1);
          this.cells.set(cell2.toString(), cell2);
          this.cells.set(cell3.toString(), cell3);
          this.cells.set(cell4.toString(), cell4);
          this.cells.set(cell5.toString(), cell5);

          this.aliveCells.set(cell1.toString(), cell1);
          this.aliveCells.set(cell2.toString(), cell2);
          this.aliveCells.set(cell3.toString(), cell3);
          this.aliveCells.set(cell4.toString(), cell4);
          this.aliveCells.set(cell5.toString(), cell5);

          break;
        case "oscillator":
          cell1 = new Cell(1, 0, true, gameSize);
          cell2 = new Cell(1, 1, true, gameSize);
          cell3 = new Cell(1, 2, true, gameSize);

          this.cells.set(cell1.toString(), cell1);
          this.cells.set(cell2.toString(), cell2);
          this.cells.set(cell3.toString(), cell3);

          this.aliveCells.set(cell1.toString(), cell1);
          this.aliveCells.set(cell2.toString(), cell2);
          this.aliveCells.set(cell3.toString(), cell3);
          break;
      }

      // paint
      this.updateGameBoard(this.aliveCells);
    },
    // TODO: remove me
    makeCellKey: function(x, y) {
      return x + "/" + y;
    },
    // runs the main game logic.
    step: function() {
      console.log("**********************************************************");
      var cellsToUpdate = this.applyRulesToCells();
      this.updateGameBoard(cellsToUpdate);
      console.log("**********************************************************");
    },
    applyRulesToCells: function() {
      console.log("Applying game rules to cells.");
      console.log("Alive cells total: " + this.aliveCells.size);
      var cellsToUpdate = new Map();

      // switch algorithms depending on how many live cells are on the board
      if (this.aliveCells.size > 50) {
        this.algorithm2(cellsToUpdate);
      } else {
        this.algorithm1(cellsToUpdate);
      }

      return cellsToUpdate;
    },
    algorithm1: function(cellsToUpdate) {
      console.log("Applying algorithm1 cells");

      var uniqueCellsToCheck = new Set();

      // TODO: refactor, this is ugly
      var self = this;
      //TODO: this map returns a length of 5 even when something is deleted, its weird!
      this.aliveCells.forEach(function(cell, key, array) {
        if (cell != undefined) {
          cell.initNeighbours();
          // get neighbour coordinates of each cell that is currently alive
          // for each neighbour coordinate apply cell life logic
          uniqueCellsToCheck.add(key);
          cell.neighbours.forEach(function(key, index, array) {
            uniqueCellsToCheck.add(key);
          });
        }
      });

      console.log("Number of unique cells to check: " + uniqueCellsToCheck.size);
      uniqueCellsToCheck.forEach(function(key, index, array) {
        var cell = self.cells.get(key);
        self.stepLogic(cell, cellsToUpdate);
      });
    },
    algorithm2: function(cellsToUpdate) {
      console.log("Applying algorithm2 cells");
      var numCells = this.numCells(this.renderer.gameSize(), this.cellSize);

      var self = this;
      this.cells.forEach(function(cell, key, cells) {
        var numNbrs = self.countAlgorithm2Neighbours(cell.x, cell.y, cells);

        if (cell.isAlive) {
          switch (numNbrs) {
            case 0:
            case 1:
              cellsToUpdate.set(key, new Cell(cell.x, cell.y, false, numCells));
              // console.log("cell x: " + keyArr[0] + " y:" + keyArr[1] + " now dead " + cellsToUpdate.get(key));
              break;
            case 2:
            case 3:
              // keep alive
              cellsToUpdate.set(key, new Cell(cell.x, cell.y, true, numCells));
              break;
            case 4:
            default:
              cellsToUpdate.set(key, new Cell(cell.x, cell.y, false, numCells));
              // console.log("cell x: " + keyArr[0] + " y:" + keyArr[1] + " now dead " + cellsToUpdate.get(key));
          }
        } else {
          if (numNbrs == 3) {
            cellsToUpdate.set(key, new Cell(cell.x, cell.y, true, numCells));
            // console.log("cell x: " + keyArr[0] + " y:" + keyArr[1] + " now alive " + cellsToUpdate.get(key));
          }
        }

      })
    },
    countAlgorithm2Neighbours: function(x, y, cells) {
      // get values of adjacent cells
      var numNbrs = 0;

      var topLeftNbr = cells.get(this.makeCellKey(x-1, y-1));
      var topMidNbr = cells.get(this.makeCellKey(x, y-1));
      var topRightNbr = cells.get(this.makeCellKey(x+1, y-1));
      var rightNbr = cells.get(this.makeCellKey(x+1, y));
      var leftNbr = cells.get(this.makeCellKey(x-1, y));
      var botLeftNbr = cells.get(this.makeCellKey(x-1, y+1));
      var botMidNbr = cells.get(this.makeCellKey(x, y+1));
      var botRightNbr = cells.get(this.makeCellKey(x+1, y+1));

      numNbrs += topLeftNbr != undefined ? topLeftNbr : 0;
      numNbrs += topMidNbr != undefined ? topMidNbr : 0;
      numNbrs += topRightNbr != undefined ? topRightNbr : 0;
      numNbrs += rightNbr != undefined ? rightNbr : 0;
      numNbrs += leftNbr != undefined ? leftNbr : 0;
      numNbrs += botLeftNbr != undefined ? botLeftNbr : 0;
      numNbrs += botMidNbr != undefined ? botMidNbr : 0;
      numNbrs += botRightNbr != undefined ? botRightNbr : 0;

      return numNbrs;
    },
    countAliveNeighbours: function(cell) {
      cell.initNeighbours();
      var nbrs = cell.neighbours; // list of cell coords
      var numNbrs = 0;

      var self = this;
      nbrs.forEach(function(key, index, array) {
        var nbr = self.cells.get(key);
        numNbrs += nbr != undefined && nbr.isAlive ? 1 : 0;
      });
      return numNbrs;
    },
    stepLogic: function(cell, cellsToUpdate) {
      if (cell == undefined) {
        console.log("should not be undefined");
        return;
      };

      var numNbrs = this.countAliveNeighbours(cell);
      var numCells = this.numCells(this.renderer.gameSize(), this.cellSize);

      if (cell.isAlive) {
        switch (numNbrs) {
          case 0:
          case 1:
            var deadCell = new Cell(cell.x, cell.y, false, numCells);
            cellsToUpdate.set(cell.toString(), deadCell);
            this.aliveCells.delete(cell.toString());
            console.log("just deleted" + cell.toString());
            console.log("cell x: " + cell.x + " y:" + cell.y + " now dead ");
            break;
          case 2:
          case 3:
            // keep alive
            var aliveCell = new Cell(cell.x, cell.y, true, numCells);
            cellsToUpdate.set(cell.toString(), aliveCell);
            this.aliveCells.set(cell.toString(), aliveCell);
            console.log("cell x: " + cell.x + " y:" + cell.y + " stayed alive ");
            break;
          case 4:
          default:
            var deadCell = new Cell(cell.x, cell.y, false, numCells);
            cellsToUpdate.set(cell.toString(), deadCell);
            this.aliveCells.delete(cell.toString());
            console.log("just deleted" + cell.toString());
            console.log("cell x: " + cell.x + " y:" + cell.y + " now dead ");
        }
      } else {
        if (numNbrs == 3) {
          var aliveCell = new Cell(cell.x, cell.y, true, numCells);
          cellsToUpdate.set(cell.toString(), aliveCell);
          this.aliveCells.set(cell.toString(), aliveCell);
          console.log("cell x: " + cell.x + " y:" + cell.y + " now alive " );
        }
      }

      console.log("size after updated alive cells" + this.aliveCells.size);
      this.aliveCells.forEach(function(value, key, map) {
          console.log("Alive Key: %s, Value: %s", key, value);
      });
    },
    initGameBoard: function() {
      this.renderer.clearRect();
      this.renderer.setStrokeColour("white");
    },
    updateGameBoard: function(cellsToUpdate) {
      this.repaint(cellsToUpdate);
    },
    repaint: function(cellsToUpdate) {
      var self = this;
      cellsToUpdate.forEach(function(cell, key, cellsToUpdate) {
        self.renderer.drawRect(cell.x*self.cellSize, cell.y*self.cellSize, self.cellSize, self.cellSize, cell.isAlive);
        self.cells.set(key, cell); // update cells
      });
    }
  };

  var Cell = function(x, y, isAlive, numCells) {
    this.x = x;
    this.y = y;
    this.numCells = numCells;
    this.isAlive = isAlive;
    this.neighbours = new Set();
  };

  Cell.prototype = {
    toString: function() {
      return this.makeCellKey(this.x, this.y);
    },
    makeCellKey: function(x, y) {
      return x + "/" + y;
    },
    parseCellKey: function() {
      // TODO: can we use a map function for parseInt?
      var keyArr = this.toString().split("/");
      keyArr[0] = parseInt(keyArr[0]);
      keyArr[1] = parseInt(keyArr[1]);
      return keyArr;
    },
    numNeighbours: function() {
      return this.neighbours.length-1;
    },
    initNeighbours: function() {
      var x = this.x;
      var y = this.y;
      var numCells = this.numCells;
      console.log("Init neighbours for x: " + x + " and y " + y);

      var startPosX = (x-1 < 0) ? x : x-1;
      var startPosY = (y-1 < 0) ? y : y-1;
      var endPosX = (x+1 > numCells.x-1) ? x : x+1;
      var endPosY = (y+1 > numCells.y-1) ? y : y+1;

      // add neighbours as list of dead cells
      for (var rowNum = startPosY; rowNum <= endPosY; rowNum++) {
        for (var colNum = startPosX; colNum <= endPosX; colNum++) {
          // don't add self to list of neighbours
          if (colNum == x && rowNum == y) {
            continue;
          }
          console.log("x: " + colNum + " y:" + rowNum);
          // var nbr = new Cell(colNum, rowNum, false, numCells);
          this.neighbours.add(this.makeCellKey(colNum, rowNum));
        }
      }
    }
  };

  // exports objects to global scope
  exports.Game = Game;
  exports.Renderer = Renderer;
  exports.Cell = Cell;

})(this);
