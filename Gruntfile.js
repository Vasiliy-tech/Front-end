module.exports = function(grunt) {
	grunt.initConfig({
		shell: {
			server: { /* Подзадача */
    			command: 'java -jar Game-1.0-jar-with-dependencies.jar'
 			   	/* запуск сервера */
			}
		},
		fest: {
			templates: { /* Подзадача */
   				 files: [{
				        expand: true,
				        cwd: 'templates', /* исходная директория */
				        src: '*.xml', /* имена шаблонов */
				        dest: 'public_html/js/tmpl' /* результирующая директория */
				    }],    
				 options: {
					template: function (data) { /* формат функции-шаблона */
						return grunt.template.process(
					        /* присваиваем функцию-шаблон переменной */
					        //'var <%= name %>Tmpl = <%= contents %> ;',
					        'define(function () { return <%= contents %> ; });',
					        {data: data}
					    );
					}
				 }    
			}	
		},
		watch: {
			fest: { /* Подзадача */
    			files: ['templates/*.xml'], /* следим за шаблонами */
			    tasks: ['fest'], /* перекомпилировать */
			    options: {
			        atBegin: true /* запустить задачу при старте */
			    }
			},
			server: { /* Подзадача */
    			files: ['public_html/js/**/*.js'], /* следим за JS */
			    options: {
			        livereload: true /* автоматическая перезагрузка */
				}
			},
			sass:{
				files: ['public_html/css/scss/*.scss'],
				tasks: ['sass'],
				options:{
					atBegin: true,
					livereload: true
				}
			}	
		},
		concurrent:{
			target: ['watch', 'shell'], /* Подзадача */
			options: {
			        logConcurrentOutput: true, /* Вывод процесса */
			}
		},
		sass:{
			css:{
				files: [{
		        expand: true,
		        cwd: 'public_html/css/scss', /* исходная директория */
		        src: 'main.scss', /* имена шаблонов */
		        dest: 'public_html/css', /* результирующая директория */
		        ext:  '.css'
		    }]},
		    compress:{
		    	options:{
		    		style: 'compressed'
		    	},
		    	files: {
		    		'public_html/css/main.min.css' : 'public_html/css/scss/main.scss'
		    	}
		    }
		},
		requirejs:{
			build:{
				options: {
					almond: true,
					baseUrl: "public_html/js",
					mainConfigFile: "public_html/js/main2.js",
					name: "main2",
					optimize: "none",
					out: "public_html/js/build/main2.js"
				}
			}
		},
		concat: {
			build: {
				separator: ';\n',
				src: [
					'public_html/js/lib/almond.js',
					'public_html/js/build/main2.js'
				],
				dest: 'public_html/js/build.js'
			}
		},
		uglify:{
			build: {
				files: {
					'public_html/js/build.min.js':
						['public_html/js/build.js']
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concurrent','sass','concat',]);
	grunt.registerTask(
	    'build',
	    [
		'fest', 'requirejs:build',
		'concat:build', 'uglify:build'
	    ]
	);
  };
