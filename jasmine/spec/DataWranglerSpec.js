describe( "DataWrangler", function () {

  var dataWrangler = null;
  var numCells = {x: 10, y: 10, maxX: 9, maxY: 9};
  var minMaxCoords = {minX: Number.MAX_VALUE, minY:Number.MAX_VALUE, maxX:Number.MIN_VALUE, maxY:Number.MIN_VALUE};

  describe("updateMinMaxCoords", function () {
    beforeEach(function() {
      dataWrangler = new DataWrangler();
    });

    it("updates minMaxCoords when given grid limits", function () {
      dataWrangler.updateMinMaxCoords(numCells, minMaxCoords, 0, 0);
      dataWrangler.updateMinMaxCoords(numCells, minMaxCoords, 9, 0);
      dataWrangler.updateMinMaxCoords(numCells, minMaxCoords, 0, 9);
      dataWrangler.updateMinMaxCoords(numCells, minMaxCoords, 9, 9);

      expect(minMaxCoords.minX).toBe(0);
      expect(minMaxCoords.maxX).toBe(9);
      expect(minMaxCoords.minY).toBe(0);
      expect(minMaxCoords.maxY).toBe(9);
    });

    it("updates minMaxCoords when one row and column in from grid limits to be grid limits", function () {
      dataWrangler.updateMinMaxCoords(numCells, minMaxCoords, 1, 1);
      dataWrangler.updateMinMaxCoords(numCells, minMaxCoords, 8, 1);
      dataWrangler.updateMinMaxCoords(numCells, minMaxCoords, 1, 8);
      dataWrangler.updateMinMaxCoords(numCells, minMaxCoords, 8, 8);

      expect(minMaxCoords.minX).toBe(0);
      expect(minMaxCoords.maxX).toBe(9);
      expect(minMaxCoords.minY).toBe(0);
      expect(minMaxCoords.maxY).toBe(9);
    });

  });

});
