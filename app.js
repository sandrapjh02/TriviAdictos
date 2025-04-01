// app.js
document.querySelector(".star-button").addEventListener("click", () => {
    let nombre = document.getElementById("nombre").value.trim();

    if (nombre !== "") {
        localStorage.setItem("usuario", nombre); // Guarda el nombre
        window.location.href = "Index3.html"; // Redirige a la selección de temas
    } else {
        alert("Por favor, ingresa tu nombre.");
    }
});

// Mostrar el nombre en Index3.html
document.addEventListener("DOMContentLoaded", () => {
    let usuario = localStorage.getItem("usuario");
    if (usuario) {
        let titulo = document.querySelector(".titulo-tema-favorito");
        if (titulo) {
            titulo.innerHTML = `¡Escoge tu tema favorito, ${usuario}!`;
        }
    }
});

