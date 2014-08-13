const start = "Start";
const stop = "Stop";
const rainbow = "rainbow";
const blue = "blue";

;(function(exports) {
	"use strict";
  // Main application object
  // ----------------

  var App = function() {
  	var renderer = new Renderer("screen");
    var game = new Game(renderer, false);
    this.game = game;  
    this.renderer = renderer;

    var renderer2 = new Renderer("screen2");
    var gameOptimized = new Game(renderer2, true);
    this.gameOptimized = gameOptimized;  
    this.renderer2 = renderer2;
  };

  App.prototype = {
    seed: function(patternType) {
      var patternLoader = new GamePatternLoader(this.game);
      patternLoader.loadPatternIntoGame(patternType);

      var patternLoader2 = new GamePatternLoader(this.gameOptimized);
      patternLoader2.loadPatternIntoGame(patternType);
    },
    step: function() {
      // for (var i = 0; i < 52; i ++) {
      this.game.start();
      this.gameOptimized.start();
        // }
    },
    stepOnce: function() {
      this.game.step();
      this.gameOptimized.step();
    },
    performAction: function(action) {
      if (action == start) {
        this.game.start();
              this.gameOptimized.start();

      }
      if (action == stop) {
        this.game.stop();
      }
    },
    setCellColour: function(style) {
      if (style == rainbow) {
        this.renderer.isRainbow = true;
      } else {
        this.renderer.isRainbow = false; 
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
  var acornBtn = document.getElementById("acorn");
  var rainbowBtn = document.getElementById("rainbow");  
  var blueBtn = document.getElementById("blue");  
  var stepOnce = document.getElementById("stepOnceSim");  

  stepButton.addEventListener('click', app.step.bind(app));
    stepOnce.addEventListener('click', app.stepOnce.bind(app));

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
  acornBtn.addEventListener('click', function() {
    app.seed("acorn");
  }, false);
  rainbowBtn.addEventListener('click', function() {
    app.setCellColour(rainbow);
  }, false);
  blueBtn.addEventListener('click', function() {
    app.setCellColour(blue);
  }, false);
};