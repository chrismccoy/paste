const { execSync } = require('child_process');
const { LANGUAGES, skipBuild } = require("./client/languages");
const languages = Object.keys(LANGUAGES).filter((l) => !skipBuild.includes(l));
const path = require('path');

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
    { cmd: "npm install", file: "npm" },
    { cmd: "npm --prefix work/highlight.js install", file: "work/highlight.js/package.json" },
    { cmd: `node ${path.join('tools', 'build.js')} -t browser ${languages.join(" ")}`, file: path.join('tools', 'build.js') },
    { cmd: `cp ${path.join('work', 'highlight.js', 'build', 'highlight.min.js')} ${path.join('public', 'js', 'highlight.js')}`, file: path.join('work', 'highlight.js', 'build', 'highlight.min.js') },
    { cmd: `${path.join(__dirname, 'node_modules', '.bin', 'rollup -c')}`, file: "rollup.config.js" },
    { cmd: `${path.join(__dirname, 'node_modules', '.bin', 'sass --style=compressed --no-source-map public/css/app.scss public/css/app.css')}`, file: "public/css/app.scss" },
    { cmd: "node db.js", file: "db.js" }
];

commands.forEach(({ cmd, file }, index) => {
    const options = index === 2 ? { cwd: path.join(__dirname, 'work', 'highlight.js') } : {};
    runCommand(cmd, options);
});

