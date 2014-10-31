module.exports = function(grunt) {
	'use strict';

	var me = this;

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		config : grunt.file.readJSON('./config/config.json'),
		/**
		 * js编译打包流程，会把js目录下的依赖合并到main文件后打包到dist目录去
		 */
		requirejs : {
			tranditionCompile : {
				options : {
					baseUrl: ".",
					appDir : '<%= config.src.jsPath%>',
					dir : '<%= config.build.jsPath%>',
					optimize : 'uglify2',/***2014-10-31 修改 uglify --- > uglify2***/
                    generateSourceMaps: true,/***2014-10-31 新增生成 sourcemap***/
					mainConfigFile : '<%= config.requirejs.configFile %>',
					modules : '<%= config.requirejs.modules %>',
					logLevel : 0,
					findNestedDependencies: true,
			        fileExclusionRegExp: /^\./,
			        inlineText: true,
			        preserveLicenseComments: false
				}
			}
		},
		cssmin : {
			build : {
				expand: true,
				cwd: 'src/css/',
				src : ['page/*.css'],
				dest : 'build/css'
			}
		},

		watch : {
			css : {
				files : ['<%= config.src.cssPath%>/**/*.css'],
				options : {
					nospawn : true
				}
			}
		},
        copy: {
          main: {
              files:[{//字体
                expand: true,
                cwd: '<%= config.src.font%>',
                src: '**',
                dest: 'build/css/font/',
                flatten: true,
                filter: 'isFile'              
              },{//html 片段文件
                expand: true,
                cwd: 'html/partials/',
                src: '**',
                dest: 'build/partials/',
                flatten: true,
                filter: 'isFile'              
              },{//图片
                expand: true,
                cwd: 'src/img/',
                src: '**',
                dest: 'build/img/',
                flatten: true,
                filter: 'isFile'              
              }]
          }
        },        
		/**
		 * 打包完成后删除多余的目录
		 */
		clean : {
			js : {
				src : '<%= config.clean.js%>'
			}
		},
		connect: {
		    server: {
			    options: {
		        	port: 8080,
		        	base: '.'
		      	}
		    }
		}
	});
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('build', ['requirejs', 'clean', 'cssmin','copy']);
	grunt.registerTask('start', ['clean', 'connect', 'watch']);
	grunt.registerTask('default', ['build']);
};