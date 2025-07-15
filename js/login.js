document.addEventListener("DOMContentLoaded", () => {
  // Tener acceso al formulario
  const form = document.getElementById("login-form");

  // Escuchar el evento de envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    try {
      const response = await fetch(`${API_BASE_URL}/clientes/autenticarse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, password }),
      });

      if (!response.ok) throw new Error("Error en autenticación");
      const userData = await response.json();

      localStorage.setItem("user", JSON.stringify(userData));
      // Redirige al index.html
      window.location.href = "index.html";
    } catch (err) {
      alert("Error al conectar con el servidor");
      console.error(err);
    }
  });
});
