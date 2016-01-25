
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: require('./config/watch-grunt'),
    mochaTest: require('./config/mocha-grunt'),
    jscs: require('./config/jscs-grunt'),
    bump: require('./config/bump-grunt')
  });

  // Default task.
  grunt.registerTask('default', ['jscs', 'mochaTest:problems']);

};
