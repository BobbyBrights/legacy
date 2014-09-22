module.exports = function (grunt) {
    grunt.initConfig({
        compass: {                  // Task
            dist: {                   // Target
                options: {              // Target options
                    sassDir: 'ui/app/assets/css/',
                    cssDir: 'ui/app/assets/css/',
                    environment: 'production'
                }
            },
            dev: {                    // Another target
                options: {
                    sassDir: 'ui/app/assets/css/',
                    cssDir: 'ui/app/assets/css/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.registerTask('default', ['compass']);
};