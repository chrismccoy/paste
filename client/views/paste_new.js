import { getCookie, setCookie } from "../cookies.js";

const pasteNew = () => {
    const editor = document.getElementById("editor");
    editor.focus();

    const lang = getCookie("language") || "plaintext";
    const pickLanguage = document.getElementById("language");
    pickLanguage.value = lang;

    const updateLanguageCookie = (event) => {
        setCookie("language", event.target.value, { until: Infinity });
    };

    pickLanguage.addEventListener("change", updateLanguageCookie);
};

export { pasteNew };
