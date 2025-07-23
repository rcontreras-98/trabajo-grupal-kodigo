// js/carrito.js
import { obtenerCarrito, vaciarCarrito, eliminarDelCarrito } from './carrito-data.js';

const contenedor = document.getElementById('carrito-contenido');
const botonVaciar = document.getElementById('vaciar-carrito');

function renderCarrito() {
  const carrito = obtenerCarrito();
  contenedor.innerHTML = '';

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info text-center">Tu carrito está vacío.</div>
      </div>
    `;
    return;
  }

  carrito.forEach(producto => {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');
    card.innerHTML = `
       <div class="card h-100 shadow">

      <div class="card-body d-flex flex-column game-card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>
        <button class="btn btn-success mt-auto eliminar" data-id="${producto.id}">
          <i class="fas fa-trash-alt me-1"></i> Eliminar
        </button>
      </div>
    </div>
    `;
    contenedor.appendChild(card);
  });

  // Evento eliminar
  document.querySelectorAll('.eliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      eliminarDelCarrito(id);
      renderCarrito();
    });
  });
}

botonVaciar.addEventListener('click', () => {
  vaciarCarrito();
  renderCarrito();
});

renderCarrito();
