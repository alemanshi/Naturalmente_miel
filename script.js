let carrito = [];
let total = 0;

function agregarAlCarrito(producto, precio, cantidad) {
    cantidad = parseInt(cantidad);
    const item = { producto, precio, cantidad, totalPrecio: precio * cantidad };
    carrito.push(item);
    total += item.totalPrecio;
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
    actualizarCarrito();
}

function limpiarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

function realizarPedido() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. No se puede realizar un pedido sin antes agregar productos');
        return;
    }
    const numeroWhatsApp = '+5491151779481';
    const mensaje = `¡Hola! Quiero realizar una compra en tu tienda:%0A%0A${carrito.map(item => `${item.producto} - $${item.precio.toFixed(2)} x ${item.cantidad} = $${item.totalPrecio.toFixed(2)}`).join('%0A')}%0ATotal= $${total.toFixed(2)}`;
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensaje}`;
    window.open(url, '_blank');
}

// Ocultar el botón de limpiar carrito inicialmente
document.getElementById('btn-limpiar-carrito').style.display = 'none';
