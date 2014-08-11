describe( "Game", function () {
    var game;
    var cells = new Map;
    var cellSize = 20;
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
      clearRect: function() {
        // do nothing
      },
      setStrokeColour: function(colour) {
        // do nothing
      },
      drawRect: function(x, y, w, h) {
        // do nothing
      }
    };

    beforeEach(function() {
      var mockRenderer = new MockRenderer();
      game = new Game(mockRenderer);
    });

    describe("count neighbours for oscillator", function () {
      it("initializes pattern", function () {
        game.seed("oscillator");

        expect(game.aliveCells.size).toEqual(3);
        expect(game.aliveCells.has("1/0")).toBe(true);
        expect(game.aliveCells.has("1/1")).toBe(true);
        expect(game.aliveCells.has("1/2")).toBe(true);
        expect(game.cells.get("1/0").isAlive).toBe(true);
        expect(game.cells.get("1/1").isAlive).toBe(true);
        expect(game.cells.get("1/2").isAlive).toBe(true);
      });

      it("counts neighbours of first iteration", function () {
        game.seed("oscillator");
        // game.step();
        expect(game.countAliveNeighbours(game.cells.get("1/0"))).toEqual(1);
        expect(game.countAliveNeighbours(game.cells.get("1/1"))).toEqual(2);
        expect(game.countAliveNeighbours(game.cells.get("1/2"))).toEqual(1);

        expect(game.countAliveNeighbours(game.cells.get("0/1"))).toEqual(3);
        expect(game.countAliveNeighbours(game.cells.get("2/1"))).toEqual(3);

        expect(game.aliveCells.has("0/1")).toBe(true);
        expect(game.aliveCells.has("1/1")).toBe(true);
        expect(game.aliveCells.has("2/2")).toBe(true);
      });
    });
});
