;(function(exports) {
	"use strict";

  // Main application object
  // ----------------

  var App = function() {
  	var renderer = new Renderer("screen");
    var game = new Game(renderer);
    this.game = game;  
    this.renderer = renderer;

    this.initEventListeners();
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
      if (action == "Start") {
        this.game.start();
      }
      if (action == "Stop") {
        this.game.stop();
      }
    },
    setCellColour: function(style) {
      if (style == "rainbow") {
        this.renderer.isRainbow = true;
      } else {
        this.renderer.isRainbow = false; 
      }
    },
    initEventListeners: function() {
      var stepButton = document.getElementById("stepSim");
      var startButton = document.getElementById("startSim");
      var oscillatorBtn = document.getElementById("oscillator");
      var gliderBtn = document.getElementById("glider");
      var acornBtn = document.getElementById("acorn");
      var randomBtn = document.getElementById("random");
      var gosperGunBtn = document.getElementById("gosperGun");
      var rainbowBtn = document.getElementById("rainbow");  
      var blueBtn = document.getElementById("blue");  

      var self = this;

      stepButton.addEventListener('click', this.step.bind(this));
      startButton.addEventListener('click', function() {
        var currentAction = startButton.innerHTML;
        self.performAction(currentAction);
        startButton.innerHTML = (currentAction == "Stop") ? "Start" : "Stop";
      }, false);

      oscillatorBtn.addEventListener('click', function() {
        self.seed("oscillator");
      }, false);
      gliderBtn.addEventListener('click', function() {
        self.seed("glider");
      }, false);
      randomBtn.addEventListener('click', function() {
        self.seed("random");
      }, false);
      gosperGunBtn.addEventListener('click', function() {
        self.seed("gosperGun");
      }, false);
      acornBtn.addEventListener('click', function() {
        self.seed("acorn");
      }, false);
      rainbowBtn.addEventListener('click', function() {
        self.setCellColour("rainbow");
      }, false);
      blueBtn.addEventListener('click', function() {
        self.setCellColour("blue");
      }, false);
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
};