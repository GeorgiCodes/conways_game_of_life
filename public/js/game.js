;(function(exports) {
  "use strict";

  // Main game object
  // ----------------

  // Creates the game object with the game state and logic.
  var Game = function(renderer) {
    this.renderer = renderer;
    this.cellsArr = []; // keeps track of all cells live/dead state
    this.minMaxCoords = {};
    this.cellSize = 5;
  };

  Game.prototype = {
    start: function(seedType) {
      var self = this;
      this.intervalId = setInterval(function() {
        self.step();
      }, 10);
    },
    stop: function() {
      clearInterval(this.intervalId);
    },
    init: function() {
      this.initMaxCoords();
      this.initCells();
      this.renderer.initGameBoard();
    },
    initCells: function() {
      var numCells = this.numCells();
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
    step: function() {
      // runs the main game logic and updates canvas
      var cellsToUpdate = this.transitionCells();
      this.updateGameBoard(cellsToUpdate, this.renderer);
    },
    transitionCells: function() {
      // This is an optimized algorithm for Conway's Game of Life.
      // This algorithm does not iterate over the entire game board.
      // Instead, it keeps track of the max and min x and y coords that contain the live cells
      // A 1 cell padding is added to these boundary coordinates so as to be able to identify dead cells which
      // maybe become alive due to rule 4.
      // Please see the README for more further explanation.

      var cellsToUpdate = []; // keep track of only the cells which have changed
      var minX = Number.MAX_VALUE;
      var maxX = Number.MIN_VALUE;
      var minY = Number.MAX_VALUE;
      var maxY = Number.MIN_VALUE;

      for (var i = this.minMaxCoords.minX; i <= this.minMaxCoords.maxX; i++) {
        for (var j = this.minMaxCoords.minY; j <= this.minMaxCoords.maxY; j++) {
          var isAlive = this.cellsArr[i][j];
          var numNbrs = this.countAliveNeighbours(i, j);
          var cellAliveNextStep = this.isCellAliveOnNextStep(isAlive, numNbrs);

          if (this.hasCellChangedFromPreviousStep(isAlive, cellAliveNextStep)) {
            cellsToUpdate.push(new Cell(i, j, cellAliveNextStep));
          }

          // if cell is alive on next transition then check to see if our boundary coordinates need to be updated
          if (cellAliveNextStep) {
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
      this.setMinXCoord(minX);
      this.setMaxXCoord(maxX);
      this.setMinYCoord(minY);
      this.setMaxYCoord(maxY);
    },
    isCellAliveOnNextStep: function(isAlive, numNbrs) {
      if (isAlive) {
        return numNbrs ==2 || numNbrs == 3;
      }
      if (numNbrs == 3) {
        return true;
      }
      return false;
    },
    hasCellChangedFromPreviousStep: function(isAlive, cellAliveNextStep) {
      return isAlive && !cellAliveNextStep || !isAlive && cellAliveNextStep;
    },
    countAliveNeighbours: function(x, y) {
      // count number of alive adjacent cells
      var numNbrs = 0;
      var numCells = this.numCells();

      var startPosX = (x-1 < 0) ? x : x-1;
      var startPosY = (y-1 < 0) ? y : y-1;
      var endPosX = (x+1 > numCells.x-1) ? x : x+1;
      var endPosY = (y+1 > numCells.y-1) ? y : y+1;

      for (var rowNum = startPosY; rowNum <= endPosY; rowNum++) {
        for (var colNum = startPosX; colNum <= endPosX; colNum++) {
          // don't count self
          if (colNum == x && rowNum == y) {
            continue;
          }
          var isAlive = this.cellsArr[colNum][rowNum];
          numNbrs += isAlive ? 1 : 0;
        }
      }
      return numNbrs;
    },
    setMinXCoord: function(minX) {
      // update lowest x
      if (minX < this.minMaxCoords.minX) {
        this.minMaxCoords.minX = (minX - 1) < 0 ? 0 : (minX - 1);
      }
    },
    setMaxXCoord: function(maxX) {
      // update highest x
      if (maxX > this.minMaxCoords.maxX) {
        this.minMaxCoords.maxX = (maxX + 1) > this.numCells().maxX ? this.numCells().maxX : (maxX + 1);
      }
    },
    setMinYCoord: function(minY) {
      // update lowest y
      if (minY < this.minMaxCoords.minY) {
        this.minMaxCoords.minY = (minY -1) < 0 ? 0 : (minY - 1);
      }
    },
    setMaxYCoord: function(maxY) {
      // update highest y
      if (maxY > this.minMaxCoords.maxY) {
        this.minMaxCoords.maxY = (maxY + 1) > this.numCells().maxY ? this.numCells().maxY : (maxY + 1);
      }
    },
    updateGameBoard: function(cellsToUpdate, renderer) {
      if (cellsToUpdate == null) {
        return;
      }

      // repaint only the cells which have changed
      for (var i = 0; i < cellsToUpdate.length; i++) {
        var cell = cellsToUpdate[i];
        var x = cell.x;
        var y = cell.y;
        var isAlive = cell.isAlive;

        renderer.updateCell(x, y, this.cellSize, isAlive);
        this.cellsArr[x][y] = isAlive; // update original cell data structure
      }
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
