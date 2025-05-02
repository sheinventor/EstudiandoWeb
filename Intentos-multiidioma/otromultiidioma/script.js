document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("language") || "fr"; 
    const currentPage = document.body.getAttribute("data-page"); // Detecta la página actual
    changeLanguage(savedLang, currentPage);
});


function changeLanguage(lang) {
    console.log("Cambiando idioma a:", lang); // Verificar si la función se ejecuta
    localStorage.setItem("language", lang); 

    fetch(`languages/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            console.log("Archivo de idioma cargado:", data);
            const page = document.body.getAttribute("data-page");
            if (data[page]) {
                Object.keys(data[page]).forEach(key => {
                    document.getElementById(key)?.textContent = data[page][key];
                });
            }

            Object.keys(data.nav).forEach(key => {
                document.getElementById(key)?.textContent = data.nav[key];
            });

            document.getElementById("cookieText")?.textContent = data.cookies.text;
            document.getElementById("cookieButton")?.textContent = data.cookies.button;
        })
        .catch(error => console.error("Error cargando idioma:", error));
}

document.querySelectorAll("button[data-lang]").forEach(button => {
    button.addEventListener("click", () => {
        changeLanguage(button.getAttribute("data-lang"));
    });
});