;(function(exports) {
  "use strict";

  // UI Renderer object
  // ----------------

  // View logic to draw and update canvas
  var Renderer = function(canvasId) {
    this.canvasId = canvasId;
    this.isRainbow = false;
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
      ctx.fillStyle = isAlive ? this.getAliveColour() : this.getDeadColour();
      ctx.stroke();
      ctx.fill();
    },
    getAliveColour: function() {
      if (this.isRainbow) { 
        return this.randomizeColour();
      } 
      return "#3366FF"; 
    },
    getDeadColour: function() {
      if (this.isRainbow) {
        return "#FFFFFF";
      }
      return "#99FFCC";
    },
    randomizeColour: function() {
      return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }
  };

  // exports objects to global scope
  exports.Renderer = Renderer;

})(this);
