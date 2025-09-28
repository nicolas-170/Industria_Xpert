document.addEventListener("DOMContentLoaded", async () => {
    const productosContainer = document.getElementById("productos-container");
    const numberCart = document.getElementById("number-cart");
    const API_URL = `${API_BASE_URL}/productos/obtener-todos`;

    // 🔹 Inicializa el contador del carrito al cargar la página
    actualizarNumeroCarrito();

    // Define un producto de prueba simple
    const productoDePrueba = {
        id_producto: "0",
        nombre: "Producto de Prueba",
        talla: "Única",
        color: "Múltiple",
        cantidad: "1",
        tipo: "Genérico",
        precio: 0
    };

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        const productos = await response.json();
        if (!productos || productos.length === 0) {
            console.warn("La API no retornó productos. Mostrando producto de prueba.");
            renderProductos([productoDePrueba]);
        } else {
            const productosConPrecio = productos.map(p => ({ ...p, precio: p.precio || 0.00 }));
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

    function renderProductos(productos) {
        productosContainer.innerHTML = '';
        productos.forEach(producto => {
            const article = document.createElement("article");
            const imageUrl = `assets/img/image.png`;

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
                    <span class="value">$${producto.precio}</span>
                </div>
                <button class="add-to-cart-btn" data-product='${JSON.stringify(producto)}'>
                    Añadir al Carrito
                </button>
            `;
            productosContainer.appendChild(article);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productData = JSON.parse(event.target.dataset.product);
                addToCart(productData);
            });
        });
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id_producto === product.id_producto);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        actualizarNumeroCarrito();
    }

    function actualizarNumeroCarrito() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalItems = 0;
        cart.forEach(item => {
            totalItems += item.quantity || 1;
        });
        if (totalItems === 0) {
            return
        }
        numberCart.textContent = totalItems;
    }
});
