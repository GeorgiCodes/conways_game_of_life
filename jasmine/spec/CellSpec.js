describe("Cell", function () {

    describe("cell constructor", function () {
      it("creates a cell object with x, y and alive values", function () {
        var cell = new Cell(0, 9, true);

        expect(cell.x).toEqual(0);
        expect(cell.y).toEqual(9);
        expect(cell.isAlive).toEqual(true);  
      });

      // it("creates a list of neighbours for a top right coordinate", function () {
      //   var cell = new Cell(9, 0, false, gameSize);
      //   console.log(cell.toString());
      //   var result = cell.neighbours;

      //   expect(result.size).toEqual(3);
      //   expect(result.has("8/0")).toBe(true);
      //   expect(result.has("8/1")).toBe(true);
      //   expect(result.has("9/1")).toBe(true);
      // });

      // it("creates a list of neighbours for a top middle coordinate", function () {
      //   var cell = new Cell(4, 0, false, gameSize);
      //   var result = cell.neighbours;

      //   expect(result.size).toEqual(5);
      // });

      // it("creates a list of neighbours for a middle", function () {
      //   var cell = new Cell(4, 4, false, gameSize);
      //   var result = cell.neighbours;

      //   expect(result.size).toEqual(8);
      // });

      // it("creates a list of neighbours for a bottom left coordinate", function () {
      //   var cell = new Cell(0, 11, false, gameSize);
      //   var result = cell.neighbours;

      //   expect(result.size).toEqual(3);
      // });

      // it("creates a list of neighbours for a bottom right coordinate", function () {
      //   var cell = new Cell(9, 11, false, gameSize);
      //   var result = cell.neighbours;

      //   expect(result.size).toEqual(3);
      // });

      // it("creates a list of neighbours for a bottom middle coordinate", function () {
      //   var cell = new Cell(4, 11, false, gameSize);
      //   var result = cell.neighbours;

      //   expect(result.size).toEqual(5);
      // });

    });
});
