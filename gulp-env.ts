const DEV_BUILD_PATH: string = './build';
const PRODUCTION_BUILD_PATH: string = './dist';
const APP_NAME: string = 'qui';

const TEMP_DIR: string = './.temp/';

const DEBUG = {
  fileName: TEMP_DIR + 'app/config.js',
  strings: {
    '@@DEBUG': (debug ? 'TRUE' : 'FALSE')
  }
}

module.exports = {
  APP_NAME: APP_NAME,
  globals: {
    TEMP_DIR: TEMP_DIR,
    NODE_DIR: 'node_modules'
  },
  development: {
    name: 'development',
    dir: {
      BUILD_ROOT_DIR: DEV_BUILD_PATH
    },
    files: [

    ]
  },
  production: {
    name: 'production',
    dir: {
      BUILD_ROOT_DIR: PRODUCTION_BUILD_PATH
    },
    files: [

    ]
  }
};

