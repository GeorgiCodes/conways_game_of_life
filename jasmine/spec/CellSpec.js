describe("Cell", function () {
    var gameSize = {};

    beforeEach(function() {
      gameSize = {x: 10, y: 12};
    });

    describe("cell constructor", function () {
      it("creates a list of neighbours for a top left coordinate", function () {
        var cell = new Cell(0, 0, false, gameSize);
        var result = cell.neighbours;

        expect(result.size).toEqual(3);
        expect(result.has("1/0")).toBe(true);
        expect(result.has("0/1")).toBe(true);
        expect(result.has("1/1")).toBe(true);
      });

      it("creates a list of neighbours for a top right coordinate", function () {
        var cell = new Cell(9, 0, false, gameSize);
        console.log(cell.toString());
        var result = cell.neighbours;

        expect(result.size).toEqual(3);
        expect(result.has("8/0")).toBe(true);
        expect(result.has("8/1")).toBe(true);
        expect(result.has("9/1")).toBe(true);
      });

      it("creates a list of neighbours for a top middle coordinate", function () {
        var cell = new Cell(4, 0, false, gameSize);
        var result = cell.neighbours;

        expect(result.size).toEqual(5);
      });

      it("creates a list of neighbours for a middle", function () {
        var cell = new Cell(4, 4, false, gameSize);
        var result = cell.neighbours;

        expect(result.size).toEqual(8);
      });

      it("creates a list of neighbours for a bottom left coordinate", function () {
        var cell = new Cell(0, 11, false, gameSize);
        var result = cell.neighbours;

        expect(result.size).toEqual(3);
      });

      it("creates a list of neighbours for a bottom right coordinate", function () {
        var cell = new Cell(9, 11, false, gameSize);
        var result = cell.neighbours;

        expect(result.size).toEqual(3);
      });

      it("creates a list of neighbours for a bottom middle coordinate", function () {
        var cell = new Cell(4, 11, false, gameSize);
        var result = cell.neighbours;

        expect(result.size).toEqual(5);
      });

    });

    describe("cell constructor", function () {
      it("creates a string of x and y values", function () {
        var cell = new Cell(5, 8, false, gameSize);
        var result = cell.toString();

        expect(result).toEqual("5/8");
      });
    });
});
