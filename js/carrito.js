document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const totalContainer = document.getElementById("total");

    // Cambia "index.html" por la página donde tienes tus productos
    document.getElementById("back-btn").addEventListener("click", () => {
        window.location.href = "index.html";
    });


    // Obtén el carrito del localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = `
         <div class="empty-cart">
                <img src="assets/img/carrito_de_compras_vacio.png" alt="Carrito vacío">
                <p>¡Tu carrito está vacío! 🛒</p>
                <p>Agrega productos y estarán listos aquí.</p>
            </div>
        `;
        return;
    }

    let total = 0;

    cart.forEach((producto, index) => {
        const article = document.createElement("article");

        total += (producto.precio * producto.quantity);

        article.innerHTML = `
            <h4>${producto.nombre}</h4>
            <div class="product-info-row">
                <span class="label">Talla:</span>
                <span class="value">${producto.talla || 'N/A'}</span>
            </div>
            <div class="product-info-row">
                <span class="label">Color:</span>
                <span class="value">${producto.color || 'N/A'}</span>
            </div>
            <div class="product-info-row">
                <span class="label">Cantidad:</span>
                <span class="value">${producto.quantity}</span>
            </div>
            <div class="product-info-row">
                <span class="label">Tipo:</span>
                <span class="value">${producto.tipo || 'N/A'}</span>
            </div>
            <div class="product-info-row">
                <span class="label">Precio Unitario:</span>
                <span class="value">$${producto.precio.toFixed(2)}</span>
            </div>
            <div class="product-info-row">
                <span class="label">Subtotal:</span>
                <span class="value">$${(producto.precio * producto.quantity).toFixed(2)}</span>
            </div>
            <button class="remove-btn" data-index="${index}">❌ Eliminar</button>
        `;
        cartContainer.appendChild(article);
    });

    totalContainer.innerHTML =`
    <a href="apartado.html">
        <button class="boton-apartado" > 
            Apartar pedido $${total.toFixed(2)}
        </button>
    </a>`;

    // Event listener para eliminar productos
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            removeFromCart(index);
        });
    });

    /**
     * Elimina un producto del carrito
     */
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload(); // recargar la página para actualizar vista
    }
});
