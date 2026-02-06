let numeroSecreto;
let intentosRestantes;
let numerosIngresados;
let juegoFinalizado = false;

const input = document.getElementById("numeroUsuario");
const boton = document.getElementById("btnIntentar");
const mensaje = document.getElementById("mensaje");
const historial = document.getElementById("historial");
const restantes = document.getElementById("intentosRestantes");

function iniciarJuego() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  intentosRestantes = 10;
  numerosIngresados = [];
  juegoFinalizado = false;

  mensaje.textContent = "";
  historial.textContent = "";
  restantes.textContent = "Intentos restantes: " + intentosRestantes;

  input.disabled = false;
  boton.disabled = false;
  input.value = "";
  input.focus();
}

function verificarNumero() {
  if (juegoFinalizado) return;

  const numero = Number(input.value);

  if (isNaN(numero) || numero < 1 || numero > 100) {
    mensaje.textContent = "Ingresa un número válido entre 1 y 100.";
    return;
  }

  numerosIngresados.push(numero);
  intentosRestantes--;

  historial.textContent = "Números probados: " + numerosIngresados.join(", ");
  restantes.textContent = "Intentos restantes: " + intentosRestantes;

  if (numero === numeroSecreto) {
    mensaje.textContent = "¡Correcto! Adivinaste el número 🎉";
    finalizarJuego();
  } else if (intentosRestantes === 0) {
    mensaje.textContent = "Se acabaron los intentos. El número era " + numeroSecreto + ".";
    finalizarJuego();
  } else if (numero < numeroSecreto) {
    mensaje.textContent = "El número es mayor.";
  } else {
    mensaje.textContent = "El número es menor.";
  }

  input.value = "";
  input.focus();
}

function finalizarJuego() {
  juegoFinalizado = true;
  input.disabled = true;
  boton.disabled = true;

  const botonReiniciar = document.createElement("button");
  botonReiniciar.textContent = "Jugar de nuevo";
  botonReiniciar.style.marginTop = "15px";

  document.querySelector(".card").appendChild(botonReiniciar);

  botonReiniciar.addEventListener("click", function () {
    botonReiniciar.remove();
    iniciarJuego();
  });
}

boton.addEventListener("click", verificarNumero);

iniciarJuego();
