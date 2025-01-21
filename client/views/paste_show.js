import { LANGUAGES } from "../languages.js";
import { getCookie, setCookie } from "../cookies.js";

const pasteShow = () => {
    const blocks = document.querySelectorAll('pre code.hljs');
    const [lineNumbers, codeBlock] = blocks;
    const lines = codeBlock.innerHTML.split("\n");

    lineNumbers.innerHTML = lines.map((_, index) => index + 1).join("\n");
    hljs.highlightBlock(codeBlock);
};

export { pasteShow };
