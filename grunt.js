/*global module:false*/
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-recess');

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', 'dist/all.js'],
				dest: 'dist/all.min.js'
			}
		},
		qunit: {
			tests: ['test/**/*.html']
		},
		lint: {
			files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
		},
		watch: {
			files: ['grunt.js', 'lib/**', 'src/**', 'test/**'],
			tasks: 'lint qunit recess'
		},
		jshint: {
			options: {
				boss: true,
				browser: true,
				curly: false,
				eqeqeq: true,
				eqnull: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				smarttabs: true,
				sub: true,
				undef: true
			},
			globals: {
				define: true,
				jQuery: true,
				require: true
			}
		},
		uglify: {},
		requirejs: {
			combine: {
				options: {
					appDir: 'src',
					baseUrl: '.',
					dir: 'dist',
					optimize: 'none',
					optimizeCss: 'none',
					paths: {
					},
					modules: [
					]
				}
			}
		},
		recess: {
			compile: {
				src: ['src/less/fuelux-ckeditor.less'],
				dest: 'dist/css/fuelux-ckeditor.css',
				options: {
					compile: true
				}
			},
			/*compile_responsive: {
				src: ['src/less/fuelux-ckeditor-responsive.less'],
				dest: 'dist/css/fuelux-ckeditor-responsive.css',
				options: {
					compile: true
				}
			},*/
			compress: {
				src: ['src/less/fuelux-ckeditor.less'],
				dest: 'dist/css/fuelux-ckeditor.min.css',
				options: {
					compile: true,
					compress: true
				}
			}/*,
			compress_responsive: {
				src: ['src/less/fuelux-ckeditor-responsive.less'],
				dest: 'dist/css/fuelux-ckeditor-responsive.min.css',
				options: {
					compile: true,
					compress: true
				}
			}*/
		},
		clean: {
			dist: ['dist/build.txt', 'dist/fuelux-ckeditor.zip'],
			docs: ['dist/docs/'],
			zipsrc: ['dist/fuelux-ckeditor']
		},
		copy: {
			images: {
				options: {
					basePath: 'src/img'
				},
				files: {
					'dist/img': 'src/img/**'
				}
			},
			docs: {
				options: {
					basePath: 'docs/themes'
				},
				files: {
					'dist/docs/themes': 'docs/themes/**'
				}
			},
			//TODO: ask adam what this does
			zipsrc: {
				options: {
					basePath: 'dist'
				},
				files: {
					'dist/fuelux-ckeditor': 'dist/**'
				}
			}
		},
		compress: {
			zip: {
				files: {
					'dist/fuelux-ckeditor.zip': 'dist/fuelux-ckeditor/**'
				},
				options: {
					mode: 'zip',
					basePath: 'dist/'
				}
			}
		}
	});

	// Default task.
	grunt.registerTask('default', 'lint qunit requirejs recess copy:images clean:dist clean:docs min copy:zipsrc compress clean:zipsrc docs');
	grunt.registerTask('s', 'lint qunit recess server watch'); // development server
	grunt.registerTask('docs', 'clean:docs yuidoc copy:docs');

	// Helper for running shell scripts
	grunt.registerHelper('exec_shell_script', function (path, done) {
		var cmd = require('child_process').spawn('bash', [path]);

		cmd.stderr.on('data', function(data) {
			grunt.log.write(data.toString());
		});

		cmd.stdout.on('data', function(data) {
			grunt.log.write(data.toString());
		});

		cmd.on('exit', function(code) {
			done(code);
		});
	});

	grunt.registerTask('updateLibraries', 'Updates the lib folder in the Fuel UX CKeditor', function () {
		var done = this.async();
		grunt.helper('exec_shell_script', 'util/update-libraries.sh', done);
	});

};
