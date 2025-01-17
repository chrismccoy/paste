const SKIP_BUILD = ["html"]
const languages = {
    // common
    apache: "Apache Config",
    bash: "Bash",
    coffeescript: "CoffeeScript",
    css: "CSS",
    go: "Go",
    javascript: "JavaScript",
    nginx: "Nginx Config",
    perl: "Perl",
    plaintext: "Text",
    python: "Python",
    php: "PHP",
    rust: "Rust",
    ruby: "Ruby",
    scss: "SCSS",
    typescript: "TypeScript",
}

module.exports = { LANGUAGES: languages, skipBuild: SKIP_BUILD }
