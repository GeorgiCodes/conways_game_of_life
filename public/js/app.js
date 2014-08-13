const start = "Start";
const stop = "Stop";


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
    },
    step: function() {
      this.game.step();
    },
    performAction: function(action) {
      if (action == start) {
        this.game.start();
      }
      if (action == stop) {
        this.game.stop();
      }
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
  var oscillatorBtn = document.getElementById("oscillator");
  var gliderBtn = document.getElementById("glider");
  var randomBtn = document.getElementById("random");
  var gosperGunBtn = document.getElementById("gosperGun");

  stepButton.addEventListener('click', app.step.bind(app));
  startButton.addEventListener('click', function() {
    var currentAction = startButton.innerHTML;
    app.performAction(currentAction);
    startButton.innerHTML = (currentAction == stop) ? start : stop ;
  }, false);

  oscillatorBtn.addEventListener('click', function() {
    app.seed("oscillator");
  }, false);
  gliderBtn.addEventListener('click', function() {
    app.seed("glider");
  }, false);
  randomBtn.addEventListener('click', function() {
    app.seed("random");
  }, false);
  gosperGunBtn.addEventListener('click', function() {
    app.seed("gosperGun");
  }, false);
};