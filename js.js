const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Duplicar las imágenes al inicio para lograr un efecto de carrusel continuo
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slidesContainer.appendChild(clone);
});

let index = 0;

function startSlider() {
    setInterval(() => {
        index++;
        if (index === totalSlides) {
            slidesContainer.style.transition = 'none'; // Desactivamos la transición temporalmente
            index = 0; // Reiniciamos el índice
            slidesContainer.style.transform = `translateX(0)`; // Regresamos al inicio
            setTimeout(() => {
                slidesContainer.style.transition = 'transform 0.5s ease'; // Reaplicamos la transición
            }, 50);
        } else {
            slidesContainer.style.transform = `translateX(-${index * (100 / 3)}%)`; // Desplazamos el contenedor
        }
    }, 3000); // Tiempo en milisegundos entre cada cambio
}

// Iniciar el carrusel
startSlider();

/* ---------------------------------------------> */
// Seleccionamos los elementos
const content = document.querySelector('.carousel-content-products .content');
const prevButton = document.querySelector('.carousel-content-products .previous');
const nextButton = document.querySelector('.carousel-content-products .next');

// Definimos la cantidad de desplazamiento
const scrollAmount = 200; // Ajusta este valor según el tamaño de cada item

// Evento para desplazarse a la izquierda
prevButton.addEventListener('click', () => {
    content.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

// Evento para desplazarse a la derecha
nextButton.addEventListener('click', () => {
    content.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});


