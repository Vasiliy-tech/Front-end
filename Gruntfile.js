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
		    }]}
		}
	});
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concurrent',]);
  };