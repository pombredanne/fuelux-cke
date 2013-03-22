/*global module:false*/
module.exports = function(grunt) {

    //TODO: upgrade to Grunt 0.4

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
        //TODO: upgrade to grunt .4 and make dynamic mappings to minify copied plugins / skins
        //https://github.com/gruntjs/grunt/wiki/Configuring-tasks
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
                    keepBuildDir: true,
					optimize: 'none',
					optimizeCss: 'none',
					paths: {
                        'aurl': '../lib/aurl',
                        'fuelux-cke': '../dist',
                        'jquery': '../lib/jquery'
					},
					modules: [
                        {
                            exclude: ['jquery', 'fuelux-cke/ckeditor/ckeditor'],
                            include: ['aurl'],
                            name: 'fuelux-cke/all'
                        }
					]
				}
			}
		},
		clean: {
            all: ['dist/**'],
			dist: ['dist/build.txt', 'dist/fuelux-cke.zip'],
			zipsrc: ['dist/fuelux-cke']
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
            plugins: {
                options: {
                    basePath: 'src/plugins'
                },
                files: {
                    'dist/plugins': 'src/plugins/**'
                }
            },
            skins: {
                options: {
                    basePath: 'src/skins'
                },
                files: {
                    'dist/skins': 'src/skins/**'
                }
            },
			//TODO: ask adam what this does
			zipsrc: {
				options: {
					basePath: 'dist'
				},
				files: {
					'dist/fuelux-cke': 'dist/**'
				}
			}
		},
		compress: {
			zip: {
				files: {
					'dist/fuelux-cke.zip': 'dist/fuelux-cke/**'
				},
				options: {
					mode: 'zip',
					basePath: 'dist/'
				}
			}
		}
	});

	// Default task.
    //TODO: make this lint
	grunt.registerTask('default', 'qunit clean:all copy:ckeditor copy:plugins copy:skins requirejs clean:dist min copy:zipsrc compress clean:zipsrc');
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
