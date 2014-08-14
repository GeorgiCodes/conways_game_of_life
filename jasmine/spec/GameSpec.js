describe("Game", function () {
  var game;

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
    },
    drawRect: function(x, y, w, h) {
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
      expect(game.cellSize).toBe(5);
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

      expect(numCells.x).toBe(30);
      expect(numCells.y).toBe(15);
      expect(numCells.maxX).toBe(29);
      expect(numCells.maxY).toBe(14);
    });

  });

  describe("initCells", function () {
    beforeEach(function() {
      mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
    }); 

    it("initializes all cells as dead", function () {
      game.initCells();

      expect(game.cellsArr.length).toBe(30);
      // check bounds
      expect(game.cellsArr[0][0]).toBe(false);
      expect(game.cellsArr[29][0]).toBe(false);
      expect(game.cellsArr[0][0]).toBe(false);
      expect(game.cellsArr[0][14]).toBe(false);
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
      game.setMaxXCoord(29);
      expect(game.minMaxCoords.maxX).toBe(29);
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
      game.setMaxYCoord(14);
      expect(game.minMaxCoords.maxY).toBe(14);
    });

    it("updates minMaxCoords maxY to be 1 more than y when not on border", function () {
      game.setMaxYCoord(10);
      expect(game.minMaxCoords.maxY).toBe(11);
    });

  });

  // describe("step", function () {
  //   beforeEach(function() {
  //     mockRenderer = new MockRenderer();
  //     game = new Game(mockRenderer);
  //     game.init();
  //     game.cellsArr[1][0] = true;
  //     game.cellsArr[1][1] = true;
  //     game.cellsArr[1][2] = true;
  //   }); 

  //   it("runs optimized algorithm", function () {
  //     game.setMaxYCoord(14);
  //     expect(game.minMaxCoords.maxY).toBe(14);
  //   });

  // });
});
