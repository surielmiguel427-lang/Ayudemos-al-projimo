document.addEventListener("DOMContentLoaded", function(){

/* =======================
   SISTEMA DE USUARIOS
======================= */

const registroForm = document.getElementById("registroForm");
const loginForm = document.getElementById("loginForm");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

if(registroForm){

registroForm.addEventListener("submit", function(e){

e.preventDefault();

const nombre = document.getElementById("registroNombre").value;
const correo = document.getElementById("registroCorreo").value;
const password = document.getElementById("registroPassword").value;

const usuario = {
nombre,
correo,
password
};

usuarios.push(usuario);

localStorage.setItem("usuarios", JSON.stringify(usuarios));

document.getElementById("registroMensaje").innerText =
"Cuenta creada correctamente.";

registroForm.reset();

});

}


if(loginForm){

loginForm.addEventListener("submit", function(e){

e.preventDefault();

const correo = document.getElementById("loginCorreo").value;
const password = document.getElementById("loginPassword").value;

const usuario = usuarios.find(u =>
u.correo === correo && u.password === password
);

if(usuario){

document.getElementById("loginMensaje").innerText =
"Bienvenido " + usuario.nombre;

}else{

document.getElementById("loginMensaje").innerText =
"Correo o contraseña incorrectos.";

}

});

}



/* =======================
   SISTEMA DE DONACIONES
======================= */

const form = document.getElementById("donacionForm");
const lista = document.getElementById("listaDonantes");

let donantes = JSON.parse(localStorage.getItem("donantes")) || [];

if(form){

mostrarDonantes();
actualizarProgreso();

form.addEventListener("submit", function(e){

e.preventDefault();

const nombre = document.getElementById("nombre").value;
const correo = document.getElementById("correo").value;
const empresa = document.getElementById("empresa").value;
const tipo = document.getElementById("tipoAyuda").value;
const monto = parseFloat(document.getElementById("monto").value) || 0;

const donante = {
nombre,
correo,
empresa,
tipo,
monto
};

donantes.push(donante);

localStorage.setItem("donantes", JSON.stringify(donantes));

document.getElementById("mensaje").innerText =
"Gracias por apoyar el proyecto.";

form.reset();

mostrarDonantes();
actualizarProgreso();

});

}


function mostrarDonantes(){

if(!lista) return;

lista.innerHTML="";

donantes.forEach(d => {

const li = document.createElement("li");

li.textContent =
`${d.nombre} (${d.empresa || "Independiente"}) - ${d.tipo}`;

lista.appendChild(li);

});

}


function actualizarProgreso(){

const barra = document.getElementById("barraProgreso");
const porcentajeTexto = document.getElementById("porcentaje");

if(!barra || !porcentajeTexto) return;

const meta = 1000000;

let total = 0;

donantes.forEach(d => {

total += d.monto;

});

let porcentaje = (total/meta)*100;

if(porcentaje>100){
porcentaje=100;
}

barra.style.width = porcentaje+"%";

porcentajeTexto.innerText =
"Recaudado: RD$"+total+" ("+porcentaje.toFixed(1)+"%)";

}

});