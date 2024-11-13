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

document.addEventListener("DOMContentLoaded", function () {
    const contentContainer = document.querySelector(".carousel-content-products .content");
    const boxes = Array.from(contentContainer.children);
    const boxWidth = boxes[0].offsetWidth + 20; // ajusta 20 si tienes margen entre cajas
    let position = 0;

    // Clonar el primer y último elemento para crear el efecto infinito
    const firstClone = boxes[0].cloneNode(true);
    const lastClone = boxes[boxes.length - 1].cloneNode(true);
    contentContainer.appendChild(firstClone);
    contentContainer.insertBefore(lastClone, boxes[0]);

    // Ajusta la posición inicial para tener el clon en el lugar correcto
    position = -boxWidth;
    contentContainer.style.transform = `translateX(${position}px)`;

    // Configuración de botones de desplazamiento
    document.querySelector(".previous").addEventListener("click", () => moveCarousel(-1));
    document.querySelector(".next").addEventListener("click", () => moveCarousel(1));

    function moveCarousel(direction) {
        position += direction * boxWidth;
        contentContainer.style.transition = "transform 0.5s ease-in-out";
        contentContainer.style.transform = `translateX(${position}px)`;

        // Reiniciar el carrusel al llegar al final/inicio
        contentContainer.addEventListener("transitionend", () => {
            if (direction === 1 && position <= -boxWidth * boxes.length) {
                position = -boxWidth;
                contentContainer.style.transition = "none";
                contentContainer.style.transform = `translateX(${position}px)`;
            }
            if (direction === -1 && position >= 0) {
                position = -boxWidth * (boxes.length - 1);
                contentContainer.style.transition = "none";
                contentContainer.style.transform = `translateX(${position}px)`;
            }
        });
    }
});

/**------------------------------------------------ */
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser && storedUser.password === password) {
        document.getElementById('message').textContent = "Inicio de sesión exitoso!";
        document.getElementById('message').style.color = "#28a745";
        window.location.href = "index.html";
        // Aquí puedes redirigir al usuario o mostrar más contenido.
    } else {
        document.getElementById('message').textContent = "Usuario o contraseña incorrectos.";
        document.getElementById('message').style.color = "#d9534f";
    }
}

// Función de registro
function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem(username)) {
        document.getElementById('message').textContent = "El usuario ya existe.";
        document.getElementById('message').style.color = "#d9534f";
    } else {
        localStorage.setItem(username, JSON.stringify({ password: password }));
        document.getElementById('message').textContent = "Registro exitoso! Puedes iniciar sesión.";
        document.getElementById('message').style.color = "#28a745";
    }
}

const btnLogin = document.querySelector('.login');
const btnsig = document.querySelector('.sig');


btnLogin.addEventListener("click", function () {
    window.location.href = "login.html";
})

btnsig.addEventListener("click", function () {
    window.location.href = "login.html";
})

/**------------------------------------------------------------- */

const recipes = [
    { name: 'Pollo Asado', description: 'Receta fácil de pollo asado con especias.' },
    { name: 'Ensalada César', description: 'Deliciosa ensalada con pollo, lechuga y aderezo.' },
    { name: 'Tacos al Pastor', description: 'Tacos de cerdo al pastor con piña.' },
    { name: 'Spaghetti a la Boloñesa', description: 'Pasta con salsa boloñesa casera.' },
    { name: 'Tarta de Manzana', description: 'Dulce tarta de manzana con canela.' },
];

// Función de búsqueda
function searchRecipes() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');

    // Filtrar recetarios que coincidan con la búsqueda
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query)
    );

    // Limpiar los resultados anteriores
    resultsContainer.innerHTML = '';

    if (filteredRecipes.length > 0) {
        // Mostrar resultados
        filteredRecipes.forEach(recipe => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
          <h3>${recipe.name}</h3>
          <p>${recipe.description}</p>
        `;
            resultsContainer.appendChild(resultItem);
        });
        resultsContainer.style.display = 'flex';
    } else {
        resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        resultsContainer.style.display = 'block';
    }
}