module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jslint: {
            client: {
                src: [
                    'static/*.js'
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
        }
    });

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['jslint', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
};