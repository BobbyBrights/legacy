module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['ui/assets/js/**/*.js'],
                dest: 'ui/dist/js/<%= pkg.name %>.js'
            }
        },
        clean: {
            build: {
                src: ['ui/dist/']
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'ui/assets/css',
                    cssDir: 'ui/assets/css',
                    environment: 'production'
                }
            }
        },
        watch: {
            scripts: {
                files: ['ui/assets/**/*.js'],
                tasks: ['clean', 'concat'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['ui/assets/**/*.scss'],
                tasks: ['compass']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean', 'concat', 'compass']);

};