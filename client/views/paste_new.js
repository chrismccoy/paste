import { getCookie, setCookie } from "../cookies.js";

const pasteNew = () => {
    const editor = document.getElementById("editor");
    const languageSelector = document.getElementById("language");
    
    editor.focus();

    const lang = getCookie("language") || "plaintext";
    languageSelector.value = lang;

    languageSelector.addEventListener("change", (event) => {
        setCookie("language", event.target.value, { expires: Infinity });
    });
};

export { pasteNew };
