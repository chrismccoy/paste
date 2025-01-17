const { execSync } = require('child_process');
const { LANGUAGES, skipBuild } = require("./client/languages");

function runCommand(command, options = {}) {
    options.stdio = ["inherit", "inherit", "inherit"];
    execSync(command, options);
}

const languagesToBuild = Object.keys(LANGUAGES).filter(language => !skipBuild.includes(language));

const buildCommands = [
    `node ./tools/build.js -t browser ${languagesToBuild.join(" ")}`,
    `cp work/highlight.js/build/highlight.min.js public/js/highlight.js`,
    `./node_modules/.bin/rollup -c`,
    `gzip -f -k public/js/highlight.js`,
    `brotli -f -k public/js/highlight.js`,
    `gzip -f -k public/js/bundle.js`,
    `brotli -f -k public/js/bundle.js`
];

buildCommands.forEach(command => runCommand(command, { cwd: "./work/highlight.js" }));
