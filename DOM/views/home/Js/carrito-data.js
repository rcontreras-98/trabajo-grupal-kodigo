// carrito-data.js
export function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

export function eliminarDelCarrito(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(producto => producto.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

export function vaciarCarrito() {
  localStorage.removeItem('carrito');
}
