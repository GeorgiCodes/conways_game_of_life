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
      expect(game.cellSize).toBe(10);
      expect(game.cellsArr.length).toBe(0);
      expect(game.minMaxCoords).toBeDefined();
    });
  });

  describe("num cells", function () {
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

  describe("init cells", function () {
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


});

  //   describe("oscillator pattern", function () {
  //     beforeEach(function() {
  //       game = new Game(mockRenderer);
  //     });

  //     it("initializes pattern", function () {
  //       game.seed("oscillator");

  //       expect(game.aliveCells.size).toEqual(3);
  //       expect(game.aliveCells.has("1/0")).toBe(true);
  //       expect(game.aliveCells.has("1/1")).toBe(true);
  //       expect(game.aliveCells.has("1/2")).toBe(true);
  //       expect(game.cells.get("1/0").isAlive).toBe(true);
  //       expect(game.cells.get("1/1").isAlive).toBe(true);
  //       expect(game.cells.get("1/2").isAlive).toBe(true);
  //     });

  //     it("counts neighbours of initial pattern cells", function () {
  //       game.seed("oscillator");

  //       expect(game.countAliveNeighbours(game.cells.get("1/0"))).toEqual(1);
  //       expect(game.countAliveNeighbours(game.cells.get("1/1"))).toEqual(2);
  //       expect(game.countAliveNeighbours(game.cells.get("1/2"))).toEqual(1);
  //       expect(game.countAliveNeighbours(game.cells.get("0/1"))).toEqual(3);
  //       expect(game.countAliveNeighbours(game.cells.get("2/1"))).toEqual(3);
  //     });

  //     it("updates alive cells of second iteration", function () {
  //       game.seed("oscillator");
  //       game.step();

  //       // console.log(game.aliveCells.get("0/1"));
  //       // console.log(game.aliveCells.get("1/1"));
  //       // console.log(game.aliveCells.get("2/1"));

  //       expect(game.aliveCells.size).toEqual(3);
  //       // new values
  //       expect(game.aliveCells.has("0/1")).toBe(true);
  //       expect(game.aliveCells.has("1/1")).toBe(true);
  //       expect(game.aliveCells.has("2/1")).toBe(true);
  //       // previous values
  //       expect(game.aliveCells.has("1/0")).toBe(false);
  //       expect(game.aliveCells.has("1/2")).toBe(false);
  //     });

  //     it("updates alive cells of third iteration", function () {
  //       game.seed("oscillator");
  //       game.step();
  //       game.step();

  //       expect(game.aliveCells.size).toEqual(3);
  //       // new values
  //       expect(game.aliveCells.has("1/0")).toBe(true);
  //       expect(game.aliveCells.has("1/1")).toBe(true);
  //       expect(game.aliveCells.has("1/2")).toBe(true);
  //       // previous values
  //       expect(game.aliveCells.has("0/1")).toBe(false);
  //       expect(game.aliveCells.has("2/1")).toBe(false);
  //     });
  //   });

  // describe("glider pattern", function () {
  //   beforeEach(function() {
  //     var mockRenderer = new MockRenderer();
  //     game = new Game(mockRenderer);
  //   });

  //   it("initializes pattern", function () {
  //     game.seed("glider");

  //     expect(game.aliveCells.size).toEqual(5);
  //     expect(game.aliveCells.has("1/3")).toBe(true);
  //     expect(game.aliveCells.has("1/4")).toBe(true);
  //     expect(game.aliveCells.has("2/4")).toBe(true);
  //     expect(game.aliveCells.has("2/5")).toBe(true);
  //     expect(game.aliveCells.has("0/5")).toBe(true);
  //   });

  //   it("updates alive cells of second iteration", function () {
  //     game.seed("oscillator");
  //     game.step();

  //     // console.log(game.aliveCells.get("0/1"));
  //     // console.log(game.aliveCells.get("1/1"));
  //     // console.log(game.aliveCells.get("2/1"));

  //     expect(game.aliveCells.size).toEqual(3);
  //     // new values
  //     expect(game.aliveCells.has("1/3")).toBe(true);
  //     expect(game.aliveCells.has("1/4")).toBe(true);
  //     expect(game.aliveCells.has("2/4")).toBe(true);
  //     expect(game.aliveCells.has("2/5")).toBe(true);
  //     expect(game.aliveCells.has("0/5")).toBe(true);

  //     // previous values
  //     expect(game.aliveCells.has("1/3")).toBe(true);
  //     expect(game.aliveCells.has("1/4")).toBe(true);
  //     expect(game.aliveCells.has("2/4")).toBe(true);
  //     expect(game.aliveCells.has("2/5")).toBe(true);
  //     expect(game.aliveCells.has("0/5")).toBe(true);
  //   });

  // });

// });
