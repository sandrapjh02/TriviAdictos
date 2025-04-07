// Objeto global del juego
const juego = {
    jugador: {
        nombre: "",
        puntaje: 0,
        categoria: ""
    },
    preguntas: {
        Historia: [
            {
                pregunta: "¿Quién descubrió América en 1492?",
                opciones: ["Cristóbal Colón", "Vasco da Gama", "Fernando de Magallanes", "Hernán Cortés"],
                respuesta: 0
            },
            {
                pregunta: "¿En qué año comenzó la Segunda Guerra Mundial?",
                opciones: ["1939", "1914", "1945", "1923"],
                respuesta: 0
            },
            {
                pregunta: "¿Qué civilización construyó las pirámides de Giza?",
                opciones: ["Griegos", "Romanos", "Egipcios", "Mayas"],
                respuesta: 2
            }
        ],
        Geografia: [
            {
                pregunta: "¿Cuál es el río más largo del mundo?",
                opciones: ["Amazonas", "Nilo", "Misisipi", "Yangtsé"],
                respuesta: 0
            },
            {
                pregunta: "¿Cuál es el país más grande del mundo por área?",
                opciones: ["China", "Estados Unidos", "Rusia", "Canadá"],
                respuesta: 2
            },
            {
                pregunta: "¿Qué montaña es la más alta del mundo?",
                opciones: ["K2", "Everest", "Kilimanjaro", "Aconcagua"],
                respuesta: 1
            }
        ],
        Entretenimiento: [
            {
                pregunta: "¿Qué actor interpretó a Iron Man en el MCU?",
                opciones: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué serie tiene el récord de más premios Emmy?",
                opciones: ["Game of Thrones", "Friends", "Breaking Bad", "The Crown"],
                respuesta: 0
            },
            {
                pregunta: "¿Qué película ganó el primer Oscar a Mejor Película?",
                opciones: ["Lo que el viento se llevó", "Cantando bajo la lluvia", "Alas", "Casablanca"],
                respuesta: 2
            }
        ]
    },
    preguntaActual: 0,
    respuestasCorrectas: 0
};

// ================= INDEX2.HTML =================
if (document.querySelector('.container-login')) {
    document.querySelector(".star-button").addEventListener("click", () => {
        const nombre = document.getElementById("nombre").value.trim();
        
        if (nombre) {
            juego.jugador.nombre = nombre;
            localStorage.setItem('triviaData', JSON.stringify(juego));
            window.location.href = "Index3.html";
        } else {
            alert("Por favor, ingresa tu nombre.");
        }
    });
}

// ================= INDEX3.HTML =================
if (document.querySelector('.categories')) {
    // Cargar datos guardados
    const savedData = localStorage.getItem('triviaData');
    if (savedData) {
        const data = JSON.parse(savedData);
        juego.jugador.nombre = data.jugador.nombre;
        
        // Mostrar nombre en el título
        const titulo = document.querySelector('.titulo-tema-favorito');
        if (titulo) {
            titulo.textContent = `¡Escoge tu tema favorito, ${juego.jugador.nombre}!`;
        }
    }

    // Botón de inicio
    document.querySelector('.boton-inicio-index3').addEventListener('click', () => {
        window.location.href = "Index.html";
    });

    // Botones de categoría (ÚNICO CAMBIO REALIZADO)
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Convertimos a minúsculas y eliminamos tildes
            const nombreArchivo = btn.textContent.toLowerCase()
                                      .normalize("NFD")
                                      .replace(/[\u0300-\u036f]/g, "");
            
            juego.jugador.categoria = btn.textContent; // Guardamos el nombre original con tilde
            juego.preguntaActual = 0;
            juego.respuestasCorrectas = 0;
            localStorage.setItem('triviaData', JSON.stringify(juego));
            window.location.href = `${nombreArchivo}.html`;
        });
    });
}

// ================= PÁGINAS DE PREGUNTAS =================
if (document.querySelector('.contenedor-pregunta')) {
    // Cargar datos
    const savedData = localStorage.getItem('triviaData');
    if (savedData) {
        const data = JSON.parse(savedData);
        juego.jugador = data.jugador;
        juego.preguntaActual = data.preguntaActual || 0;
        juego.respuestasCorrectas = data.respuestasCorrectas || 0;
    }
    
    const categoria = document.title.split('.')[0];
    const preguntas = juego.preguntas[categoria];
    
    // Elementos UI
    const textoPregunta = document.getElementById('texto-pregunta');
    const opciones = document.querySelectorAll('.opcion');
    const feedback = document.getElementById('mensaje-feedback');
    const siguienteBtn = document.getElementById('siguiente-btn');
    const puntajeDisplay = document.querySelector('.puntaje');
    
    // Mostrar pregunta
    function mostrarPregunta() {
        if (juego.preguntaActual >= preguntas.length) {
            finalizarQuiz();
            return;
        }
        
        const pregunta = preguntas[juego.preguntaActual];
        textoPregunta.textContent = pregunta.pregunta;
        
        opciones.forEach((opcion, index) => {
            opcion.textContent = pregunta.opciones[index];
            opcion.classList.remove('correcta', 'incorrecta');
            opcion.disabled = false;
        });
        
        feedback.textContent = '';
        siguienteBtn.disabled = true;
        puntajeDisplay.textContent = `⭐ ${juego.respuestasCorrectas}`;
    }
    
    // Manejar respuesta
    opciones.forEach((opcion, index) => {
        opcion.addEventListener('click', () => {
            const respuestaCorrecta = preguntas[juego.preguntaActual].respuesta;
            
            if (index === respuestaCorrecta) {
                opcion.classList.add('correcta');
                juego.respuestasCorrectas++;
                feedback.textContent = '¡Correcto!';
                feedback.style.color = '#4CAF50';
            } else {
                opcion.classList.add('incorrecta');
                opciones[respuestaCorrecta].classList.add('correcta');
                feedback.textContent = 'Incorrecto';
                feedback.style.color = '#F44336';
            }
            
            opciones.forEach(btn => btn.disabled = true);
            siguienteBtn.disabled = false;
            puntajeDisplay.textContent = `⭐ ${juego.respuestasCorrectas}`;
        });
    });
    
    // Siguiente pregunta
    siguienteBtn.addEventListener('click', () => {
        juego.preguntaActual++;
        localStorage.setItem('triviaData', JSON.stringify(juego));
        
        if (juego.preguntaActual < preguntas.length) {
            mostrarPregunta();
        } else {
            finalizarQuiz();
        }
    });
    
    // Botón Salir
    document.querySelector('.btn-salir').addEventListener('click', () => {
        window.location.href = "Index3.html";
    });
    
    function finalizarQuiz() {
        localStorage.setItem('triviaData', JSON.stringify(juego));
        window.location.href = "puntaje.html";
    }
    
    // Iniciar primera pregunta
    mostrarPregunta();
}

// ================= PUNTAJE.HTML =================
if (document.querySelector('body').classList.contains('pagina-azul')) {
    const savedData = localStorage.getItem('triviaData');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        document.getElementById('nombre-jugador').textContent = `Jugador: ${data.jugador.nombre}`;
        document.getElementById('puntaje-total').textContent = `⭐ Puntaje: ${data.respuestasCorrectas}/3`;
        
        document.querySelector('.btn-jugar-otra').addEventListener('click', () => {
            window.location.href = "Index3.html";
        });
    } else {
        window.location.href = "Index1.html";
    }
}

// Dentro del if (document.querySelector('body').classList.contains('pagina-azul'))
document.querySelector('.boton-inicio-header').addEventListener('click', () => {
    window.location.href = "index1.html";
});