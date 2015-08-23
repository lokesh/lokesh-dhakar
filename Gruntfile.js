module.exports = function(grunt) {

  grunt.initConfig({
    // concat: {
    //   dist: {
    //     src: ['bower_components/jquery/dist/jquery.js', 'src/js/lightbox.js'],
    //     dest: 'dist/js/lightbox-plus-jquery.js',
    //   },
    // },
    // copy: {
    //   dist: {
    //     files: [
    //       {
    //         expand: true,
    //         cwd: 'src/',
    //         src: ['**'],
    //         dest: 'dist/'
    //       }
    //     ],
    //   },
    // },
    // jshint: {
    //   all: [
    //     'src/js/lightbox.js'
    //   ],
    //   options: {
    //     jshintrc: true
    //   }
    // },
    // jscs: {
    //   src: [
    //     'src/js/lightbox.js'
    //   ],
    //   options: {
    //     config: ".jscsrc"
    //   }
    // },
    // uglify: {
    //   options: {
    //     preserveComments: 'some',
    //     sourceMap: true
    //   },
    //   dist: {
    //     files: {
    //       'dist/js/lightbox.min.js': ['src/js/lightbox.js'],
    //       'dist/js/lightbox-plus-jquery.min.js': ['dist/js/lightbox-plus-jquery.js']
    //     }
    //   }
    // },
    sass: {
      dist: {
        files: {
          'dist/css/main.css' : 'src/sass/main.sass'
        }
      }
    },
    watch: {
      sass: {
        files: ['src/sass/*.sass'],
        tasks: ['sass']
      }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  // grunt.loadNpmTasks("grunt-jscs");

  grunt.registerTask('default', ['watch']);
  // grunt.registerTask('test', ['jshint', 'jscs']);
  // grunt.registerTask('build', ['jshint', 'jscs', 'copy:dist', 'concat', 'uglify']);
};
