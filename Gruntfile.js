/**
 * grunt-pagespeed-ngrok
 * http://www.jamescryer.com/grunt-pagespeed-ngrok
 *
 * Copyright (c) 2014 James Cryer
 * http://www.jamescryer.com
 */
'use strict';

module.exports = function(grunt) {
  // Grunt configuration
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    uglify: {
        my_target: {
          files: {
            'js/perfmatters.min.js': ['js/perfmatters.js', 'js/!*.min.js']
          }
        },
        my_target2: {
          files: {
            'views/js/main.min.js': ['views/js/main.js', 'views/js/!*.min.js']
          }
        }
      },
      cssmin: {
        target: {
          files: [{
            expand: true,
            cwd: 'css',
            src: ['*.css', '!*.min.css'],
            dest: 'css',
            ext: '.min.css'
          }]
        },
        target1: {
          files: [{
            expand: true,
            cwd: 'views/css',
            src: ['*.css', '!*.min.css'],
            dest: 'views/css',
            ext: '.min.css'
          }]
        }
      },
      imagemin: {                          // Task
          dynamic: {
            options: {                       // Target options
              optimizationLevel: 5,
              svgoPlugins: [{ removeViewBox: false }],
            },                         // Another target
            files: [{
              expand: true,                  // Enable dynamic expansion
              cwd: 'img/',                   // Src matches are relative to this path
              src: ['*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'img/dist/'                  // Destination path prefix
            }]
          },
          dynamic2: {
            files: [{
              expand: true,                  // Enable dynamic expansion
              cwd: 'views/images/',                   // Src matches are relative to this path
              src: ['*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'views/images/dist/'                  // Destination path prefix
            }]
          },

        },
      watch: {
         scripts: {
          files: ['js/*.js','views/js/*.js'],
          tasks: 'uglify',
        options: {
            spawn: false,
          },
         },
         css: {
          files: ['css/*.css','views/css/*.css'],
          tasks: ['cssmin'],
          options: {
            spawn: false,
          },
         },
         img: {
          files: ['img/*.{png,jpg,gif}','views/images/*.{png,jpg,gif}'],
          tasks: ['imagemin'],
          options: {
            spawn: false,
          },
         },


      },


    });
  // Register default tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('imagmin', ['imagemin']);
};
