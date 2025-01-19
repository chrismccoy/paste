const SKIP_BUILD = ["html"]
const languages = {
    apache: "Apache Config",
    awk: "Awk",
    bash: "Bash",
    coffeescript: "CoffeeScript",
    css: "CSS",
    go: "Go",
    graphql: "GraphQL",
    javascript: "JavaScript",
    json: "Json",
    nginx: "Nginx Config",
    perl: "Perl",
    plaintext: "Text",
    python: "Python",
    php: "PHP",
    powershell: "Powershell",
    rust: "Rust",
    ruby: "Ruby",
    scss: "SCSS",
    typescript: "TypeScript",
}

module.exports = { LANGUAGES: languages, skipBuild: SKIP_BUILD }
