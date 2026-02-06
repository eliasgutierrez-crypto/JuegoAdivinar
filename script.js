let numeroSecreto;
let intentosDisponibles;
let listaIntentos;
let juegoTerminado = false;

const inputNumero = document.getElementById("numeroUsuario");
const botonIntentar = document.getElementById("btnIntentar");
const mensaje = document.getElementById("mensaje");
const historial = document.getElementById("historial");
const intentosRestantes = document.getElementById("intentosRestantes");

function iniciarJuego() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  intentosDisponibles = 10;
  listaIntentos = [];
  juegoTerminado = false;

  mensaje.textContent = "";
  historial.textContent = "";
  intentosRestantes.textContent = "Intentos restantes: " + intentosDisponibles;

  inputNumero.disabled = false;
  botonIntentar.disabled = false;
  inputNumero.value = "";
  inputNumero.focus();
}

function evaluarIntento() {
  if (juegoTerminado) return;

  const numeroIngresado = Number(inputNumero.value);

  if (isNaN(numeroIngresado) || numeroIngresado < 1 || numeroIngresado > 100) {
    mensaje.textContent = "Ingresa un número válido entre 1 y 100.";
    return;
  }

  listaIntentos.push(numeroIngresado);
  intentosDisponibles--;

  historial.textContent = "Números usados: " + listaIntentos.join(", ");
  intentosRestantes.textContent = "Intentos restantes: " + intentosDisponibles;

  if (numeroIngresado === numeroSecreto) {
    mensaje.textContent = "¡Correcto! Adivinaste el número.";
    finalizarJuego();
  } else if (intentosDisponibles === 0) {
    mensaje.textContent = "Se terminaron los intentos. El número era " + numeroSecreto + ".";
    finalizarJuego();
  } else if (numeroIngresado < numeroSecreto) {
    mensaje.textContent = "El número secreto es mayor.";
  } else {
    mensaje.textContent = "El número secreto es menor.";
  }

  inputNumero.value = "";
  inputNumero.focus();
}

function finalizarJuego() {
  juegoTerminado = true;
  inputNumero.disabled = true;
  botonIntentar.disabled = true;

  const botonReiniciar = document.createElement("button");
  botonReiniciar.textContent = "Jugar otra vez";
  botonReiniciar.id = "btnReiniciar";
  document.querySelector(".contenedor").appendChild(botonReiniciar);

  botonReiniciar.addEventListener("click", function () {
    botonReiniciar.remove();
    iniciarJuego();
  });
}

botonIntentar.addEventListener("click", evaluarIntento);

iniciarJuego();
