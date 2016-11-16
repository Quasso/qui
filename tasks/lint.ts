import { Gulpclass, Task, SequenceTask } from "gulpclass/Decorators";

declare var require, process: any;

const scsslint = require('gulp-scss-lint');
const sh = require("shelljs");
const gutil = require('gulp-util');

@Gulpclass()
export class Lint {
  @Task('lint:ts')
  runTSLint(cb: Function) {
    let result = sh.exec("/bin/bash ./test/lint-ts.sh");
    if (result.code !== 0) {
      console.log('Error with lint:ts'.red);
       process.exit(1);
    }
    cb();
  }

  @SequenceTask('lint')
  lint() {
    return ['lint:ts']
  }
}

