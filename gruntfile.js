module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
    });

    grunt.initConfig({
        appDir: 'app/js/*.js',
        testDir: 'tests/**/*.js',
        jslint: {
            client: {
                src: [
                    '<%= appDir %>'
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
            coverage: {
                src: '<%= appDir %>',
                options: {
                    specs: '<%= testDir %>',
                    vendor: [
                        'app/bower_components/angular/angular.js',
                        'node_modules/angular-mocks/angular-mocks.js',
                        'app/bower_components/angular-cookies/angular-cookies.js'
                    ],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'dist/coverage/coverage.json',
                        report: 'dist/coverage',
                        thresholds: {
                            lines: 75,
                            statements: 75,
                            branches: 75,
                            functions: 90
                        }
                    }
                }
            }
        },
        concat: {
            css: {
                src: [
                    'app/css/*'
                ],
                dest: 'dist/combined.css'
            },
            js: {
                src: [
                    '<%= appDir %>'
                ],
                dest: 'dist/combined.js'
            }
        },
        cssmin: {
            css: {
                src: 'dist/combined.css',
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
                files: ['<%= appDir %>', '<%= testDir %>'],
                tasks: ['jslint', 'jasmine']
            }
        },
        concurrent: {
            angularnode: {
                tasks:['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server/server.js',
                options: {
                    nodeArgs: ['--debug']
                }
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
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', ['concurrent:angularnode']);
    grunt.registerTask('deploy', ['jasmine', 'jslint', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
};