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
    // this.initCells();
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
      }, 1000);
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

      // init cells to be dead
      for (var i = 0; i < numCells.y; i++) {
        for (var j = 0; j < numCells.x; j++) {
          var cell = new Cell(j, i, false, numCells);
          console.log("Created cell: " + cell.toString());
          this.cells.set(cell.toString(), cell);
        }
      }
    },
    numCells: function(gameSize, cellSize) {
      var numCellsX = gameSize.x / cellSize;
      var numCellsY = gameSize.y / cellSize;
      console.log("GameBoard is cells wide: " + numCellsX + " and cells high: " + numCellsY);

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
          this.cells.forEach(function(value, key, cells) {
            var randomNumber = Math.random() >= 0.5;
            var keyArr = key.split("/");
            keyArr[0] = parseInt(keyArr[0]);
            keyArr[1] = parseInt(keyArr[1]);
            var cell1 = new Cell(keyArr[0], keyArr[1], randomNumber, gameSize);

            self.cells.set(key, cell1);
            if (cell1.isAlive) {
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
      console.log("game state so far after seeding");
      console.log(this.cells.get("1/0"));
      console.log(this.cells.get("1/1"));
      console.log(this.cells.get("1/2"));

      // TODO: refactor
      // init board with some starting values
      // cells.set(this.makeCellKey(15, 0), true);
      // cells.set(this.makeCellKey(14, 0), true);
      // cells.set(this.makeCellKey(13, 0), true);
      // cells.set(this.makeCellKey(13, 1), true);
      //
      // // toad
      // cells.set(this.makeCellKey(4, 4), true);
      // cells.set(this.makeCellKey(5, 4), true);
      // cells.set(this.makeCellKey(6, 4), true);
      // cells.set(this.makeCellKey(3, 5), true);
      // cells.set(this.makeCellKey(4, 5), true);
      // cells.set(this.makeCellKey(5, 5), true);

      // light-weight space ship
    },
    // runs the main game logic.
    step: function() {
      var cellsToUpdate = this.applyRulesToCells();
      this.updateGameBoard(cellsToUpdate);
    },
    applyRulesToCells: function() {
      console.log("Applying game rules to cells.");
      console.log("Alive cells total: " + this.aliveCells.size);
      var cellsToUpdate = new Map();


      console.log("game state so far in applyRulesToCells");
      console.log(this.cells.get("1/0"));
      console.log(this.cells.get("1/1"));
      console.log(this.cells.get("1/2"));


      // TODO: refactor, this is ugly
      var self = this;
      this.cells.forEach(function(cell, key, array) {
        // get neighbour coordinates of each cell that is currently alive
        // for each neighbour coordinate apply cell life logic
        // self.countAliveNeighbours(cell);
        self.stepLogic(cell, cellsToUpdate);
      });

      return cellsToUpdate;
    },
    countAliveNeighbours: function(cell) {
      var nbrs = cell.neighbours; // list of cell coords
      var numNbrs = 0;

      var self = this;
      nbrs.forEach(function(key, index, array) {
        var nbr = self.cells.get(key);
        numNbrs += nbr.isAlive ? 1 : 0;
      });
      return numNbrs;
    },
    stepLogic: function(cell, cellsToUpdate) {
      var numNbrs = this.countAliveNeighbours(cell);
      var numCells = this.numCells(this.renderer.gameSize(), this.cellSize);

      if (cell.isAlive) {
        switch (numNbrs) {
          case 0:
          case 1:
            cellsToUpdate.set(cell.toString(), new Cell(cell.x, cell.y, false, numCells));
            console.log("cell x: " + cell.x + " y:" + cell.y + " now dead ");
            break;
          case 2:
          case 3:
            // keep alive
            cellsToUpdate.set(cell.toString(), new Cell(cell.x, cell.y, true, numCells));
            console.log("cell x: " + cell.x + " y:" + cell.y + " stayed alive ");
            break;
          case 4:
          default:
            cellsToUpdate.set(cell.toString(), new Cell(cell.x, cell.y, false, numCells));
            console.log("cell x: " + cell.x + " y:" + cell.y + " now dead ");
        }
      } else {
        if (numNbrs == 3) {
          cellsToUpdate.set(cell.toString(), new Cell(cell.x, cell.y, true, numCells));
          console.log("cell x: " + cell.x + " y:" + cell.y + " now alive " );
        }
      }
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
    this.initNeighbours();
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

      var startPosX = (x-1 < 0) ? x : x-1;
      var startPosY = (y-1 < 0) ? y : y-1;
      var endPosX = (x+1 > numCells.x-1) ? x : x+1;
      var endPosY = (y+1 > numCells.y-1) ? y : y+1;

      // TODO: remove self from list of neighbours?
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
