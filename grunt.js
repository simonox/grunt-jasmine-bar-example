module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: ['Gruntfile.js', 'spec/**/*js','src/**/*js'],
      tasks: ['jshint', 'jasmine']
    },
	uglify: {
	      options: {
	        banner: '/*! Bar build from <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	      },
		  dist: {
		  	files: {
		    	'dist/bar.min.js': ['src/*.js']
		     }
		  }
	},
	jsdoc : {
	        dist : {
	            src: ['src/*.js', 'test/*.js'], 
	            dest: 'doc'
	        }
	},
    jasmine : {
		pivotal: {
		      src: 'src/**/*.js',
		      options: {
		        specs: 'spec/*Spec.js',
		        helpers: 'spec/*Helper.js'
		      }
		}

    },
	jshint: {
	    // http://www.jshint.com/docs/
		options: {
	      curly: true,
	      eqeqeq: true,
	      eqnull: true,
	      browser: true,
	      globals: {
	        jQuery: true
	      },
	   },
	   all: ['src/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['uglify', 'jshint', 'jasmine', 'jsdoc']);

};