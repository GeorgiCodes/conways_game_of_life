describe("Game", function () {
  var game;
  var maxX = 59;
  var maxY = 29;
  var cellSize = 5;

  var MockRenderer = function() {};
  MockRenderer.prototype = {
    // Get the drawing context.
    canvas: function() {
      return { width: 300, height: 150 };
    },
    ctx: function() {
    },
    gameSize: function() {
      // dimensions of the canvas.
      return { x: this.canvas().width, y: this.canvas().height };
    },
    updateCell: function() {
      // do nothing
    },
    initGameBoard: function(colour) {
      // do nothing
    }
  };
  var mockRenderer = null;

  describe("game constructor", function () {

    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
    }); 

    it("constructs a game object", function () {

      expect(game.renderer).toEqual(mockRenderer);
      expect(game.cellSize).toBe(cellSize);
      expect(game.cellsArr.length).toBe(0);
      expect(game.minMaxCoords).toBeDefined();
    });
  });

  describe("numCells", function () {
    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
    }); 

    it("calculates min and max x and y based on canvas size", function () {
      var numCells = game.numCells();

      expect(numCells.x).toBe(maxX + 1);
      expect(numCells.y).toBe(maxY + 1);
      expect(numCells.maxX).toBe(maxX);
      expect(numCells.maxY).toBe(maxY);
    });

  });

  describe("initCells", function () {
    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
    }); 

    it("initializes all cells as dead", function () {
      game.initCells();

      expect(game.cellsArr.length).toBe(maxX + 1);
      // check bounds
      expect(game.cellsArr[0][0]).toBe(false);
      expect(game.cellsArr[maxX][0]).toBe(false);
      expect(game.cellsArr[0][0]).toBe(false);
      expect(game.cellsArr[0][maxY]).toBe(false);
    });

  });

  describe("isCellAliveOnNextStep", function () {
    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
    }); 

    it("returns true when cell is alive and has 2 neighbours", function () {
      var result = game.isCellAliveOnNextStep(true, 2);

      expect(result).toBe(true);
    });

    it("returns true when cell is alive and has 3 neighbours", function () {
      var result = game.isCellAliveOnNextStep(true, 3);

      expect(result).toBe(true);
    });

    it("returns false when cell is alive and has 1 neighbour", function () {
      var result = game.isCellAliveOnNextStep(true, 1);

      expect(result).toBe(false);
    });

    it("returns false when cell is alive and has 4 neighbour", function () {
      var result = game.isCellAliveOnNextStep(true, 4);

      expect(result).toBe(false);
    });

    it("returns true when cell is dead and has 3 neighbours", function () {
      var result = game.isCellAliveOnNextStep(false, 3);

      expect(result).toBe(true);
    });

    it("returns false when cell is dead and has 3 neighbours", function () {
      var result = game.isCellAliveOnNextStep(false, 2);

      expect(result).toBe(false);
    });

  });

  describe("hasCellChangedFromPreviousStep", function () {
    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
    }); 

    it("returns true if was alive but is now dead", function () {
      var result = game.hasCellChangedFromPreviousStep(true, false);

      expect(result).toBe(true);
    });

    it("returns true if was dead but is now alive", function () {
      var result = game.hasCellChangedFromPreviousStep(false, true);

      expect(result).toBe(true);
    });

    it("returns false if was dead and is still dead", function () {
      var result = game.hasCellChangedFromPreviousStep(false, false);

      expect(result).toBe(false);
    });

    it("returns false if was alive and is still alive", function () {
      var result = game.hasCellChangedFromPreviousStep(true, true);

      expect(result).toBe(false);
    });

  });

  describe("countAliveNeighbours", function () {
    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
      game.initCells();
      game.cellsArr[1][0] = true;
      game.cellsArr[1][1] = true;
      game.cellsArr[1][2] = true;
    }); 

    it("counts number of alive neighbours", function () {
      expect(game.countAliveNeighbours(0, 1)).toBe(3);
      expect(game.countAliveNeighbours(2, 1)).toBe(3);  
      expect(game.countAliveNeighbours(1, 0)).toBe(1);
      expect(game.countAliveNeighbours(1, 1)).toBe(2);
      expect(game.countAliveNeighbours(1, 2)).toBe(1);
    });

  });

  describe("setMinXCoord", function () {
    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
      game.initMaxCoords();
    }); 

    it("updates minMaxCoords minX when x is on left border to be 0", function () {
      game.setMinXCoord(0);
      expect(game.minMaxCoords.minX).toBe(0);
    });

    it("updates minMaxCoords minX to be 1 less than x when not on border", function () {
      game.setMinXCoord(2);
      expect(game.minMaxCoords.minX).toBe(1);
    });

  });

  describe("setMaxXCoord", function () {
    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
      game.initMaxCoords();
    }); 

    it("updates minMaxCoords maxX when x is on right border to be maxCols", function () {
      game.setMaxXCoord(maxX);
      expect(game.minMaxCoords.maxX).toBe(maxX);
    });

    it("updates minMaxCoords maxX to be 1 more than x when not on border", function () {
      game.setMaxXCoord(10);
      expect(game.minMaxCoords.maxX).toBe(11);
    });

  });

  describe("setMinYCoord", function () {
    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
      game.initMaxCoords();
    }); 

    it("updates minMaxCoords minY when y is on top border to be 0", function () {
      game.setMinYCoord(0);
      expect(game.minMaxCoords.minY).toBe(0);
    });

    it("updates minMaxCoords minY to be 1 less than x when not on border", function () {
      game.setMinYCoord(10);
      expect(game.minMaxCoords.minY).toBe(9);
    });

  });

  describe("setMaxYCoord", function () {
    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
      game.initMaxCoords();
    }); 

    it("updates minMaxCoords maxY when y is on bottom border to be 0", function () {
      game.setMaxYCoord(maxY);
      expect(game.minMaxCoords.maxY).toBe(maxY);
    });

    it("updates minMaxCoords maxY to be 1 more than y when not on border", function () {
      game.setMaxYCoord(10);
      expect(game.minMaxCoords.maxY).toBe(11);
    });

  });

  describe("transitionCells", function () {
    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
      game.init();
      // oscillator
      game.cellsArr[1][0] = true;
      game.cellsArr[1][1] = true;
      game.cellsArr[1][2] = true;
      game.minMaxCoords = {minX: 0, minY: 0, maxX: 2, maxY: 3};
    }); 

    it("updates cellsToUpdate array with only the cells that have changed this transition", function () {
      var cellsToUpdate = game.transitionCells();

      expect(cellsToUpdate.length).toBe(4);
      expect(cellsToUpdate[0].x).toBe(0);
      expect(cellsToUpdate[0].y).toBe(1); 
      expect(cellsToUpdate[0].isAlive).toBe(true); 
      expect(cellsToUpdate[1].x).toBe(1);
      expect(cellsToUpdate[1].y).toBe(0); 
      expect(cellsToUpdate[1].isAlive).toBe(false); 
      expect(cellsToUpdate[2].x).toBe(1);
      expect(cellsToUpdate[2].y).toBe(2); 
      expect(cellsToUpdate[2].isAlive).toBe(false); 
      expect(cellsToUpdate[3].x).toBe(2);
      expect(cellsToUpdate[3].y).toBe(1); 
      expect(cellsToUpdate[3].isAlive).toBe(true); 
      expect(cellsToUpdate[3].isAlive).toBe(true); 
    });

    it("updates minMaxCoords boundaries based on newly alive cells", function () {
      var cellsToUpdate = game.transitionCells();

      expect(game.minMaxCoords.minX).toBe(0);
      expect(game.minMaxCoords.minY).toBe(0);
      expect(game.minMaxCoords.maxX).toBe(3);
      expect(game.minMaxCoords.maxY).toBe(2);
    });

  });

  describe("updateGameBoard", function () {

    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
      game.init();
      // oscillator
      game.cellsArr[1][0] = true;
      game.cellsArr[1][1] = true;
      game.cellsArr[1][2] = true;
      game.minMaxCoords = {minX: 0, minY: 0, maxX: 2, maxY: 3};

      spyOn(mockRenderer, 'updateCell');
    }); 

     it("calls renderer with x, y for each cell to update and updates global cellsArr", function () {
      var cellsToUpdate = game.transitionCells();
      game.updateGameBoard(cellsToUpdate, mockRenderer);

      expect(mockRenderer.updateCell).toHaveBeenCalledWith(0, 1, cellSize, true);
      expect(mockRenderer.updateCell).toHaveBeenCalledWith(1, 0, cellSize, false);
      expect(mockRenderer.updateCell).toHaveBeenCalledWith(1, 2, cellSize, false);
      expect(mockRenderer.updateCell).toHaveBeenCalledWith(2, 1, cellSize, true);
      // expect cellsArr to be updated with new values
      expect(game.cellsArr[0][1]).toBe(true);
      expect(game.cellsArr[1][0]).toBe(false);
      expect(game.cellsArr[1][2]).toBe(false);
      expect(game.cellsArr[2][1]).toBe(true);
    });
  });
});
