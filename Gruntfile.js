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
            'dist/js/perfmatters.min.js': ['src/js/perfmatters.js']
          }
        },
        my_target2: {
          files: {
            'dist/views/js/main.min.js': ['src/views/js/main.js']
          }
        }
      },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      },
      target1: {
        files: [{
          expand: true,
          cwd: 'src/views/css',
          src: ['*.css'],
          dest: 'dist/views/css',
          ext: '.min.css'
        }]
      }
    },
    imagemin: {                          // Task
        dynamic: {
          options: {                       // Target options
            optimizationLevel: 3,
            svgoPlugins: [{ removeViewBox: false }],
          },                         // Another target
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: 'src/img/',                   // Src matches are relative to this path
            src: ['*.{png,jpg,gif}'],   // Actual patterns to match
            dest: 'dist/img/'                  // Destination path prefix
          }]
        },
        dynamic2: {
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: 'src/views/images/',                   // Src matches are relative to this path
            src: ['*.{png,jpg,gif}'],   // Actual patterns to match
            dest: 'dist/views/images/'                  // Destination path prefix
          }]
        },

      },
    watch: {
       scripts: {
        files: ['src/js/*.js','src/views/js/*.js'],
        tasks: 'uglify',
      options: {
          spawn: false,
        },
       },
       css: {
        files: ['src/css/*.css','src/views/css/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false,
        },
       },
       img: {
        files: ['src/img/*.{png,jpg,gif}','src/views/images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        },
       },
    },


    });
  // Register default tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('allwork', ['imagemin','uglify','cssmin']);
};
