'use strict';

module.exports = function (grunt) {
    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        express: 'grunt-express-server'
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: {
            client: require('./bower.json').appPath || 'client'
        },
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: 'server/app.js',
                    debug: false
                }
            }
        },
        watch: {
            injectJS: {
                files: [
                    '!<%= yeoman.client %>/app/app.js',
                    '<%= yeoman.client %>/{app,components}/**/*.js'
                    ],
                tasks: ['injector:scripts']
            },
            injectCss: {
                files: [
                    '<%= yeoman.client %>/{app,components}/**/*.css'
                ],
                tasks: ['injector:css']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
                    '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',

                    '.tmp/{app,components}/**/*.js',

                    '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
                    '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
                    '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                options: {
                    livereload: true
                }
            },
            express: {
                files: [
                    'server/**/*.{js,json}'
                ],
                tasks: ['express:dev', 'wait'],
                options: {
                    livereload: true,
                    nospawn: true //Without this option specified express won't be reloaded
                }
            }
        },
        // Debugging with node inspector
        'node-inspector': {
            custom: {
                options: {
                    'web-host': 'localhost'
                }
            }
        },

        nodemon: {
            debug: {
                script: 'server/app.js',
                options: {
                    nodeArgs: ['--debug-brk'],
                    env: {
                        PORT: process.env.PORT || 9000
                    },
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    }
                }
            }
        },
        // Automatically inject Bower components into the app
        wiredep: {
            target: {
                src: '<%= yeoman.client %>/index.html',
                ignorePath: '<%= yeoman.client %>/',
                exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/']
            }
        },

        injector: {
            options: {},
            // Inject application script files into index.html (doesn't include bower)
            scripts: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/client/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.client %>/index.html': [
                        [
                            '<%= yeoman.client %>/{app,components}/**/*.js',
                        ]
                    ]
                }

            },

            // Inject component css into index.html
            css: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/client/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.client %>/index.html': [
                        '<%= yeoman.client %>/{app,components}/**/*.css'
                    ]
                }
            }
        }
    });

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 1500);
    });

    grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
        this.async();
    });

    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'injector',
            'wiredep',
            'express:dev',
            'wait',
            'watch'
        ]);
    });
};

