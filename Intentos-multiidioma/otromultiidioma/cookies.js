function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    document.getElementById("cookieBanner").style.display = "none";
}

// Ocultar el banner si el usuario ya aceptó las cookies
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cookiesAccepted") === "true") {
        document.getElementById("cookieBanner").style.display = "none";
    }
});

