var pkg = require('./package.json');

var client = pkg.micro.client;
var server = pkg.micro.server;
var dist = pkg.micro.dist;
var source = pkg.micro.source;

var distclient = dist + "client/";
var distserver = dist + "server/";
var srcclient = source + "client/";
var srcserver = source + "server/";
var serverport = process.env.PORT || 8080;

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
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('build', [
    'bower:install' 
  ]);

  grunt.registerTask('serve', function (target) {
      if (target === 'dev') {
          return grunt.task.run([ 
              'build', 
              'express:dev',
              'express-keepalive:dev'
          ]);
      }
      return grunt.task.run([
             'build',
             'express:prod',
             'express-keepalive:prod'
           ]);
    });

    grunt.registerTask('express-keepalive', 'Keep grunt running', function(target) {
        var message = 'Openudge is running on http://localhost:' + serverport; 
        if (target == "dev") {
            message += " in development mode";
        } else {
            message += " in production mode";
        }
        console.log(message);
        this.async();       
    });

  grunt.registerTask('default', [ 
      'build'        
  ]);  

};