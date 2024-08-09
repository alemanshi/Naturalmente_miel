let carrito = [];
let total = 0;

function agregarAlCarrito(producto, precio, cantidad) {
    cantidad = parseInt(cantidad);
    
    if (cantidad <= 0) {
        alert('La cantidad debe ser mayor a 0.');
        return;
    }

    // Verificar si el producto ya está en el carrito
    const index = carrito.findIndex(item => item.producto === producto);
    if (index !== -1) {
        // Actualizar la cantidad del producto existente
        carrito[index].cantidad = cantidad;
        carrito[index].totalPrecio = carrito[index].precio * cantidad;
    } else {
        // Agregar un nuevo producto al carrito
        const item = { producto, precio, cantidad, totalPrecio: precio * cantidad };
        carrito.push(item);
    }

    // Recalcular el total
    total = carrito.reduce((acc, item) => acc + item.totalPrecio, 0);
    
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${item.producto} - $${item.precio.toFixed(2)} x ${item.cantidad} = $${item.totalPrecio.toFixed(2)}`;
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn btn-danger btn-sm';
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => {
            eliminarDelCarrito(index);
        };
        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
    });

    document.getElementById('total-carrito').textContent = total.toFixed(2);
    
    const btnLimpiarCarrito = document.getElementById('btn-limpiar-carrito');
    if (carrito.length === 0) {
        btnLimpiarCarrito.style.display = 'none';
    } else {
        btnLimpiarCarrito.style.display = 'inline-block';
    }
}

function eliminarDelCarrito(indice) {
    total -= carrito[indice].totalPrecio;
    carrito.splice(indice, 1);
    total = carrito.reduce((acc, item) => acc + item.totalPrecio, 0);
    actualizarCarrito();
}

function limpiarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

function realizarPedido() {
    // Filtrar artículos con cantidad mayor a 0
    const carritoValido = carrito.filter(item => item.cantidad > 0);
    if (carritoValido.length === 0) {
        alert('El carrito está vacío o contiene productos con cantidad 0. No se puede realizar un pedido.');
        return;
    }
    
    const numeroWhatsApp = '+5491151779481';
    const mensaje = `¡Hola! Quiero realizar una compra en tu tienda:%0A%0A${carritoValido.map(item => `${item.producto} - $${item.precio.toFixed(2)} x ${item.cantidad} = $${item.totalPrecio.toFixed(2)}`).join('%0A')}%0A%0ATotal= $${total.toFixed(2)}`;
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensaje}`;
    window.open(url, '_blank');
}

// Ocultar el botón de limpiar carrito inicialmente
document.getElementById('btn-limpiar-carrito').style.display = 'none';
