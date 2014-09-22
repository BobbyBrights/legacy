// Gruntfile for compiling SASS (that's all it's used for, for now, but I would
// run jasmine tests (through Karma) if I had time
'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        compass: {
            dist: {
                options: {
                    sassDir: 'ui/app/styles/',
                    cssDir: 'ui/app/styles/',
                    environment: 'production'
                }
            },
            dev: {
                options: {
                    sassDir: 'ui/app/styles/',
                    cssDir: 'ui/app/styles/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.registerTask('default', ['compass']);
};
