import { THEMES } from "../themes.js";
import { LANGUAGES } from "../languages.js";
import { getCookie, setCookie } from "../cookies.js";

const themeChosen = getCookie("theme") || THEMES.default;

function renderLineNumbers() {
    const blocks = document.querySelectorAll('pre code.hljs');
    const lineNumbers = blocks[0];
    const rawCode = blocks[1].innerHTML;
    const lines = rawCode.split("\n");
    lineNumbers.innerHTML = lines.map((_, index) => index + 1).join("\n");
}

function fixupUI(theme) {
    const themeData = THEMES.find(t => t.file === theme);
    document.body.classList.toggle("dark", themeData.dark);
    document.body.classList.toggle("light", !themeData.dark);
}

const pasteShow = () => {
    const themesEl = document.getElementById("themes");
    themesEl.innerHTML = ""; // Clear existing options

    THEMES.forEach(theme => {
        const option = document.createElement("option");
        option.value = theme.file;
        option.innerHTML = theme.name;
        option.selected = themeChosen === theme.file;
        themesEl.appendChild(option);
    });

    fixupUI(themesEl.value);
    renderLineNumbers();

    const codeBlock = document.querySelectorAll('pre code.hljs')[1];
    hljs.highlightBlock(codeBlock);

    themesEl.addEventListener("change", (event) => {
        const themeLink = document.getElementById("hljsTheme");
        if (event.target.value) {
            themeLink.href = `/css/v/${event.target.value}`;
            fixupUI(event.target.value);
            setCookie("theme", event.target.value, { expires: Infinity });
        }
    });
};

export { pasteShow };
