document.addEventListener('DOMContentLoaded', () => {
  const defaultLang = 'es'; // idioma por defecto
  const savedLang = localStorage.getItem('lang') || defaultLang;

  loadLanguage(savedLang);

  // Asociar a cada botón
  document.querySelectorAll('button[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      localStorage.setItem('lang', selectedLang);
      loadLanguage(selectedLang);
    });
  });
});

// Carga el JSON de idioma y aplica traducciones
async function loadLanguage(lang) {
  try {
    const response = await fetch(`./assets/lang/${lang}.json`, { cache: 'no-store' });
    const translations = await response.json();
    applyTranslations(translations);
  } catch (error) {
    console.error('Error cargando traducciones:', error);
  }
}

// Aplica las traducciones a todos los elementos con data-i18n
function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.innerText = translations[key];
    }
  });

  // Actualiza también el <title> de la página si es necesario
  if (translations['page_title']) {
    document.getElementById('page-title').innerText = translations['page_title'];
    document.title = translations['page_title']; // Para la pestaña
  }
}
