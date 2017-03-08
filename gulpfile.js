
//配置脚本

var gulp = require('gulp'),
	less = require('gulp-less'),
	clean = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch');
	

//新建任务对象

var path = {
	indexH:'src/index.html',
	cssObj:'src/less/index.less',
	jsObj:'src/itemsJs/index.js',
	iconfont:'src/iconfont/*',
	img:'src/img/*',
	jsCom:'src/js/*'
}

//新建任务 - 上传资源

gulp.task('move',function(){
	gulp.src(path.indexH)
	.pipe(gulp.dest('build'))
	gulp.src(path.iconfont)
	.pipe(gulp.dest('build/iconfont'))
	gulp.src(path.img)
	.pipe(gulp.dest('build/img'))
	gulp.src(path.jsCom)
	.pipe(gulp.dest('build/js'))
})


//新建任务 - 自动编译css并上传到压缩版到build

gulp.task('less2css',function(){
	gulp.src(path.cssObj)
	.pipe(less())
	.pipe(gulp.dest('src/css'))
	.pipe(rename({suffix:'.min'}))
	.pipe(clean())
	.pipe(gulp.dest('build/css'))
})

//新建任务 - 压缩js并上传到build

gulp.task('jsObj',function(){
	gulp.src(path.jsObj)
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('build/itemsJs'))
})

//新建监听任务
gulp.task('watch',['less2css','jsObj','move'],function(){
	gulp.watch([path.cssObj,path.jsObj,path.indexH],['less2css','jsObj','move']);
})

