import { getCookie, setCookie } from "../cookies.js";

const pasteNew = () => {
    const editor = document.getElementById("editor");
    editor.focus();

    const lang = getCookie("language") || "plaintext";
    const pickLanguage = document.getElementById("language");
    pickLanguage.value = lang;

    pickLanguage.addEventListener("change", ({ target }) => {
        setCookie("language", target.value, { until: Infinity });
    });
};

export { pasteNew };
