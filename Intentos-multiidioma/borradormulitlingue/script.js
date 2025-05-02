document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("language") || "es";
    const currentPage = document.body.getAttribute("data-page");
    changeLanguage(savedLang, currentPage);

    document.querySelectorAll("button[data-lang]").forEach(button => {
        button.addEventListener("click", () => {
            changeLanguage(button.getAttribute("data-lang"));
        });
    });
});

function changeLanguage(lang) {
    console.log("Cambiando idioma a:", lang);
    localStorage.setItem("language", lang);

    fetch(`languages/${lang}.json`)
        .then(response => {
            if (!response.ok) throw new Error("Archivo no encontrado");
            return response.json();
        })
        .then(data => {
            const page = document.body.getAttribute("data-page");
            if (data[page]) {
                for (const key in data[page]) {
                    document.getElementById(key)?.textContent = data[page][key];
                }
            }

            for (const key in data.nav) {
                document.getElementById(key)?.textContent = data.nav[key];
            }

            document.getElementById("cookieText")?.textContent = data.cookies.text;
            document.getElementById("cookieButton")?.textContent = data.cookies.button;
        })
        .catch(error => console.error("Error cargando idioma:", error));
}
