function showModule(id, clicked) {
    const sections = document.querySelectorAll('.module');
    sections.forEach(section => section.style.display = 'none');
  
    document.getElementById(id).style.display = 'block';
  
    const items = document.querySelectorAll('.sidebar li');
    items.forEach(item => item.classList.remove('current'));
    clicked.classList.add('current');
  }
  
  window.onload = function () {
    showModule('modulo1', document.querySelector('.sidebar li.current'));
  }
  