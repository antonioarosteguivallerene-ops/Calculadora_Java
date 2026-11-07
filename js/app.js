/* ============================================================
   App Calculadora básica en JavaScript
   Curso: JavaScript - Introducción a la programación (Sección 6)
   ============================================================ */

// ---------- Lección 36: seleccionando los elementos del DOM ----------
const pantalla = document.querySelector('#pantalla');
const historial = document.querySelector('#historial');
const numeros = document.querySelectorAll('.numero');
const operadores = document.querySelectorAll('.operador');
const igual = document.querySelector('#igual');
const limpiar = document.querySelector('#limpiar');
const borrar = document.querySelector('#borrar');
const punto = document.querySelector('#punto');

// ---------- Estado de la calculadora ----------
let valorActual = '0';        // texto que se ve en pantalla
let valorAnterior = null;     // primer operando (número)
let operadorActual = null;    // '+', '-', '*' o '/'
let reiniciarPantalla = false; // true cuando el próximo dígito empieza un número nuevo
let hayError = false;

const SIMBOLOS = { '+': '+', '-': '−', '*': '×', '/': '÷' };
const MAX_DIGITOS = 12;

// ---------- Lección 38: programar las funciones ----------

function actualizarPantalla() {
  pantalla.textContent = valorActual;
}

function agregarNumero(digito) {
  if (hayError) limpiarTodo();

  if (reiniciarPantalla) {
    valorActual = '0';
    reiniciarPantalla = false;
  }

  // Limita la cantidad de dígitos para que no se salga del visor
  if (valorActual.replace(/[-.]/g, '').length >= MAX_DIGITOS) return;

  valorActual = valorActual === '0' ? digito : valorActual + digito;
  actualizarPantalla();
}

function agregarPunto() {
  if (hayError) limpiarTodo();

  if (reiniciarPantalla) {
    valorActual = '0';
    reiniciarPantalla = false;
  }

  if (!valorActual.includes('.')) {
    valorActual += '.';
    actualizarPantalla();
  }
}

// Función que realiza el cálculo según el operador (switch, lección 16)
function calcular(a, b, operador) {
  switch (operador) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? null : a / b; // null indica división entre cero
    default:  return b;
  }
}

// Evita resultados como 0.30000000000000004 y recorta decimales largos
function formatearResultado(numero) {
  const redondeado = parseFloat(numero.toFixed(10));
  let texto = String(redondeado);

  // Si el número es demasiado grande, se muestra en notación científica
  if (texto.replace(/[-.]/g, '').length > MAX_DIGITOS) {
    texto = redondeado.toExponential(6);
  }
  return texto;
}

function mostrarError(mensaje) {
  hayError = true;
  valorActual = mensaje;
  valorAnterior = null;
  operadorActual = null;
  reiniciarPantalla = true;
  historial.textContent = '';
  actualizarPantalla();
}

function elegirOperador(operador) {
  if (hayError) return;

  // Si ya había una operación pendiente, se resuelve antes (ej.: 2 + 3 + ...)
  if (operadorActual !== null && !reiniciarPantalla) {
    resolver(true);
    if (hayError) return;
  }

  valorAnterior = parseFloat(valorActual);
  operadorActual = operador;
  reiniciarPantalla = true;
  historial.textContent = formatearResultado(valorAnterior) + ' ' + SIMBOLOS[operador];
}

function resolver(encadenado) {
  if (hayError || operadorActual === null) return;

  const b = parseFloat(valorActual);
  const resultado = calcular(valorAnterior, b, operadorActual);

  if (resultado === null) {
    mostrarError('No se puede dividir entre 0');
    return;
  }

  if (!encadenado) {
    historial.textContent =
      formatearResultado(valorAnterior) + ' ' + SIMBOLOS[operadorActual] + ' ' +
      formatearResultado(b) + ' =';
  }

  valorActual = formatearResultado(resultado);
  valorAnterior = null;
  operadorActual = null;
  reiniciarPantalla = true;
  actualizarPantalla();
}

function limpiarTodo() {
  valorActual = '0';
  valorAnterior = null;
  operadorActual = null;
  reiniciarPantalla = false;
  hayError = false;
  historial.textContent = '';
  actualizarPantalla();
}

function borrarUltimo() {
  if (hayError) { limpiarTodo(); return; }
  if (reiniciarPantalla) return; // no se borra un resultado ya calculado

  valorActual = valorActual.length > 1 ? valorActual.slice(0, -1) : '0';
  if (valorActual === '-') valorActual = '0';
  actualizarPantalla();
}

// ---------- Lección 37: agregar los eventos con JavaScript ----------

numeros.forEach(function (boton) {
  boton.addEventListener('click', function () {
    agregarNumero(boton.textContent);
  });
});

operadores.forEach(function (boton) {
  boton.addEventListener('click', function () {
    elegirOperador(boton.dataset.operador);
  });
});

igual.addEventListener('click', function () { resolver(false); });
limpiar.addEventListener('click', limpiarTodo);
borrar.addEventListener('click', borrarUltimo);
punto.addEventListener('click', agregarPunto);

// Extra: soporte para el teclado
document.addEventListener('keydown', function (evento) {
  const tecla = evento.key;

  if (tecla >= '0' && tecla <= '9') {
    agregarNumero(tecla);
  } else if (tecla === '.' || tecla === ',') {
    agregarPunto();
  } else if (['+', '-', '*', '/'].includes(tecla)) {
    evento.preventDefault();
    elegirOperador(tecla);
  } else if (tecla === 'Enter' || tecla === '=') {
    evento.preventDefault();
    resolver(false);
  } else if (tecla === 'Backspace') {
    borrarUltimo();
  } else if (tecla === 'Escape' || tecla === 'Delete') {
    limpiarTodo();
  }
});

actualizarPantalla();
