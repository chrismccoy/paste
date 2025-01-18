const POPULAR = [
    { name: "Dark", file: "dracula.css", dark: true },
    { name: "Nord", file: "nord.css", dark: true },
    { name: "Shades of Purple", file: "shades-of-purple.css", dark: true },
]

const THEMES = [
    {name: "dracula.css", file: "dracula.css" },
    {name: "nord.css", file: "nord.css" },
    {name: "shades-of-purple.css", file: "shades-of-purple.css" }
]

THEMES.default = "shades-of-purple.css"
POPULAR.default = "shades-of-purple.css"
// exports.THEMES = POPULAR.concat(THEMES)
exports.THEMES = POPULAR

