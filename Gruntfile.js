module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            js: {
                src: 'app/js/app.js',
                dest: 'dist/js/app.js',
                options: {
                    external: ['angular'],
                    debug: true,
                    browserifyOptions: { debug: true }
                }
            }
        },
        copy: {
            all: {
                // This copies all the html, css and js into the dist/ folder
                expand: true,
                cwd: 'app/',
                src: ['**/*.html', '**/*.css', '**/*.controller.js', '**/*.service.js', '**/*.factory.js', '**/*.directive.js', '**/**/*.svg', '**/*.jpg', '**/*.png'],
                dest: 'dist/',
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/boardSet1.css': 'app/css/boardSet1.scss',
                    'dist/css/boardSet2.css': 'app/css/boardSet2.scss'
                }
            }
        },
        watch: {
            js: {
                files: "app/**/*.js",
                tasks: ['browserify', 'copy']
            },
            html: {
                files: 'app/**/*.html',
                tasks: 'copy'
            },
            css: {
                files: 'app/**/*.css',
                tasks: 'copy'
            },
            scss: {
                files: 'app/**/*.scss',
                tasks: 'sass'
            }
        },
        'http-server': {
            dev: {
                root: './dist',
                port: 3000,
                openBrowser: true,
                runInBackground: true
            }
        }
    });

    // Load the npm installed tasks
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // The default tasks to run when you type: grunt
    grunt.registerTask('default', ['browserify', 'copy', 'sass', 'http-server', 'watch']);
};