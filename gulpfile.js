var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var path = require('path');
// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
})

gulp.task('less', function () {
  return gulp.src('src/less/common.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }))
    .pipe(gulp.dest('src/css'))

});

// Watchers
gulp.task('watch', function() {
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
})



gulp.task('default', function(callback) {
  runSequence(['less', 'browserSync', 'watch'],
    callback
  )
})
