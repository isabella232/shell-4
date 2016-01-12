'use strict';

module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Environment config
        env: {
            src: 'src',
            dest: 'dist'
        },

        // Watch
        watch: {

            // Sass
            sass: {
                files: 'src/assets/scss/**/*.scss',
                tasks: [
                    'sass',
                    'postcss'
                ]
            },

            // Assemble
            assemble: {
                files: ['src/**/*'],
                tasks: ['assemble']
            }
        },

        // Assemble
        assemble: {
            options: {
                assets: 'src/assets/',
                layout: 'page.hbs',
                layoutdir: 'src/layouts/',
                partials: 'src/partials/**/*',
                data: 'src/data/**/*'
            },
            pages: {
                cwd: 'src/views/',
                dest: 'dist/',
                expand: true,
                src: '**/*.hbs'
            }
        },

        // Sass compilation
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'expanded',
                precision: 3
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/scss',
                    src: '**/*.scss',
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },

        // PostCSS
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 1 version', 'ie 10', 'ie 11']
                    })
                ]
            },
            dist: {
                src: 'dist/css/*.css'
            }
        },

        // SVG-min
        svgmin: {
            options: {
                plugins: [{
                    cleanupIDs: true,
                    removeUselessStrokeAndFill: true,
                    removeTitle: true,
                    removeAttrs: true
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/img/',
                    src: ['*.svg'],
                    dest: 'dist/img/'
                }]
            }
        },

        // Connect
        connect: {
            dev: {
                options: {
                    port: 8000,
                    base: 'dist/'
                }
            }
        },

        // Clean
        clean: {
            dev: ['dist'],
            dist: {
                files: [{
                    dot: true,
                    src: ['dist/*']
                }]
            }
        }
    });

    // Register tasks and define them

    // Register tasks
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-svgmin');

    // Serve
    grunt.registerTask('serve', [
        'clean:dev',
        'assemble',
        'sass',
        'postcss',
        'svgmin',
        'connect',
        'watch'
    ]);

    // Build
    grunt.registerTask('build', [
        'clean:dist',
        'sass',
        'postcss',
        'svgmin',
        'assemble'
    ]);

    // Default
    grunt.registerTask('default', [
        'serve'
    ]);
};