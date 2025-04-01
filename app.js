


document.querySelector(".star-button").addEventListener("click", () => {
    alert("¡Botón de estrella presionado!");
});

document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector(".menu-icon");
    
    menuIcon.addEventListener("click", () => {
        alert("Menú desplegable en construcción.");
    });
});

// script.js

// =============================================
// === FUNCIONALIDAD PARA INDEX2.HTML (INGRESO)
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de ingreso (index2.html)
    if (document.querySelector('.container-login')) {
        initLoginPage();
    }
});

function initLoginPage() {
    const nombreInput = document.getElementById('nombre');
    const starButton = document.querySelector('.star-button');
    
    // Cargar nombre si existe en localStorage
    const savedName = localStorage.getItem('triviaNombre');
    if (savedName) {
        nombreInput.value = savedName;
    }
    
    // Manejar clic en el botón estrella
    starButton.addEventListener('click', handleStartGame);
    
    // También permitir iniciar con Enter
    nombreInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleStartGame();
        }
    });
}

function handleStartGame() {
    const nombreInput = document.getElementById('nombre');
    const nombre = nombreInput.value.trim();
    
    // Validar que se haya ingresado un nombre
    if (nombre === '') {
        alert('Por favor ingresa tu nombre para continuar');
        nombreInput.focus();
        return;
    }
    
    // Guardar el nombre en localStorage
    localStorage.setItem('triviaNombre', nombre);
    
    // Redirigir a la página de selección de categoría (index3.html)
    window.location.href = 'index3.html';
}

// =============================================
// === FUNCIONALIDAD COMÚN PARA TODAS LAS PÁGINAS
// =============================================

// Función para mostrar el nombre del jugador en páginas que lo necesiten
function displayPlayerName() {
    const playerNameElements = document.querySelectorAll('.player-name');
    const savedName = localStorage.getItem('triviaNombre');
    
    if (playerNameElements.length > 0 && savedName) {
        playerNameElements.forEach(element => {
            element.textContent = savedName;
        });
    }
}

// Llamar a funciones comunes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    displayPlayerName();
});
