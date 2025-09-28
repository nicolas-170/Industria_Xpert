document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const mainContainer = document.getElementById("main-container");
  const pedidoSection = document.getElementById("pedido-section");

  // 🚨 Validación: si no hay usuario, mostramos mensaje y salimos
  if (!user) {
    pedidoSection.style.display = "none";
    mainContainer.innerHTML = `
      <section class="card glow-border">
        <h2>Debes iniciar sesión</h2>
        <p>Para apartar un pedido necesitas iniciar sesión.</p>
        <button id="goToRLogin">Iniciar sesión</button>
      </section>
    `;

    document.getElementById("goToRLogin").addEventListener("click", () => {
      window.location.href = "login.html";
    });
    return; // 🔴 detenemos la ejecución aquí
  }

  // ---- Si hay usuario, seguimos como antes ----
  const fullNameEl = document.getElementById("fullName");
  const addressEl = document.getElementById("address");
  const zipCodeEl = document.getElementById("zipCode");
  const productListEl = document.getElementById("productList");
  const totalAmountEl = document.getElementById("totalAmount");
  const comprobanteRow = document.getElementById("comprobanteRow");
  const confirmBtn = document.getElementById("confirmBtn");

  // Llenar datos de usuario
  fullNameEl.textContent = user.nombre || "N/A";
  addressEl.textContent = user.direccion || "N/A";
  zipCodeEl.textContent = user.identificacion || "N/A";

  // Llenar productos y calcular total
  let total = 0;
  cart.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} (x${p.quantity}) - $${(p.precio * p.quantity).toFixed(2)}`;
    productListEl.appendChild(li);

    total += (p.precio * p.quantity);
  });
  totalAmountEl.textContent = `$${total.toFixed(2)}`;

  // Mostrar input de comprobante solo si hay un total a pagar o diferente de 0 
  if (total > 0) comprobanteRow.style.display = "block";

  // Función para generar código random
  function generarCodigo(longitud = 10) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: longitud }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
  }

  // Confirmar y enviar pedido
  confirmBtn.addEventListener("click", async () => {
    const codigo = generarCodigo(10);

    // El destinatario del correo ahora se toma de la constante EMAIL_TO
    const emailTo = EMAIL_TO;

    let imagen = null;
    if (total > 0) {
      const fileInput = document.getElementById("comprobante");
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const base64 = await fileToBase64(file);
        imagen = {
          imagenBase64: base64,
          imagenNombre: file.name
        };
      } else {
        alert("Debes subir un comprobante de pago.");
        return;
      }
    }

    const body = {
      emailTo,
      codigo,
      mensaje: generarMensajePedido(codigo, cart, total),
      tipoMensaje: "text/plain",
      imagen
    };

    try {
      const res = await fetch(`${API_BASE_URL}/gmail-apartado`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        alert("Pedido confirmado y enviado con éxito ✅");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
      } else {
        alert("Error al enviar el pedido.");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión al enviar el pedido.");
    }
  });

  // funcion para convertir archivo a base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = error => reject(error);
    });
  }

  // funcion para: generar mensaje detallado del pedido en el formato solicitado
  function generarMensajePedido(codigo, cart, total) {
    let productosTxt = cart.map(p => `- ${p.nombre} (x${p.quantity}) - $${(p.precio * p.quantity).toFixed(2)}`).join("\n");

    let mensaje = `Se generó un pedido con el código: ${codigo}\n\n`;
    mensaje += `Con la siguiente lista de productos:\n${productosTxt}\n\n`;
    mensaje += `Realizado por: ${user.nombre}\n\n`;

    if (total > 0) {
      mensaje += `Valor total de la compra: $${total.toFixed(2)}\n\n`;
    }
    return mensaje;
  }
});
