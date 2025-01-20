import { LANGUAGES } from "../languages.js";
import { getCookie, setCookie } from "../cookies.js";

const pasteShow = () => {
    const blocks = document.querySelectorAll('pre code.hljs');
    const lineNumbers = blocks[0];
    const codeBlock = blocks[1];
    const lines = codeBlock.innerHTML.split("\n");
    lineNumbers.innerHTML = lines.map((_, index) => index + 1).join("\n");
    const code = document.querySelectorAll('pre code.hljs')[1];
    hljs.highlightBlock(code);
};

export { pasteShow };
