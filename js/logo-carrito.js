document.addEventListener("DOMContentLoaded", () => {
  const btnCarrito= document.getElementById("btn-carrito");

    btnCarrito.innerHTML = `
    <div class="btn-cart-buton"> 
    <a href="carrito.html" class="cart-buton">
        <img src="assets/images/carrito.png" alt="Carrito" class="cart-icon">
        <span class="cart-count" id="number-cart"></span>
    </a>
    </div>
    `;

});