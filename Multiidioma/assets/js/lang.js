// Función para cargar el archivo de idioma y aplicar traducciones
async function loadLanguage(lang) {
  try {
    const response = await fetch(`/assets/lang/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Error cargando el idioma: ${response.statusText}`);
    }
    const translations = await response.json();
    translatePage(translations);
  } catch (error) {
    console.error('Error al cargar las traducciones:', error);
  }
}

// Función para aplicar las traducciones a los elementos con data-i18n
function translatePage(translations) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.innerText = translations[key]; // Usa innerText mejor que textContent si tienes espacios
    }
  });
}

// Función que cambia el idioma y lo guarda
function setLanguage(lang) {
  localStorage.setItem('lang', lang);   // Guarda en localStorage
  loadLanguage(lang);                  // Carga el nuevo idioma inmediatamente
}

// Cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
  // Detecta idioma guardado o usa español
  const lang = localStorage.getItem('lang') || 'es';
  loadLanguage(lang);

  // Configura los botones de idioma para que funcionen
  document.getElementById('btn-es').addEventListener('click', () => setLanguage('es'));
  document.getElementById('btn-fr').addEventListener('click', () => setLanguage('fr'));
  document.getElementById('btn-en').addEventListener('click', () => setLanguage('en'));
});
