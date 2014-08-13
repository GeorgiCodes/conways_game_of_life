;(function(exports) {
  "use strict";

  // GamePatternLoader object
  // ----------------

  // Loads game board with seed patterns.
  var GamePatternLoader = function(game) {
    this.game = game;
    this.numCells = this.game.numCells();
    this.cellsArr = this.game.cellsArr;
  };

  GamePatternLoader.prototype = {
    loadPatternIntoGame: function(patternType) {
      // init game
      // set pattern onto cells
      // update the cells that need to be updated for first step

      this.game.init();

      switch (patternType) {
        case "random":
          this.initRandom();
          break;
        case "glider":
          this.initGlider();
          break;
        case "oscillator":
          this.initOscillator();
          break;
        case "gosperGun":
          this.initGosperGun();
          break;
        default:
          this.random();
      }

      var cellsToUpdate = this.initCellsToUpdateAndCalculateMinMaxCoords();
      this.game.updateGameBoard(cellsToUpdate, this.game.renderer);
    },
    initCellsToUpdateAndCalculateMinMaxCoords: function() {
      var cellsToUpdate = [];   
      var minX = Number.MAX_VALUE;
      var maxX = Number.MIN_VALUE;
      var minY = Number.MAX_VALUE;
      var maxY = Number.MIN_VALUE;

      // populate cellsToUpdate list as this is what we will first paint to canvas
      for (var i = 0; i < this.numCells.x; i++) {
        for (var j = 0; j < this.numCells.y; j++) {
          var isAlive = this.cellsArr[i][j];
          if (isAlive) {
            var aliveCell = new Cell(i, j, isAlive);
            cellsToUpdate.push(aliveCell);
            if (i < minX) minX = i;
            if (i > maxX) maxX = i;
            if (j < minY) minY = j;
            if (j > maxY) maxY = j;
          }
        }
      }

      this.game.updateMinMaxCoords(minX, maxX, minY, maxY);
      return cellsToUpdate; 
    },
    initRandom: function() {
      for (var i = 0; i < this.game.numCells().x; i++) {
        for (var j = 0; j < this.game.numCells().y; j++) {
          var randBool = Math.random() >= 0.5;
          this.game.cellsArr[i][j] = randBool;
        }
      }
    },
    initGlider: function() {
      this.cellsArr[1][33] = true;
      this.cellsArr[1][34] = true;
      this.cellsArr[2][34] = true;
      this.cellsArr[2][35] = true;
      this.cellsArr[0][35] = true;
    },
    initOscillator: function() {
      this.cellsArr[1][0] = true;
      this.cellsArr[1][1] = true;
      this.cellsArr[1][2] = true;
    },
    initGosperGun: function() {
      this.cellsArr[1][5] = true;
      this.cellsArr[1][6] = true;
      this.cellsArr[2][5] = true;
      this.cellsArr[2][6] = true;
      this.cellsArr[11][5] = true;
      this.cellsArr[11][6] = true;
      this.cellsArr[11][7] = true;
      this.cellsArr[12][4] = true;
      this.cellsArr[12][8] = true;
      this.cellsArr[13][3] = true;
      this.cellsArr[13][9] = true;
      this.cellsArr[14][3] = true;
      this.cellsArr[14][9] = true;
      this.cellsArr[15][6] = true;
      this.cellsArr[16][4] = true;
      this.cellsArr[16][8] = true;
      this.cellsArr[17][5] = true;
      this.cellsArr[17][6] = true;
      this.cellsArr[17][7] = true;
      this.cellsArr[18][6] = true;
      this.cellsArr[21][3] = true;
      this.cellsArr[21][4] = true;
      this.cellsArr[21][5] = true;
      this.cellsArr[22][3] = true;
      this.cellsArr[22][4] = true;
      this.cellsArr[22][5] = true;
      this.cellsArr[23][2] = true;
      this.cellsArr[23][6] = true;
      this.cellsArr[25][1] = true;
      this.cellsArr[25][2] = true;
      this.cellsArr[25][6] = true;
      this.cellsArr[25][7] = true;
      this.cellsArr[35][3] = true;
      this.cellsArr[35][4] = true;
      this.cellsArr[36][3] = true;
      this.cellsArr[36][4] = true;
      this.cellsArr[35][22] = true;
      this.cellsArr[35][23] = true;
      this.cellsArr[35][25] = true;
      this.cellsArr[36][22] = true;
      this.cellsArr[36][23] = true;
      this.cellsArr[36][25] = true;
      this.cellsArr[36][26] = true;
      this.cellsArr[36][27] = true;
      this.cellsArr[37][28] = true;
      this.cellsArr[38][22] = true;
      this.cellsArr[38][23] = true;
      this.cellsArr[38][25] = true;
      this.cellsArr[38][26] = true;
      this.cellsArr[38][27] = true;
      this.cellsArr[39][23] = true;
      this.cellsArr[39][25] = true;
      this.cellsArr[40][23] = true;
      this.cellsArr[40][25] = true;
      this.cellsArr[41][24] = true;
    }
  };

  // exports objects to global scope
  exports.GamePatternLoader = GamePatternLoader;

})(this);
