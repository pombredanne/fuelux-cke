/*global module:false*/
module.exports = function(grunt) {

    //Configuration

    grunt.initConfig({
        clean: {
            dist: ['dist/'],
            final: ['dist/build.txt']
        },
        compress: {
            zip: {
                files: [
                    {
                        cwd: 'dist/',
                        expand: true,
                        src: ['**']
                    }
                ],
                options: {
                    archive: 'dist/fuelux-cke.zip',
                    mode: 'zip'
                }
            }
        },
        copy: {
            ckeditor: {
                expand: true,
                cwd: 'lib/ckeditor-dev/dev/builder/release/ckeditor/',
                src: ['**'],
                dest: 'dist/ckeditor'
            },
            plugins: {
                expand: true,
                cwd: 'src/plugins/',
                src: ['**'],
                dest: 'dist/plugins/'
            },
            skins: {
                expand: true,
                cwd: 'src/skins/',
                src: ['**'],
                dest: 'dist/skins'
            }
        },
        jshint: {
            options: {
                boss: true,
                browser: true,
                curly: false,
                eqeqeq: true,
                eqnull: true,
                globals: {
                    CKEDITOR: true,
                    define: true,
                    jQuery: true,
                    require: true
                },
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                smarttabs: true,
                sub: true,
                undef: true
            },
            source: ['Gruntfile.js', 'src/**/*.js'],
            tests: {
                options: {
                    undef: false,
                    unused: false,
                    latedef: false
                },
                files: {
                    src: ['test/**/*.js']
                }
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            /*full: {
             options: {
             urls: '<%= testUrls %>'
             }
             },*/
            simple: ['test/**/*.html']
        },
        requirejs: {
            combine: {
                options: {
                    appDir: 'src',
                    baseUrl: '.',
                    dir: 'dist',
                    keepBuildDir: true,
                    modules: [
                        {
                            exclude: ['jquery', 'fuelux-cke/ckeditor/ckeditor'],
                            include: ['aurl'],
                            name: 'fuelux-cke/all'
                        }
                    ],
                    normalizeDirDefines: 'all',
                    optimize: 'none',
                    optimizeCss: 'none',
                    paths: {
                        'aurl': '../lib/aurl',
                        'fuelux-cke': '../dist',
                        'jquery': '../lib/jquery'
                    },
                    wrap: true
                }
            }
        },
        shell: {
            devsetup: {
                command: grunt.file.read('util/devsetup.sh'),
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                }
            },
            mkdist: {
                command: 'mkdir dist'
            },
            updatelib: {
                command: grunt.file.read('util/updatelib.sh'),
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
            },
            all: {
                files: {
                    'dist/all.min.js': ['dist/all.js']
                }
            }
        },
        watch: {
            files: ['Gruntfile.js', 'lib/**', 'src/**', 'test/**'],
            tasks: ['lint', 'qunit']
        }
    });

    //Plugins

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    //Tasks

    grunt.registerTask('default', ['fulltest', 'clean:dist', 'shell:mkdist', 'copy:ckeditor', 'copy:plugins', 'copy:skins', 'requirejs', 'uglify', 'compress', 'clean:final']);

    grunt.registerTask('devserver', ['quicktest', 'watch']);
    //grunt.registerTask('devsetup', ['shell:devsetup']);

    grunt.registerTask('fulltest', ['jshint', 'qunit:simple']);
    grunt.registerTask('quicktest', ['jshint', 'qunit:simple']);

    grunt.registerTask('updatelib', ['shell:updatelib']);

};