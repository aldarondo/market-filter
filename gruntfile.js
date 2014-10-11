module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jslint: {
            client: {
                src: [
                    'app/js/*.js'
                ],
                directives: {
                    node: false,
                    browser: true,
                    nomen: true,
                    predef: [
                        'angular'
                    ]
                }
            }
        },
        jasmine: {
            pivotal: {
                src: 'app/js/*.js',
                options: {
                    specs: 'tests/**/*.js',
                    vendor: [
                        'app/bower_components/angular/angular.js',
                        'node_modules/angular-mocks/angular-mocks.js',
                        'app/bower_components/angular-cookies/angular-cookies.js'
                    ]
                }
            }
        },
        concat: {
            css: {
                src: [
                    'css/*'
                ],
                dest: 'dist/combined.css'
            },
            js: {
                src: [
                    'static/*.js'
                ],
                dest: 'dist/combined.js'
            }
        },
        cssmin: {
            css: {
                src: 'combined.css',
                dest: 'dist/combined.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/combined.js': ['dist/combined.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/js/*.js'],
                tasks: ['jslint', 'jasmine']
            }
        }
    });

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('default', ['jasmine', 'jslint', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
};