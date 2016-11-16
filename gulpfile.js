var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var del = require("del");
var runSequence = require("run-sequence");
const colors = require('colors');

global.debug = false;
switch (process.env.MODE) {
    case 'debug':
        global.debug = true;
        console.log('DEBUG MODE ENABLED'.red.bold)
        break;
    default:
        break;
}

// Pull through environment config object
var envVars = eval(require("typescript").transpile(require("fs").readFileSync("./gulp-env.ts").toString()));

global.development = false;
global.production = false;

switch (process.env.DEPLOY_MODE) {
    case 'development':
        console.log('development '.green.bold + 'envionment active'.green);
        global.development = true;
        global.env = envVars.development;
        break;
    case 'production':
        console.log('PRODUCTION '.red.bold + 'environment active'.red);
        global.production = true;
        global.env = envVars.production;
        break;
    default:
        console.log('development '.green.bold + 'envionment active'.green);
        global.development = true;
        global.env = envVars.development;
        break;
}

global.globals = envVars.globals;

global.helpers = eval(require("typescript").transpile(require("fs").readFileSync("./tasks/helpers.ts").toString()));

const files = [
    "./tasks/build.ts",
    "./tasks/lint.ts",
    "./tasks/watch.ts"
];

files.forEach(function(file) {
    eval(require("typescript").transpile(require("fs").readFileSync(file).toString()))
});
