/// <reference path="typings/globals/grunt/index.d.ts" />
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        jshint: {
            BackEnd : ['js/BackEnd/*.js'],
            MultiEnd : ['js/MultiEnd/*.js'],
            FacebookEnd : ['js/FacebookEnd/*.js']
        },
        uglify: {
            options: {
                mangle:false,
                beautify : true
            },
            MultiEnd: {
                files: {
                    'js/dist/MultiEnd.min.js': ["js/MultiEnd/*.js"]
                }
            },
            FacebookEnd: {
                files: {
                    'js/dist/FacebookEnd.min.js': ["js/dist/MultiEnd.min.js", "js/FacebookEnd/*.js"]
                }
            },
            BackEnd: {
                files: {
                    //'js/dist/BackEnd.min.js': ["js/BackEnd/lib/openpgp.min.js", "js/BackEnd/BackEnd.js"]
                    'js/dist/BackEnd.min.js': ["js/dist/MultiEnd.min.js", "js/BackEnd/*.js"]
                }
            }
        },
        watch:{
            FacebookEnd:{
                files: ['js/FacebookEnd/*.js'],
                tasks: ['jshint:FacebookEnd', 'uglify:MultiEnd', 'uglify:FacebookEnd'],
                options: {spawn : false}
            },
            BackEnd:{
                files: ['js/BackEnd/*.js'],
                tasks: ['jshint:BackEnd', 'uglify:MultiEnd', 'uglify:BackEnd'],
                options: {spawn : false}
            }
        },
        typings: {
            install: {
                "globalDependencies": {
                    "chrome": "registry:dt/chrome#0.0.0+20161212190028",
                    "openpgp": "registry:dt/openpgp#0.0.0+20160510002910",
                },
                "dependencies": {
                    "promise": "registry:dt/promise#7.1.1+20160726182927"
                }
            }
        }
    });
    grunt.registerTask('default', ['jshint', 'uglify', "typings"]);

};