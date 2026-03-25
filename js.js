document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================
       CONFIGURACIÓN Y ESTADO GLOBAL
    ========================================== */
    const META_DONACION = 1000000;
    
    // Función utilitaria para manejo de LocalStorage
    const storage = {
        get: (key) => JSON.parse(localStorage.getItem(key)) || [],
        set: (key, data) => localStorage.setItem(key, JSON.stringify(data))
    };

    let usuarios = storage.get("usuarios");
    let donantes = storage.get("donantes");

    /* ==========================================
       SISTEMA DE USUARIOS (REGISTRO Y LOGIN)
    ========================================== */
    const handleUserForm = (formId, callback) => {
        const form = document.getElementById(formId);
        if (form) form.addEventListener("submit", callback);
    };

    // Registro
    handleUserForm("registroForm", (e) => {
        e.preventDefault();
        const fields = {
            nombre: document.getElementById("registroNombre").value.trim(),
            correo: document.getElementById("registroCorreo").value.trim(),
            password: document.getElementById("registroPassword").value
        };
        const mensaje = document.getElementById("registroMensaje");

        if (Object.values(fields).some(val => !val)) {
            mensaje.innerText = "⚠️ Por favor rellena todos los campos.";
            return;
        }

        usuarios.push(fields);
        storage.set("usuarios", usuarios);
        
        mensaje.innerText = "✅ Cuenta creada correctamente.";
        e.target.reset();
    });

    // Login
    handleUserForm("loginForm", (e) => {
        e.preventDefault();
        const correo = document.getElementById("loginCorreo").value.trim();
        const password = document.getElementById("loginPassword").value;
        const mensaje = document.getElementById("loginMensaje");

        const usuario = usuarios.find(u => u.correo === correo && u.password === password);
        
        if (usuario) {
            mensaje.innerText = `✨ Bienvenido de nuevo, ${usuario.nombre}`;
            mensaje.style.color = "#28a745";
        } else {
            mensaje.innerText = "❌ Credenciales incorrectas.";
            mensaje.style.color = "#d9534f";
        }
    });

    /* ==========================================
       SISTEMA DE DONACIONES
    ========================================== */
    const donacionForm = document.getElementById("donacionForm");

    const actualizarInterfazDonaciones = (animar = false) => {
        const lista = document.getElementById("listaDonantes");
        const barra = document.getElementById("barraProgreso");
        const texto = document.getElementById("porcentaje");

        if (lista) {
            lista.innerHTML = donantes.slice(-5).map(d => 
                `<li class="animate-fade-in">${d.nombre} (${d.empresa || "Independiente"}) - ${d.tipo}</li>`
            ).join('');
        }

        const totalActual = donantes.reduce((sum, d) => sum + d.monto, 0);
        const porcentaje =