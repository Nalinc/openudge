var srcclient = source + "client/";
var srcserver = source + "server/";

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    bower: {
        install: {
          options: { 
            verbose: true,
            copy:false
          }             
        }
    },    
    express: { 
        options: {
            port: serverport,
        },  
        dev: {
          options: {
            script: srcserver + 'index.js',
            node_env: 'development'
          }
        },
        prod: {
          options: {
            script: distserver + 'index.js',
            node_env: 'production'
          }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('build', [
    'bower:install' 
  ]);

  grunt.registerTask('serve', function (target) {
      if (target === 'dev') {
          return grunt.task.run([ 
              'build', 
              'express:dev'
          ]);
      }
      return grunt.task.run([
             'build',
             'express:prod'
           ]);
    });

  grunt.registerTask('default', [ 
      'build'        
  ]);  

};