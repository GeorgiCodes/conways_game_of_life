// TODO: implement this arg in looping of maps
;(function(exports) {
  "use strict"; //TODO: understand strict mode

  // Main game object
  // ----------------

  // Creates the game object with the game state and logic.
  var Game = function(renderer) {
    this.renderer = renderer;
    this.cellSize = 10;
    this.cellsArr = new Array();
    this.minMaxCoords = {};
    this.dataWrangler = new DataWrangler();

    this.init();
  };

  Game.prototype = {
    start: function(seedType) {
      console.log("Starting game...");

      var self = this;
      this.intervalId = setInterval(function() {
        self.step();
      }, 40);
      console.log("Starting animation with id: " + this.intervalId);
    },
    stop: function() {
      console.log("Stopping animation with id: " + this.intervalId);
      clearInterval(this.intervalId);
    },
    init: function() {
      this.initMaxCoords();
      this.initCells();
      this.initGameBoard();
    },
    initCells: function() {
      console.log("Init all cells as dead.");
      var numCells = this.numCells();
      console.log("GameBoard initialized to width: " + numCells.x + " and height: " + numCells.y);

      // init cells to be dead
      // O(numRows * numCols) time and space complexity
      for (var i = 0; i < numCells.x; i++) {
        this.cellsArr[i] = new Array();
        for (var j = 0; j < numCells.y; j++) {
          this.cellsArr[i][j] = false;
        }
      }
    },
    initMaxCoords: function() {
      this.minMaxCoords = {minX: Number.MAX_VALUE, minY:Number.MAX_VALUE, maxX:Number.MIN_VALUE, maxY:Number.MIN_VALUE};
    },
    numCells: function() {
      var gameSize = this.renderer.gameSize();

      var numCellsX = gameSize.x / this.cellSize;
      var numCellsY = gameSize.y / this.cellSize;

      return {x: numCellsX, y: numCellsY, maxX: numCellsX -1, maxY: numCellsY -1};
    },
    seed: function(seedType) {
      console.log("Seeding board");
      this.init();

      // var gameSize = this.renderer.gameSize();
      var cellsToUpdate = new Array();
      this.dataWrangler.load(seedType, this.numCells(), this.cellsArr, cellsToUpdate, this.minMaxCoords);

      console.log(this.minMaxCoords);

      // paint
      this.updateGameBoard(cellsToUpdate);
    },
    step: function() {
      // runs the main game logic and updates canvas
      // var cellsToUpdate = this.naiiveAlgorithm();
      var cellsToUpdate = this.optimizedAlgorithm();

      this.updateGameBoard(cellsToUpdate);
    },
    naiiveAlgorithm: function() {
      // naiive algorithm implementation of Conway's Game of Life rules.
      // look at entire board for O(numRows * numCols) runtime complexity

      var cellsToUpdate = [];

      for (var i = 0; i < this.numCells().x; i++) {
        for (var j = 0; j < this.numCells().y; j++) {
          var isAlive = this.cellsArr[i][j];
          var numNbrs = this.countAliveNeighbours(i, j);
          var cellAliveNextStep = this.isCellAliveOnNextStep(isAlive, numNbrs);

          if (isAlive && !cellAliveNextStep || !isAlive && cellAliveNextStep) {
            cellsToUpdate.push(new Cell(i, j, cellAliveNextStep));
          }
        }
      }
      return cellsToUpdate;
    },
    optimizedAlgorithm: function() {
      var cellsToUpdate = [];
      var minX = Number.MAX_VALUE;
      var maxX = Number.MIN_VALUE;
      var minY = Number.MAX_VALUE;
      var maxY = Number.MIN_VALUE;

      // this algorithm uses max and min coords that contain only live cells
      // we track the min and max of x and y
      for (var i = this.minMaxCoords.minX; i <= this.minMaxCoords.maxX; i++) {
        for (var j = this.minMaxCoords.minY; j <= this.minMaxCoords.maxY; j++) {
          var isAlive = this.cellsArr[i][j];
          var numNbrs = this.countAliveNeighbours(i, j);
          var cellAliveNextStep = this.isCellAliveOnNextStep(isAlive, numNbrs);
          if (isAlive && !cellAliveNextStep || !isAlive && cellAliveNextStep) {
            cellsToUpdate.push(new Cell(i, j, cellAliveNextStep));
          }
          if (isAlive) {
            if (i < minX) minX = i;
            if (i > maxX) maxX = i;
            if (j < minY) minY = j;
            if (j > maxY) maxY = j;
          }
        }
      }

      // update our min and max coordinate rectangle with new alive min/max values
      this.updateMinMaxCoords(minX, maxX, minY, maxY);

      return cellsToUpdate;
    },
    updateMinMaxCoords: function(minX, maxX, minY, maxY) {
      this.initMaxCoords();
      this.dataWrangler.setMinXCoord(this.minMaxCoords, minX);
      this.dataWrangler.setMaxXCoord(this.minMaxCoords, this.numCells(), maxX);
      this.dataWrangler.setMinYCoord(this.minMaxCoords, minY);
      this.dataWrangler.setMaxYCoord(this.minMaxCoords, this.numCells(), maxY);
    },
    isCellAliveOnNextStep: function(isAlive, numNbrs) {
      // TODO: refactor
      if (isAlive) {
        return numNbrs ==2 || numNbrs == 3;
      }
      if (!isAlive && numNbrs == 3) {
        return true;
      }
    },
    countAliveNeighbours: function(x, y) {
      // get values of adjacent cells
      var numNbrs = 0;
      var numCells = this.numCells();

      var startPosX = (x-1 < 0) ? x : x-1;
      var startPosY = (y-1 < 0) ? y : y-1;
      var endPosX = (x+1 > numCells.x-1) ? x : x+1;
      var endPosY = (y+1 > numCells.y-1) ? y : y+1;

      for (var rowNum = startPosY; rowNum <= endPosY; rowNum++) {
        for (var colNum = startPosX; colNum <= endPosX; colNum++) {
          // don't check self
          if (colNum == x && rowNum == y) {
            continue;
          }
          var isAlive = this.cellsArr[colNum][rowNum];
          numNbrs += isAlive ? 1 : 0;
        }
      }
      return numNbrs;
    },
    initGameBoard: function() {
      this.renderer.clearRect();
      this.renderer.setStrokeColour("white");
    },
    updateGameBoard: function(cellsToUpdate) {
      this.repaint(cellsToUpdate);
    },
    repaint: function(cellsToUpdate) {
      // var self = this;
      cellsToUpdate.forEach(function(cell, index, array) {
        var x = cell.x;
        var y = cell.y;
        var isAlive = cell.isAlive;

        this.renderer.drawRect(x*this.cellSize, y*this.cellSize, this.cellSize, this.cellSize, isAlive);
        this.cellsArr[x][y] = isAlive; // update cells
      }, this);
      // this.paintMaxCoords();
    },
    paintMaxCoords: function() {
      this.renderer.drawBoundary(this.minMaxCoords.minX*this.cellSize, this.minMaxCoords.minY*this.cellSize,
        this.cellSize, this.cellSize);
      this.renderer.drawBoundary(this.minMaxCoords.maxX*this.cellSize, this.minMaxCoords.minY*this.cellSize,
        this.cellSize, this.cellSize);
      this.renderer.drawBoundary(this.minMaxCoords.minX*this.cellSize, this.minMaxCoords.maxY*this.cellSize,
        this.cellSize, this.cellSize);
      this.renderer.drawBoundary(this.minMaxCoords.maxX*this.cellSize, this.minMaxCoords.maxY*this.cellSize,
        this.cellSize, this.cellSize);
    }
  };

  var Cell = function(x, y, isAlive) {
    this.x = x;
    this.y = y;
    this.isAlive = isAlive;
  };

  // exports objects to global scope
  exports.Game = Game;
  exports.Cell = Cell;


})(this);
