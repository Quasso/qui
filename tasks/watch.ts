import { Gulpclass, Task, SequenceTask } from "gulpclass/Decorators";
const _ = require('lodash');
const browserify = require("browserify");
const webserver = require('gulp-webserver');
const watchify = require('watchify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const colors = require('colors');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const sh = require("shelljs");
const ts = require('gulp-typescript');

@Gulpclass()
export class Watch {
  @Task()
  watchBundle() {
    let opts = _.assign({}, watchify.args, helpers.browserifySettings)
    const b = watchify(browserify(opts).ignore('FB').ignore('Stripe').ignore('google').ignore('Clipboard'));

    let bundle = function() {
      return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(helpers.paths.dist + '/'))

    }
    b.on('log', gutil.log); // output build logs to terminal
    b.on('update', bundle)
    return bundle()
  }
  @Task()
  watchChanges(cb: Function) {
    gulp.watch(["./src/**/*.scss", "./lazy-loaded-src/**/*.scss"], ["lint:scss:watch", "compileSass"]);
    gulp.watch("./src/**/*.html", ["copyIndex", "compileTemplates", "utilityRegexReplace"]);
    gulp.watch(["./src/**/*.ts"], ["lint:ts:watch", "compileTypescript", "utilityRegexReplace"])
    gulp.watch("./assets/**/*", ["copyAssets"]);
    gulp.watch(['./lazy-loaded-src/**/*', '!./lazy-loaded-src/**/*.scss', '!./lazy-loaded-src/**/*.ts'], ['copyLazyFiles'])
    gulp.watch('./lazy-loaded-src/**/*', ['compileLazyTypescript'])
    console.log("Now watching src/ for changes to *.sass, *.html, and *.ts...".green);
    cb();
  }

  // $ gulp serve
  @Task()
  serve() {
    let defaultPort = 8888;
    console.log('Now serving on port:'.green, defaultPort);
    return gulp.src(helpers.paths.dist).pipe(webserver({
      path: '/',
      livereload: true,
      open: true,
      host: '0.0.0.0',
      fallback: 'index.html',
      port: defaultPort
    }));
  }

  // $ gulp watch s
  @SequenceTask('watch')
  watch() {
    return ['default', 'watchBundle', 'watchChanges', "serve"];
  }
}
