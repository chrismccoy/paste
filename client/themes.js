const POPULAR = [
    { name: "Shades of Purple", file: "shades-of-purple.css", dark: true },
]

const THEMES = [
    {name: "shades-of-purple.css", file: "shades-of-purple.css" }
]

THEMES.default = "shades-of-purple.css"
POPULAR.default = "shades-of-purple.css"
// exports.THEMES = POPULAR.concat(THEMES)
exports.THEMES = POPULAR

