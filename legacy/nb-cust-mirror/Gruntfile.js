'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'ui/new/assets',
            dist: 'dist'
        },

        compass: {                  // Task
            dist: {                   // Target
                options: {              // Target options
                    sassDir: '<%= yeoman.app %>/styles',
                    cssDir: '<%= yeoman.app %>/styles',
                    environment: 'production',
                    raw: 'preferred_syntax = :sass\n'
                }
            },
            dev: {                    // Another target
                options: {
                    sassDir: '<%= yeoman.app %>/styles',
                    cssDir: '<%= yeoman.app %>/styles',
                    raw: 'preferred_syntax = :sass\n'
                }
            }
        },

        // Concatenate JS
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: [
                    '<%= yeoman.app %>/bower_components/crypto-js/rollups/tripledes.js',
                    '<%= yeoman.app %>/js/navigation/states.js',
                    '<%= yeoman.app %>/bower_components/jquery/dist/jquery.js',
                    '<%= yeoman.app %>/bower_components/jquery-1.8.2/jquery.js',//1.8.2 support the jcountdown plugin
                    '<%= yeoman.app %>/bower_components/angular/angular.js',
                    '<%= yeoman.app %>/bower_components/angular-bootstrap/ui-bootstrap.min.js',
                    '<%= yeoman.app %>/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    '<%= yeoman.app %>/bower_components/underscore/underscore.js',
                    '<%= yeoman.app %>/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    '<%= yeoman.app %>/bower_components/angular-resource/angular-resource.min.js',
                    '<%= yeoman.app %>/bower_components/bootstrap/dist/js/bootstrap.min.js',
                    '<%= yeoman.app %>/bower_components/angular-ui-utils/modules/event/event.js',
                    '<%= yeoman.app %>/bower_components/angular-breadcrumb/release/angular-breadcrumb.js',
                    // Services
                    '<%= yeoman.app %>/js/services/auth.js',
                    '<%= yeoman.app %>/js/services/localStorage.js',
                    '<%= yeoman.app %>/js/services/breadCrumbs.js',
                    '<%= yeoman.app %>/js/services/http.js',
                    '<%= yeoman.app %>/js/subscription/service.js',
                    '<%= yeoman.app %>/js/lottery/service.js',
                    '<%= yeoman.app %>/js/bet/service.js',
                    '<%= yeoman.app %>/js/user/service.js',
                    '<%= yeoman.app %>/js/card/service.js',
                    '<%= yeoman.app %>/js/account/service.js',
                    '<%= yeoman.app %>/js/payment/service.js',
                    // Resources
                    '<%= yeoman.app %>/js/user/resource.js',
                    '<%= yeoman.app %>/js/account/resource.js',
                    '<%= yeoman.app %>/js/subscription/resource.js',
                    '<%= yeoman.app %>/js/lottery/resource.js',
                    '<%= yeoman.app %>/js/bet/resource.js',
                    '<%= yeoman.app %>/js/card/resource.js',
                    // Controllers
                    '<%= yeoman.app %>/js/user/controller.js',
                    '<%= yeoman.app %>/js/user/controller_modal.js',
                    '<%= yeoman.app %>/js/user/register/controller.js',
                    '<%= yeoman.app %>/js/user/forgetPassword/controller.js',
                    '<%= yeoman.app %>/js/user/resetPassword/controller.js',
                    '<%= yeoman.app %>/js/user/notification/controller.js',
                    '<%= yeoman.app %>/js/user/notification/controller_modal.js',
                    '<%= yeoman.app %>/js/account/controller.js',
                    '<%= yeoman.app %>/js/subscription/controller.js',
                    '<%= yeoman.app %>/js/subscription/result/controller.js',
                    '<%= yeoman.app %>/js/subscription/edit/controller.js',
                    '<%= yeoman.app %>/js/lottery/controller.js',
                    '<%= yeoman.app %>/js/lottery/draw/result/controller.js',
                    '<%= yeoman.app %>/js/lottery/draw/next/controller.js',
                    '<%= yeoman.app %>/js/subscription/read/controller.js',
                    '<%= yeoman.app %>/js/account/detail/controller.js',
                    '<%= yeoman.app %>/js/account/payment/controller.js',
                    '<%= yeoman.app %>/js/account/withdraw/controller.js',
                    '<%= yeoman.app %>/js/account/transaction/controller.js',

                    // Runtime
                    '<%= yeoman.app %>/js/runtime/events.js',
                    '<%= yeoman.app %>/js/runtime/config.js',
                    '<%= yeoman.app %>/js/runtime/filter.js',
                    '<%= yeoman.app %>/js/runtime/functions.js',
                    '<%= yeoman.app %>/js/runtime/directives.js',
                    '<%= yeoman.app %>/js/runtime/globalController.js',
                    // App.js
                    '<%= yeoman.app %>/js/app.js'
                ],
                dest: '<%= yeoman.app %>/js/dist/built.js'
            }
        },
        watch: {
            scripts: {
                files: ['<%= yeoman.app %>/**/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false
                }
            }
        },

        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    '<%= yeoman.app %>/js/dist/built.min.js': ['<%= yeoman.app %>/js/dist/built.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.registerTask('jsmin', ['concat', 'uglify']);
    grunt.registerTask('default', ['compass', 'concat']);

    // grunt.registerTask('uglify', ['concat', 'uglify']);

    // Mirror test.
};
