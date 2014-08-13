;(function(exports) {
	"use strict";
  // Main application object
  // ----------------

  var App = function() {
  	var renderer = new Renderer("screen");
    var game = new Game(renderer);
    this.game = game;  
  };

  App.prototype = {
    seed: function(patternType) {
      var patternLoader = new GamePatternLoader(this.game);
      patternLoader.loadPatternIntoGame(patternType);
    }
  }

  // exports objects to global scope
  exports.App = App;

})(this);

// Start game
// ----------

// When the DOM is ready, create (and start) the game.
window.onload = function() {
  var app = new App();

  var stepButton = document.getElementById("stepSim");
  var startButton = document.getElementById("startSim");
  var oscillator = document.getElementById("oscillator");
  var glider = document.getElementById("glider");
  var random = document.getElementById("random");
  var gosperGun = document.getElementById("gosperGun");

  // TODO: use bind
  stepButton.addEventListener('click', function() {
    app.game.step();
  }, false);
  startButton.addEventListener('click', function() {
    app.game.start();
  }, false);
  oscillator.addEventListener('click', function() {
    app.seed("oscillator");
  }, false);
  glider.addEventListener('click', function() {
    app.seed("glider");
  }, false);
  random.addEventListener('click', function() {
    app.seed("random");
  }, false);
  gosperGun.addEventListener('click', function() {
    app.seed("gosperGun");
  }, false);
};