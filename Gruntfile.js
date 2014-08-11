module.exports = function(grunt) {

  // Project Configuration
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'public/**/*.js'],
      options: {
        // options here to override JSHint defaults
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
  // grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', 'jshint');
};
