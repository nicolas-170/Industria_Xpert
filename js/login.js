document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const errorMessageDiv = document.getElementById("error-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessageDiv.textContent = "";
    errorMessageDiv.classList.remove("show-error");

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    try {
      /*API_BASE_URL su valor es: http://127.0.0.1:7777/Industria-Xpert*/
      const response = await fetch(`${API_BASE_URL}/clientes/autenticarse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let message = "Error de autenticación. Verifica tus credenciales.";

        if (errorData && errorData.message) {
          message = errorData.message;
        } else if (response.status === 401) {
          message = "Correo o contraseña incorrectos.";
        } else if (response.status === 400) {
          // Si el servidor envía un 400 (Bad Request), podría ser por validación
          message = "Datos de entrada inválidos.";
        }
        
        errorMessageDiv.textContent = message;
        errorMessageDiv.classList.add("show-error"); // Añade la clase para mostrar el error
        return; // Detén la ejecución
      }

      const userData = await response.json();
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "index.html"; // Redirige solo si la autenticación es exitosa

    } catch (err) {
      errorMessageDiv.textContent = "Error al conectar con el servidor. Inténtalo de nuevo más tarde.";
      errorMessageDiv.classList.add("show-error"); // Añade la clase para mostrar el error de conexión
      console.error("Error en la conexión o solicitud:", err);
    }
  });
});