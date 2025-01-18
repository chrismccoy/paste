const { execSync } = require('child_process');
const { LANGUAGES, skipBuild } = require("./client/languages");

function runCommand(cmd, opts = {}) {
    opts.stdio = ["inherit", "inherit", "inherit"];
    try {
        execSync(cmd, opts);
    } catch (error) {
        console.error(`Error executing command: ${cmd}\n`, error.message);
        process.exit(1);
    }
}

const languages = Object.keys(LANGUAGES).filter((l) => !skipBuild.includes(l));

const commands = [
    "node ./db.js",
    `node ./tools/build.js -t browser ${languages.join(" ")}`,
    "cp work/highlight.js/build/highlight.min.js public/js/highlight.js",
    "./node_modules/.bin/rollup -c",
    "gzip -f -k public/js/highlight.js",
    "brotli -f -k public/js/highlight.js",
    "gzip -f -k public/js/bundle.js",
    "brotli -f -k public/js/bundle.js"
];

commands.forEach((command, index) => {
    const options = index === 1 ? { cwd: "./work/highlight.js" } : {};
    runCommand(command, options);
});
