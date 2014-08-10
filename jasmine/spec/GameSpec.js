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

    describe("count neighbours", function () {
      it("counts no neighbours for far left", function () {
        res = game.countNeighbours(0, 0, cells);
        expect(res).toEqual(0);
      });

      it("counts no neighbours for far left", function () {
        res = game.countNeighbours(0, 0, cells);
        expect(res).toEqual(0);
      });
    });
});
