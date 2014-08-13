module.exports = function(grunt) {

  // Project Configuration
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'public/app.js', 'public/dataWrangler.js', 'public/game.js', 'public/renderer.js'],
      options: {
        globals: {
          jQuery: false,
          console: true,
          module: true,
          document: true
        }
      }
    }
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', 'jshint');
};
