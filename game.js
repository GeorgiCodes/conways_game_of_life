'use strict';
//TODO: understand strict mode

;(function(exports) {

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
    drawRect: function(x, y, w, h) {
      this.ctx().beginPath();
      this.ctx().rect(x, y, w, h);
    },
    fill: function() {
      this.ctx().fill();
    },
    stroke: function() {
      this.ctx().stroke();
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
    this.cells = new Map();
    this.cellSize = 10;  // TODO: have user set via slider
  };

  Game.prototype = {
    start: function() {
      // first tick
      this.init(this.renderer, this.cellSize, this.cells);
      this.seed(this.cells);
      this.updateGameBoard(this.renderer, this.cellSize, this.cells);

      // TODO: implement UI slider to chage interval time
      self = this;
      this.intervalId = setInterval(function() {
        self.tick();
      }, 500);
    },
    stop: function() {
      clearInterval(intervalId);
    },
    tick: function() {
      // apply game logic and re-render canvas
      self.update(this.renderer, this.cellSize, this.cells);
    },
    init: function(renderer, cellSize, cells) {
      console.log("Init all cells as DEAD.");
      var numCells = this.numCells(renderer.gameSize(), cellSize);

      // init to be dead cells (eg. "01" => 0)
      for (var i = 0; i < numCells.y; i++) {
        for (var j = 0; j < numCells.x; j++) {
          var key = this.makeCellKey(j, i);
          cells.set(key, 0);
          console.log("made cell: " + key);
        }
      }
    },
    makeCellKey: function(x, y) {
      return x + "/" + y;
    },
    parseCellKey: function(key) {
      // TODO: can we use a map function for parseInt?
      var keyArr = key.split("/");
      keyArr[0] = parseInt(keyArr[0]);
      keyArr[1] = parseInt(keyArr[1]);
      return keyArr;
    },
    numCells: function(gameSize, cellSize) {
      var numCellsX = gameSize.x / cellSize;
      var numCellsY = gameSize.y / cellSize;
      console.log("cells wide: " + numCellsX + " cells high: " + numCellsY);

      return {x: numCellsX, y: numCellsY, maxX: numCellsX -1, maxY: numCellsY -1};
    },
    seed: function(cells) {
      console.log("Seeding board");
      // TODO: refactor
      // init board with some starting values
      // cells.set(this.makeCellKey(15, 0), 1);
      // cells.set(this.makeCellKey(14, 0), 1);
      // cells.set(this.makeCellKey(13, 0), 1);
      // cells.set(this.makeCellKey(13, 1), 1);
      //
      // // oscilator
      // cells.set(this.makeCellKey(1, 0), 1);
      // cells.set(this.makeCellKey(1, 1), 1);
      // cells.set(this.makeCellKey(1, 2), 1);
      //
      // // toad
      cells.set(this.makeCellKey(4, 4), 1);
      cells.set(this.makeCellKey(5, 4), 1);
      cells.set(this.makeCellKey(6, 4), 1);
      cells.set(this.makeCellKey(3, 5), 1);
      cells.set(this.makeCellKey(4, 5), 1);
      cells.set(this.makeCellKey(5, 5), 1);

      // glider
      // cells.set(this.makeCellKey(11, 10), 1);
      // cells.set(this.makeCellKey(11, 11), 1);
      // cells.set(this.makeCellKey(12, 11), 1);
      // cells.set(this.makeCellKey(10, 12), 1);
      // cells.set(this.makeCellKey(12, 12), 1);

      // 4 square
      // cells.set(this.makeCellKey(7, 14), 1);
      // cells.set(this.makeCellKey(8, 14), 1);
      // cells.set(this.makeCellKey(6, 15), 1);
      // cells.set(this.makeCellKey(9, 15), 1);

      // light-weight space ship
    },
    // runs the main game logic.
    update: function(renderer, cellSize, cells) {
      this.applyRulesToCells(cells);
      this.updateGameBoard(renderer, cellSize, cells);
      // var count = this.countNeighbours(14, 1, cells);
      // console.log("test count " + count);
    },
    countNeighbours: function(x, y, cells) {
      // get values of adjacent cells
      var numNbrs = 0;
      // var x = parseInt(x);

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

      // console.log("Num nbrs of cell x: " + x + " y: " + y + " is: " + numNbrs);

      return numNbrs;
    },
    applyRulesToCells: function(cells) {
      // RULES
      // For a space that is 'populated':
      //   Each cell with one or no neighbors dies, as if by loneliness.
      //   Each cell with four or more neighbors dies, as if by overpopulation.
      //   Each cell with two or three neighbors survives.
      // For a space that is 'empty' or 'unpopulated'
      //   Each cell with three neighbors becomes populated.
      console.log("Applying rules to cells");
      var cellsToUpdate = new Map();

      var self = this;
      cells.forEach(function(value, key, cells) {
        var keyArr = self.parseCellKey(key);
        var numNbrs = self.countNeighbours(keyArr[0], keyArr[1], cells);

        if (value == 1) {
          switch (numNbrs) {
            case 0:
            case 1:
              cellsToUpdate.set(key, 0);
              console.log("cell x: " + keyArr[0] + " y:" + keyArr[0] + " now dead " + cellsToUpdate.get(key));
              break;
            case 2:
            case 3:
              break;
            case 4:
            default:
              cellsToUpdate.set(key, 0);
              console.log("cell x: " + keyArr[0] + " y:" + keyArr[0] + " now dead " + cellsToUpdate.get(key));
          }
        } else {
          if (numNbrs >= 3) {
            cellsToUpdate.set(key, 1);
            console.log("cell x: " + keyArr[0] + " y:" + keyArr[0] + " now alive " + cellsToUpdate.get(key));
          }
        }

      })

      cellsToUpdate.forEach(function(value, key, cellsToUpdate) {
        cells.set(key, value);
      })
    },
    updateGameBoard: function(renderer, cellSize, cells) {
      // Clear away the drawing from the previous tick.
      renderer.clearRect();
      renderer.setStrokeColour("grey");

      this.repaintNaiive(renderer, cellSize, cells);
    },
    repaintNaiive: function(renderer, cellSize, cells) {
      // naiive approach to repaint canvas is O(numCells)
      var self = this;

      cells.forEach(function(value, key, cells) {
        var keyArr = self.parseCellKey(key);
        var x = keyArr[0];
        var y = keyArr[1];

        renderer.drawRect(x*cellSize, y*cellSize, cellSize, cellSize);
        if (value == 1) {
          renderer.fill();
        } else {
          renderer.stroke();
        }
      })
    }
  };

  // exports objects to global scope
  exports.Game = Game;
  exports.Renderer = Renderer;

})(this);
