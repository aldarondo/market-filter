module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-jslint');
    grunt.initConfig({
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
        }
    });
    grunt.registerTask('default', 'Run linting', ['jslint']);
};