;(function(exports) {
  "use strict";

  // DataWrangler object
  // ----------------

  // Loads game board with seed patterns.
  var DataWrangler = function(renderer) {
  };

  DataWrangler.prototype = {
    load: function(seedType, numCells, cellsArr, cellsToUpdate, minMaxCoords) {
      // TODO: refactor
      switch (seedType) {
        case "random":
          for (var i = 0; i < numCells.x; i++) {
            for (var j = 0; j < numCells.y; j++) {
              var randBool = Math.random() >= 0.5;
              cellsArr[i][j] = randBool;
            }
          }
          break;
        case "glider":
          cellsArr[1][33] = true;
          cellsArr[1][34] = true;
          cellsArr[2][34] = true;
          cellsArr[2][35] = true;
          cellsArr[0][35] = true;
          break;
        case "oscillator":
          cellsArr[1][0] = true;
          cellsArr[1][1] = true;
          cellsArr[1][2] = true;
          break;
        case "gosperGun":
          cellsArr[1][5] = true;
          cellsArr[1][6] = true;
          cellsArr[2][5] = true;
          cellsArr[2][6] = true;
          cellsArr[11][5] = true;
          cellsArr[11][6] = true;
          cellsArr[11][7] = true;
          cellsArr[12][4] = true;
          cellsArr[12][8] = true;
          cellsArr[13][3] = true;
          cellsArr[13][9] = true;
          cellsArr[14][3] = true;
          cellsArr[14][9] = true;
          cellsArr[15][6] = true;
          cellsArr[16][4] = true;
          cellsArr[16][8] = true;
          cellsArr[17][5] = true;
          cellsArr[17][6] = true;
          cellsArr[17][7] = true;
          cellsArr[18][6] = true;
          cellsArr[21][3] = true;
          cellsArr[21][4] = true;
          cellsArr[21][5] = true;
          cellsArr[22][3] = true;
          cellsArr[22][4] = true;
          cellsArr[22][5] = true;
          cellsArr[23][2] = true;
          cellsArr[23][6] = true;
          cellsArr[25][1] = true;
          cellsArr[25][2] = true;
          cellsArr[25][6] = true;
          cellsArr[25][7] = true;
          cellsArr[35][3] = true;
          cellsArr[35][4] = true;
          cellsArr[36][3] = true;
          cellsArr[36][4] = true;
          cellsArr[35][22] = true;
          cellsArr[35][23] = true;
          cellsArr[35][25] = true;
          cellsArr[36][22] = true;
          cellsArr[36][23] = true;
          cellsArr[36][25] = true;
          cellsArr[36][26] = true;
          cellsArr[36][27] = true;
          cellsArr[37][28] = true;
          cellsArr[38][22] = true;
          cellsArr[38][23] = true;
          cellsArr[38][25] = true;
          cellsArr[38][26] = true;
          cellsArr[38][27] = true;
          cellsArr[39][23] = true;
          cellsArr[39][25] = true;
          cellsArr[40][23] = true;
          cellsArr[40][25] = true;
          cellsArr[41][24] = true;
          break;
      }

      var minX = Number.MAX_VALUE;
      var maxX = Number.MIN_VALUE;
      var minY = Number.MAX_VALUE;
      var maxY = Number.MIN_VALUE;

      // populate cellsToUpdate list as this is what we will first paint to canvas
      for (var i = 0; i < numCells.x; i++) {
        for (var j = 0; j < numCells.y; j++) {
          var isAlive = cellsArr[i][j];
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
      console.log(minX, maxX, minY, maxY);
      this.setMinXCoord(minMaxCoords, minX);
      this.setMaxXCoord(minMaxCoords, numCells, maxX);
      this.setMinYCoord(minMaxCoords, minY);
      this.setMaxYCoord(minMaxCoords, numCells, maxY);
      console.log(minMaxCoords);
    },
    setMinXCoord: function(minMaxCoords, minX) {
      // update lowest x
      if (minX < minMaxCoords.minX) {
        minMaxCoords.minX = (minX - 1) < 0 ? 0 : (minX - 1);
      }
    },
    setMaxXCoord: function(minMaxCoords, numCells, maxX) {
      // update highest x
      if (maxX > minMaxCoords.maxX) {
        minMaxCoords.maxX = (maxX + 1) > numCells.maxX ? numCells.maxX : (maxX + 1);
      }
    },
    setMinYCoord: function(minMaxCoords, minY) {
      // update lowest y
      if (minY < minMaxCoords.minY) {
        minMaxCoords.minY = (minY -1) < 0 ? 0 : (minY - 1);
      }
    },
    setMaxYCoord: function(minMaxCoords, numCells, maxY) {
      // update highest y
      if (maxY > minMaxCoords.maxY) {
        minMaxCoords.maxY = (maxY + 1) > numCells.maxY ? numCells.maxY : (maxY + 1);
      }
    }
  };

  // exports objects to global scope
  exports.DataWrangler = DataWrangler;

})(this);
