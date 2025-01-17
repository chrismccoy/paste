import { THEMES } from "../themes.js";
import { LANGUAGES } from "../languages.js";
import { getCookie, setCookie } from "../cookies.js";

const themeChosen = THEMES.default;

function renderLineNumbers() {
    const blocks = document.querySelectorAll('pre code.hljs');
    const lineNumbers = blocks[0];
    const codeBlock = blocks[1];
    const lines = codeBlock.innerHTML.split("\n");
    lineNumbers.innerHTML = lines.map((_, index) => index + 1).join("\n");
}

function fixupUI(theme) {
    const themeData = THEMES.find(t => t.file === theme);
    document.body.classList.toggle("dark", themeData.dark);
    document.body.classList.toggle("light", !themeData.dark);
}

const pasteShow = () => {
    const theme = 'shades-of-purple.css';
    fixupUI(theme);
    renderLineNumbers();

    const code = document.querySelectorAll('pre code.hljs')[1];
    hljs.highlightBlock(code);
    // Uncomment the following lines if you want to display the language
    // const lang = document.getElementById("language");
    // lang.innerHTML = LANGUAGES[code.result.language] || code.result.language;
};

export { pasteShow };
