document.addEventListener("DOMContentLoaded", async () => {
    const productosContainer = document.getElementById("productos-container");
    const API_URL = `${API_BASE_URL}/productos/obtener-todos`;

    // Define un producto de prueba simple
    const productoDePrueba = {
        id_producto: "0",
        nombre: "Producto de Prueba",
        talla: "Única",
        color: "Múltiple",
        cantidad: "1",
        tipo: "Genérico",
        // Añadimos un precio básico para el ejemplo
        precio: 10.00
    };

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        const productos = await response.json();
        // Si no hay productos o la respuesta está vacía, usa el de prueba
        if (!productos || productos.length === 0) {
            console.warn("La API no retornó productos. Mostrando producto de prueba.");
            renderProductos([productoDePrueba]);
        } else {
            // Asegúrate de añadir un precio si tu API no lo da, o el carrito no funcionará bien.
            // Aquí, asumimos un precio fijo si no viene de la API.
            const productosConPrecio = productos.map(p => ({ ...p, precio: p.precio || 10.00 }));
            renderProductos(productosConPrecio);
        }

    } catch (error) {
        console.error("Error al obtener los productos:", error);
        productosContainer.innerHTML = `
            <p style="text-align: center; grid-column: 1 / -1; color: #d9534f;">
                No se pudieron cargar los productos. Mostrando un ejemplo.
            </p>
        `;
        renderProductos([productoDePrueba]);
    }

    /**
     * Renderiza los productos en la página.
     * @param {Array} productos - Un array de objetos producto.
     */
    function renderProductos(productos) {
        productosContainer.innerHTML = ''; // Limpiar el contenedor
        productos.forEach(producto => {
            const article = document.createElement("article");
            const imageUrl = `assets/images/image.png`;

            article.innerHTML = `
                <img src="${imageUrl}" alt="${producto.nombre}" />
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
                    <span class="value">${producto.cantidad || 'N/A'}</span>
                </div>
                <div class="product-info-row">
                    <span class="label">Tipo:</span>
                    <span class="value">${producto.tipo || 'N/A'}</span>
                </div>
                <div class="product-info-row">
                    <span class="label">Precio:</span>
                    <span class="value">$${(producto.precio || 0).toFixed(2)}</span>
                </div>
                <button class="add-to-cart-btn" data-product='${JSON.stringify(producto)}'>
                    Añadir al Carrito
                </button>
            `;
            productosContainer.appendChild(article);
        });

        // Añadir event listeners después de que todos los botones existan
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productData = JSON.parse(event.target.dataset.product);
                addToCart(productData);
            });
        });
    }

    /**
     * Añade un producto al carrito en localStorage.
     * @param {Object} product - El objeto producto a añadir.
     */
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id_producto === product.id_producto);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
        } else {
            cart.push({ ...product, quantity: 1 }); // Añadir con cantidad inicial de 1
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.nombre} ha sido añadido al carrito.`);
        console.log("Carrito actual:", cart);
    }
});