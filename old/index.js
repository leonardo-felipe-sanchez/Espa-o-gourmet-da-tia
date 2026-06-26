const menu = document.getElementById('menu');
const closeCircle = document.getElementById('closeCircle');
const barra = document.querySelector('.barra');

menu.addEventListener('click', () => {
    closeCircle.style.display = 'block';
    barra.style.marginRight = '0';
    menu.style.display = 'none';
});

closeCircle.addEventListener('click', () => {
    closeCircle.style.display = 'none';
    barra.style.marginRight = '-160px';
    menu.style.display = 'block';
});