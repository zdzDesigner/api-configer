var gulp = require('gulp')
var concat = require('gulp-concat')
var babel = require('gulp-babel')
var plumber = require('gulp-plumber')
var clean = require('del')
var fs = require('fs')
var babelConfig = fs.readFileSync('./.babelrc')

babelConfig = JSON.parse(babelConfig.toString('utf-8'))



var scripts =  {
    src: ['src/**/*.js'],
    // target:'index.js',
    dest:'lib'
}

function build(){
    return gulp.src(scripts.src)
        .pipe(plumber())
        .pipe(babel(babelConfig))
        // .pipe(concat(scripts.target))
        .pipe(gulp.dest(scripts.dest))
}

function watch() {
  clean.sync(scripts.dest)
  build()
  gulp.watch(scripts.src, build);
}


gulp.task('default', watch)