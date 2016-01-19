var grunt = require('grunt');
//require('load-grunt-tasks')(grunt); // autoloads grunt extentions, so you don't have "require" them individually
require('jit-grunt')(grunt, {
 express: 'grunt-express-server'
});

// report on time taken for each task
require('time-grunt')(grunt);

grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'), // read and parse package.json into pkg variable

  jshint: { // runs jshint on all js files
    files: ['Gruntfile.js','public/js/*.js'],
    options: {
      jshintrc: true // we have a .jshintrc file which lays out the rules
    }
  },

  clean: ['dist'], // deletes everything in this folder

  copy: {
    html: { // copies html into dist folder
      src: ['public/**/*.html'],
      dest: 'dist/',
      expand: true,
      flatten: true
    },
    photos: { // copies photos into dist/photos
      src: ['public/photos/**'],
      dest: 'dist/photos/',
      flatten: true,
      expand: true,
      filter: 'isFile'
    }
  },

  less: { // interprets less imports, compiles less > css, concats css into one big file
    all: {
      files: {
        'dist/css/style.css':'public/less/**/*.less'
      }
    },
    options: {
      strictImport: true,
      sourceMap: true // allows us to see the less, instead of just the css, in the browser
    }
  },

  uglify: { // combines and ugilifies (minifies) js
    all: {
      files: {
        'dist/js/app.js': ['public/js/*.js'],
        'dist/js/tas.js': ['public/js/takeAStand/*.js'],
        'dist/js/vendor.js':['public/js/vendor/*.js']
      },
    },
    options: { // switch these flags to turn on minification
      compress: false,
      mangle: false,
      beautify: true
    }
  },

  watch: { // reruns tasks when certain files change
    js: {
      files: ['public/js/**/*.js'],
      tasks: ['jshint', 'uglify']
    },
    server: {
      files: ['server.js'],
      tasks: ['default']
    },
    css: {
      files: ['public/less/**/*.less'],
      tasks: ['less']
    },
    html: {
      files: ['public/**/*.html'],
      tasks: ['copy']
    },
    grunt: {
      files: 'Gruntfile.js',
      tasks: ['default']
    },
    options: {
      spawn: false // prevents annoying "EADDRINUSE" exception from express/watch combination
    }
  },

  express: { // starts the server
    dev:{
      options: {
        script: 'server.js',
        node_env: 'development'
      }
    }
  }
});

// runs the following tasks when you just type "grunt"
grunt.registerTask('default', ['jshint', 'build']);
// runs the following tasks when you type "grunt build", also referenced in above task
grunt.registerTask('build', ['clean','copy','less', 'uglify', 'express:dev','watch']);
grunt.registerTask('build:only', ['clean', 'copy', 'less', 'uglify']);
