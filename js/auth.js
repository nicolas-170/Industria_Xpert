document.addEventListener("DOMContentLoaded", () => {
  const userSection = document.getElementById("user-section");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // Mostrar perfil si está autenticado
    userSection.innerHTML = `
      <div class="perfil-info">
        <img src="assets/img/usuario-de-perfil.png" alt="Perfil">
        <span>${user.nombre}</span>
        <button class="logout-btn" onclick="logout()">Cerrar sesión</button>
      </div>
    `;
  } else {
    // Mostrar login y registro si no ha iniciado sesión
    userSection.innerHTML = `
      <a class="login" href="login.html">Iniciar sesión</a>
      <a class="register" href="register.html">Registrarse</a>
    `;
  }
});

function logout() {
  localStorage.removeItem("user");
  window.location.reload();
}
