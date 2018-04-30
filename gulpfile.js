const gulp          = require("gulp");
const less          = require("gulp-less");
const cssnano       = require("gulp-cssnano");
const autoprefixer  = require("gulp-autoprefixer");
const concat        = require("gulp-concat");
const clean         = require("gulp-clean");
const sourcemaps    = require("gulp-sourcemaps");
const browserSync   = require('browser-sync').create();

const fs = require("fs");
const argmnt = process.argv.pop().slice(1);

const folders = {
  "js": "./javascripts/*",
  "css": "./stylesheets/*",
};

gulp.task('browser-sync', function() {
  
});

gulp.task("clean", () => {
  if (folders[argmnt]) gulp.src(folders[argmnt]).pipe(clean());
  else console.warn("(console): not found folder");
});

gulp.task("stylesheets", () => {
  gulp.src("./src/stylesheets/*.less")
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(concat("index.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./stylesheets/"));

    browserSync.reload();
});

gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./index.html").on("change", browserSync.reload);
  gulp.watch("./src/stylesheets/*.less", ["stylesheets"]);
});
