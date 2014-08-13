;(function(exports) {
  "use strict";

  // UI Renderer object
  // ----------------

  // View logic to draw and update canvas
  var Renderer = function(canvasId) {
    this.canvasId = canvasId;
    this.initGameBoard();
  };

  Renderer.prototype = {
    canvas: function() {
      return document.getElementById(this.canvasId);
    },
    ctx: function() {
      return this.canvas().getContext("2d");
    },
    gameSize: function() {
      return { x: this.canvas().width, y: this.canvas().height };
    },
    initGameBoard: function() {
      this.ctx().clearRect(0, 0, this.gameSize().x, this.gameSize().y);
      this.ctx().strokeStyle = "white";
    },
    updateCell: function(x, y, cellSize, isAlive) {
      this.drawRect(x*cellSize, y*cellSize, cellSize, cellSize, isAlive);  
    },
    drawRect: function(x, y, w, h, isAlive) {
      var ctx = this.ctx();
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fillStyle = isAlive ? '#6495ed' : '#ffffff';
      ctx.stroke();
      ctx.fill();
    }
  };

  // exports objects to global scope
  exports.Renderer = Renderer;

})(this);
