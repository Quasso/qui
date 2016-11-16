declare var require, globals, env: any;

const ngAnnotate = require('browserify-ngannotate');

export const paths = {
  ts: ['src/**/*.ts', 'typings/globals/**/*.d.ts', 'typings-custom/*.d.ts'],
  tslint: ['src/api/**/**.ts', 'gulp-tasks/*.ts', 'test/e2e/features/**/*.ts'],
  jsDest: globals.TEMP_DIR,
  working: './src/',
  nodeModules: 'node_modules',
  temp: './.temp',
  dist: env.dir.BUILD_ROOT_DIR
};

export const checkShellError: Function = function(cb, result) {
  if (result.code !== 0) {
    cb(new Error(result.output));
    return;
  }
  cb();
}

module.exports = {
  paths: paths,
  checkShellError: checkShellError
}
