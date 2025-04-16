let currentStep = 1;
const totalSteps = 7;

// Función para mostrar la etapa correspondiente
function navigateToStep(step) {
  document.querySelectorAll('.step').forEach((el) => {
    el.classList.remove('active');
  });

  document.getElementById(`step${step}`).classList.add('active');
  updateNavBar(step);
}

// Actualizar la barra de navegación
function updateNavBar(step) {
  const navItems = document.querySelectorAll('.step-nav');
  navItems.forEach((item, index) => {
    if (index === step - 1) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Iniciar en la primera etapa
navigateToStep(currentStep);

//codigo para copiar el codigo 
function copyCode() {
    const codeElement = document.getElementById('arduino-code');
    const html = codeElement.innerHTML;
  
    // Decodifica entidades HTML (&lt; → <, &gt; → >)
    const temp = document.createElement('textarea');
    temp.innerHTML = html;
    const decodedText = temp.value;
  
    navigator.clipboard.writeText(decodedText).then(() => {
      const button = document.querySelector('.copy-button');
      const originalText = button.textContent;
      button.textContent = '✅ Copié !';
      setTimeout(() => button.textContent = originalText, 2000);
    }).catch(err => {
      alert('❌ Erreur lors de la copie.');
      console.error(err);
    });
  }
  