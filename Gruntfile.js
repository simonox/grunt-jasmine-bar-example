module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		watch: {
			files: ['Gruntfile.js', 'spec/**/*js', 'src/**/*js'],
			tasks: ['jshint', 'jasmine']
		},
		jsdoc: {
			dist: {
				src: ['src/*.js', 'test/*.js'],
				dest: 'doc'
			}
		},
		jasmine: {
			pivotal: {
				src: 'src/**/*.js',
				options: {
					specs: 'spec/*Spec.js',
					helpers: 'spec/*Helper.js'
				}
			}

		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true
			},
			all: ['src/*.js', 'Gruntfile.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsdoc');

	// Default task.
	grunt.registerTask('default', ['jshint', 'jasmine', 'jsdoc']);

};
