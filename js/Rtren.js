"use strict";
// Variables globales
let EntradaUsuario;
const asientos = [];
const usuarios = ["josue", "1234"];
// Contenedor de inicio de sesión
const inicio = document.getElementById("inicio");
const login = document.getElementById("login");
const botonSalir = document.getElementById("salir");
// Contenedor de vagones
const vagonesMaggels = document.getElementById("vagones");
const vagonesMagos = document.getElementById("vagonVIP");
window.onload = function () {
    EntradaUsuario = JSON.parse(localStorage.getItem("EntradaUsuario") || "false");
    if (EntradaUsuario) {
        inicio.style.display = "none";
        vagonesMaggels.style.display = "flex";
        botonSalir.style.display = "block";
    }
    else {
        inicio.style.display = "flex";
        vagonesMaggels.style.display = "none";
        botonSalir.style.display = "none";
    }
};
function validarUsuario() {
    let user = document.getElementById("usuario");
    const password = document.getElementById("password");
    const userValue = user.value;
    const passwordValue = password.value;
    if (usuarios[0] === userValue && usuarios[1] === passwordValue) {
        alert("Bienvenido");
        localStorage.setItem("EntradaUsuario", "true");
        inicio.style.display = "none";
        vagonesMaggels.style.display = "flex";
    }
    else {
        alert("Usuario o contraseña incorrectos");
    }
}
function cerrarSesion() {
    localStorage.removeItem("EntradaUsuario");
    inicio.style.display = "flex";
    vagonesMaggels.style.display = "none";
}
function reservarAsiento(fila, asiento) {
    if (asientos[fila][asiento] === "green") {
        asientos[fila][asiento] = "red";
        localStorage.setItem("asientos", asientos.join(";"));
        dibujarAsientos();
    }
}
function dibujarAsientos() {
    let html = "";
    for (let i = 0; i < 25; i++) {
        html += `<div class="fila">`;
        for (let j = 0; j < 6; j++) {
            html += `<div class="asiento ${asientos[i][j]}" onclick="reservarAsiento(${i},${j})"></div>`;
        }
        html += `</div>`;
    }
    vagonesMagos.innerHTML = html;
}
// 
