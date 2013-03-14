/*global module:false*/
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib');

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
			tasks: 'lint qunit'
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
                        'aurl': '../lib/aurl',
                        'fuelux-ckeditor': '../dist',
                        'jquery': '../lib/jquery'
					},
					modules: [
                        {
                            name: 'fuelux-editor/all',
                            exclude: ['jquery'],
                            include: ['aurl']
                        }
					]
				}
			}
		},
		clean: {
			dist: ['dist/build.txt', 'dist/fuelux-ckeditor.zip'],
			zipsrc: ['dist/fuelux-ckeditor']
		},
		copy: {
            ckeditor: {
                options: {
                    basePath: 'lib/ckeditor-dev/dev/builder/release/ckeditor'
                },
                files: {
                    'dist/ckeditor': 'lib/ckeditor-dev/dev/builder/release/ckeditor/**'
                }
            },
			images: {
				options: {
					basePath: 'src/img'
				},
				files: {
					'dist/img': 'src/img/**'
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
	grunt.registerTask('default', 'lint qunit requirejs copy:ckeditor copy:images clean:dist min copy:zipsrc compress clean:zipsrc');
	grunt.registerTask('devserver', 'lint qunit server watch'); // development server

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
