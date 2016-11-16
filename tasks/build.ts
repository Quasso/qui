import { Gulpclass, Task, SequenceTask } from 'gulpclass/Decorators';

declare var require, env, global, helpers: any;
declare var global: any;
declare var helpers: any;
declare var development, debug, production: boolean;

const gulp = require('gulp');
const _ = require('lodash');
const del = require('del');
const path = require('path');
const sh = require('shelljs');
let stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');
const autoprefixer = require('gulp-autoprefixer');
const colors = require('colors');
const sourcemaps = require('gulp-sourcemaps');
const fs = require('fs');



// Import Typescript settings
const tsProject = ts.createProject('./tsconfig.json');

@Gulpclass()
export class Gulpfile {
  /********************
  Clean tasks
  prefix: clean
  ********************/


  @Task("cleanNode")
  cleanNode() {
    return del(["./node_modules/**"]);
  }


  @Task("cleanTypings")
  cleanTypings() {
    return del(["./typings/globals/**"])
  }

  /********************
  Install libs
  prefix: install
  ********************/


  @Task()
  installNode(cb: Function) {
    console.log('Installing all node dependencies...'.bold);

    let result = sh.exec("npm install");

    if (result.code !== 0) {
      cb(new Error(result.output));
      return;
    } else {
      console.log('Node modules were all successfully installed.'.green);
    }

    cb();
  }

  @Task()
  installTypings(cb: Function) {
    let tsdBin = path.join("node_modules", ".bin", "typings");

    // First reinstall any missing definitions to the typings directory.
    let result = sh.exec(`${tsdBin} install`);

    helpers.checkShellError(cb, result)
  }

  /********************
  Compilation
  prefix: compile
  ********************/

  @Task()
  compileTypescript() {
    const tsResult = gulp.src(helpers.paths.ts).pipe(tsProject());
    tsResult.dts.pipe(gulp.dest(helpers.paths.dtsDest));
    tsResult.js.pipe(gulp.dest(helpers.paths.jsDest));
    return tsResult;
  }


  /********************
  Utility tasks
  prefix: utility
  ********************/
  @Task()
  removeComments() {
    return gulp.src(helpers.paths.dist + '/bundle.js')
    .pipe(stripDebug())
    .pipe(gulp.dest(helpers.paths.dist));
  }



  // $ gulp build
  // This builds for staging or production to build directory
  @SequenceTask()
  build() {
    let defaultBuild = ['default'];
    return defaultBuild;
  }

  // $ gulp
  // This task is quicker to initialise than the first-run task, since it assumes your local ./node_modules folder is up-to-date
  @SequenceTask()
  default () {
    // For production, don't copy source code over into built directory ;)
    return ['cleanBuild', 'cleanTypings', 'installTypings','compileTypescript'];
  }
  // $ gulp reinitialise
  // This task clears the ./node_modules folder and then installs all node
  // dependencies, then runs a full build. Useful if you want to refresh the libraries due to some random issue
  @SequenceTask('reinitialise')
  firstRun() {
    return ['cleanNode', 'installNode', 'default'];
  }
  // $ gulp init
  @SequenceTask()
  init() {
    return ['reinitialise', 'setupE2E', 'test:unit', 'lint:scss', 'lint:ts', 'watchBundle', 'watchChanges', 'serve'];
  }
}
