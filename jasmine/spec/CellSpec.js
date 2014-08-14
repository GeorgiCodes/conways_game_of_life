describe("Cell", function () {

  describe("cell constructor", function () {
    it("creates a cell object with x, y and alive values", function () {
      var cell = new Cell(0, 9, true);

      expect(cell.x).toEqual(0);
      expect(cell.y).toEqual(9);
      expect(cell.isAlive).toEqual(true);  
    });
  });
});
