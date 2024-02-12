let isBoxInMiddle = true;

document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.day-button');
  buttons.forEach(button => {
    const day = button.textContent.trim();
    const color = getColorForDay(day);
    button.style.backgroundColor = color;
    button.style.color = getTextColorForDay(color);
  });
});

function animateBox(button, day) {
  const box = document.getElementById('animated-box');

  if (isBoxInMiddle) {
    const color = getColorForDay(day);
    box.style.backgroundColor = color;
    box.style.borderColor = color;

    button.style.color = getTextColorForDay(color);

    box.classList.add('transitional');

    box.style.top = '50%';
    isBoxInMiddle = false;

    box.addEventListener('transitionend', function transitionEndHandler() {
      box.removeEventListener('transitionend', transitionEndHandler);

      box.style.border = `5px solid ${color}`;

      box.classList.remove('transitional');

      box.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => {
        box.style.border = '5px solid transparent';
        box.style.animation = '';
        isBoxInMiddle = true;
      }, 500); 
    });
  }
}

function getColorForDay(day) {
  switch (day) {
    case 'Monday':
      return 'violet';
    case 'Tuesday':
      return 'blue';
    case 'Wednesday':
      return 'red';
    case 'Thursday':
      return 'green';
    case 'Friday':
      return 'yellow';
    case 'Saturday':
      return 'orange';
    case 'Sunday':
      return 'pink';
    default:
      return '#3498db'; 
  }
}

function getTextColorForDay(color) {
  const luminance = calculateLuminance(color);
  return luminance > 0.5 ? 'black' : 'white';
}

function calculateLuminance(hex) {
  const rgb = hexToRgb(hex);
  return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}
