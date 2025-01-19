const { execSync } = require('child_process');
const { LANGUAGES, skipBuild } = require("./client/languages");
const languages = Object.keys(LANGUAGES).filter((l) => !skipBuild.includes(l));
const fs = require('fs');
const path = require('path');

const requiredBinaries = ['yarn', 'brotli', 'rollup'];

function checkBinariesExist() {
    requiredBinaries.forEach(binary => {
        try {
            execSync(`${binary} --version`, { stdio: 'ignore' });
        } catch {
            console.error(`Error: ${binary} is not installed. Please install it before running the build script.`);
            process.exit(1);
        }
    });
}

function runCommand(cmd, opts = {}) {
    opts.stdio = ["inherit", "inherit", "inherit"];
    try {
        execSync(cmd, opts);
    } catch (error) {
        console.error(`Error executing command: ${cmd}\n`, error.message);
        process.exit(1);
    }
}

const commands = [
    { cmd: "yarn", file: "yarn" },
    { cmd: "yarn --cwd work/highlight.js", file: "work/highlight.js/package.json" },
    { cmd: `node ./tools/build.js -t browser ${languages.join(" ")}`, file: "./tools/build.js" },
    { cmd: "cp work/highlight.js/build/highlight.min.js public/js/highlight.js", file: "work/highlight.js/build/highlight.min.js" },
    { cmd: "rollup -c", file: "rollup.config.js" },
    { cmd: "gzip -f -k public/js/highlight.js", file: "public/js/highlight.js" },
    { cmd: "brotli -f -k public/js/highlight.js", file: "public/js/highlight.js" },
    { cmd: "gzip -f -k public/js/bundle.js", file: "public/js/bundle.js" },
    { cmd: "brotli -f -k public/js/bundle.js", file: "public/js/bundle.js" }
];

checkBinariesExist();

commands.forEach(({ cmd, file }, index) => {
    const options = index === 2 ? { cwd: "./work/highlight.js" } : {};
    runCommand(cmd, options);
});
