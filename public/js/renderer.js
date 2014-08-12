;(function(exports) {
  "use strict";

  // THink about creating a UI object
  // where game + renderer logic are spereated
  // 50000 button idea.

  // UI Renderer object
  // ----------------

  // Abstracts visual logic from game logic
  var Renderer = function(canvasId) {
    this.canvasId = canvasId;
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
    clearRect: function() {
      this.ctx().clearRect(0, 0, this.gameSize().x, this.gameSize().y);
    },
    setStrokeColour: function(colour) {
      this.ctx().strokeStyle = colour;
    },
    drawRect: function(x, y, w, h, isAlive) {
      var ctx = this.ctx();
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fillStyle = isAlive ? '#6495ed' : '#ffffff';
      ctx.stroke();
      ctx.fill();
    },
    drawBoundary: function(x, y, w, h) {
      var ctx = this.ctx();
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fillStyle = "pink";
      ctx.stroke();
      ctx.fill();
    }
  };

  // exports objects to global scope
  exports.Renderer = Renderer;

})(this);
