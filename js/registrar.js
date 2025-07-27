document.addEventListener("DOMContentLoaded", async () => {
    const registar = document.getElementById("registrar");
    const errorMessageDiv = document.getElementById("error-registrar");
    const API_URL = `${API_BASE_URL}/clientes`;

    registrar.addEventListener("submit", async (e) => {
        e.preventDefault();
         
        const celular = document.getElementById("celular").value;
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const identificacion = document.getElementById("identificacion").value;
        const direccion = document.getElementById("direccion").value;
        const password = document.getElementById("password").value;
        console.log(password)

        try{
            const response = await fetch(`${API_BASE_URL}/clientes`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({celular, nombre, correo, identificacion, direccion, password }),
            });

            if (!response.ok) {
                errorMessageDiv.textContent = "Error al registrar"
            } else{
                window.location.href = "login.html";
            }
        }catch (err) {
            errorMessageDiv.textContent = "Error al conectar con el servidor, para registar. Inténtalo de nuevo más tarde.";
            console.error("Error en la conexión o solicitud:", err);
        }

        });


});