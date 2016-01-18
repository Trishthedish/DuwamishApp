  var grunt = require('grunt');
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js','public/js/**/*.js'],
      options: {
        jshintrc: true
      }
    },
    clean: ['dist'],
    copy: {
      all: {
        src: ['public/**/*.html'],
        dest: 'dist/',
        expand: true,
        flatten: true
      }
    },
    less: {
      all: {
        files: {
          'dist/css/style.css':'public/less/**/*.less',
          'dist/css/*.css':'public/css/vendor/*.css'
        }
      },
      options: {
        strictImport: true,
        sourceMap: true
      }
    },
    uglify: {
      js: {
        files: {
          'dist/js/app.js': ['public/js/**/*.js']
        },
      },
      options: {
        compress: false,
        mangle: false,
        beautify: true
      }
    },
    watch: {
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
        tasks: 'default'
      },
      // options: {
      //   spawn: false
      // }
    },
    express: {
      dev:{
        options: {
          script: 'server.js',
          node_env: 'development'
        }
      }
    }
  });

  grunt.registerTask('build', ['clean','copy','less', 'uglify:js', 'express:dev','watch']);
  grunt.registerTask('default', ['jshint', 'build']);
