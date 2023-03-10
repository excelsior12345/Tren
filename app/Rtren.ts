// Variables globales
let EntradaUsuario: boolean;
const asientos: string[][] = [];
const usuarios: string[] = ["josue", "1234"];

// Contenedor de inicio de sesión
const inicio: any = document.getElementById("inicio");
const login: any = document.getElementById("login");
const botonSalir: any = document.getElementById("salir");

// Contenedor de vagones
const vagonesMaggels: any = document.getElementById("vagones");
const vagonesMagos: any = document.getElementById("vagonVIP");

window.onload = function () {
  EntradaUsuario = JSON.parse(localStorage.getItem("EntradaUsuario") || "false");

  if (EntradaUsuario) {
    inicio.style.display = "none";
    vagonesMaggels.style.display = "flex";
    botonSalir.style.display = "block";
  } else {
    inicio.style.display = "flex";
    vagonesMaggels.style.display = "none";
    botonSalir.style.display = "none";
  }
};

function validarUsuario() {
  let user: any = document.getElementById("usuario");
  const password: any = document.getElementById("password");
  const userValue: string = user.value;
  const passwordValue: string = password.value;

  if (usuarios[0] === userValue && usuarios[1] === passwordValue) {
    alert("Bienvenido");
    localStorage.setItem("EntradaUsuario", "true");
    inicio.style.display = "none";
    vagonesMaggels.style.display = "flex";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function cerrarSesion() {
  localStorage.removeItem("EntradaUsuario");
  inicio.style.display = "flex";
  vagonesMaggels.style.display = "none";
}


function reservarAsiento(fila: number, asiento: number) {
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


