// catalogo.js
import { productos } from './productos.js';

// Elementos del DOM
const contenedor = document.getElementById('contenedor-productos');
const filtroGenero = document.getElementById('filtro-genero');
const filtroConsola = document.getElementById('filtro-consola');

// Función para crear mensaje de "no encontrado"
function crearMensajeNoEncontrado(tipo, valor) {
  return `
    <div class="col-12">
      <div class="alert alert-warning text-center" role="alert">
        <h4 class="alert-heading">¡No se encontraron productos!</h4>
        <p class="mb-0">No hay productos disponibles para ${tipo}: <strong>${valor}</strong></p>
        <hr>
        <p class="mb-0">Intenta cambiar los filtros o limpiar la búsqueda.</p>
      </div>
    </div>
  `;
}

// Función para pintar productos
function mostrarProductos(productosFiltrados) {
  contenedor.innerHTML = ''; // limpiar
  
  // Verificar si hay productos para mostrar
  if (productosFiltrados.length === 0) {
    // Obtener valores de los filtros para mostrar mensaje específico
    const generoSeleccionado = filtroGenero.value;
    const consolaSeleccionada = filtroConsola.value;
    
    let mensaje = '';
    
    // Determinar qué tipo de mensaje mostrar
    if (generoSeleccionado !== 'todos' && consolaSeleccionada !== 'todas') {
      mensaje = `
        <div class="col-12">
          <div class="alert alert-warning text-center" role="alert">
            <h4 class="alert-heading">¡No se encontraron productos!</h4>
            <p class="mb-0">No hay productos disponibles para:</p>
            <p><strong>Género:</strong> ${generoSeleccionado}</p>
            <p><strong>Consola:</strong> ${consolaSeleccionada}</p>
            <hr>
            <p class="mb-0">Intenta cambiar los filtros o limpiar la búsqueda.</p>
          </div>
        </div>
      `;
    } else if (generoSeleccionado !== 'todos') {
      mensaje = crearMensajeNoEncontrado('el género', generoSeleccionado);
    } else if (consolaSeleccionada !== 'todas') {
      mensaje = crearMensajeNoEncontrado('la consola', consolaSeleccionada);
    } else {
      mensaje = `
        <div class="col-12">
          <div class="alert alert-info text-center" role="alert">
            <h4 class="alert-heading">No hay productos disponibles</h4>
            <p class="mb-0">El catálogo está vacío en este momento.</p>
          </div>
        </div>
      `;
    }
    
    contenedor.innerHTML = mensaje;
    return;
  }
  
  // Si hay productos, mostrarlos normalmente
  productosFiltrados.forEach(producto => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.descripcion}</p>
        <p class="card-text"><strong>Consola:</strong> ${producto.consola}</p>
        <p class="card-text"><strong>Precio:</strong> $${producto.precio}</p>
        <button class="btn btn-success">Agregar al carrito</button>
        <a href='${producto.url}?id=${producto.id}' > Ver mas informacion del juego  </a>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

// Función para aplicar filtros
function aplicarFiltros() {
  const generoSeleccionado = filtroGenero.value;
  const consolaSeleccionada = filtroConsola.value;

  const filtrados = productos.filter(prod => {
    const coincideGenero = generoSeleccionado === 'todos' || prod.genero === generoSeleccionado;
    const coincideConsola = consolaSeleccionada === 'todas' || prod.consola === consolaSeleccionada;
    return coincideGenero && coincideConsola;
  });

  mostrarProductos(filtrados);
}

// Evento para el botón "Limpiar filtros"
const limpiarFiltrosBtn = document.getElementById('limpiar-filtros');

limpiarFiltrosBtn.addEventListener('click', () => {
  // Reiniciar selects a la opción por defecto
  filtroGenero.value = 'todos';
  filtroConsola.value = 'todas';

  // Mostrar todos los productos
  mostrarProductos(productos);
});

// Eventos
filtroGenero.addEventListener('change', aplicarFiltros);
filtroConsola.addEventListener('change', aplicarFiltros);

// Mostrar todos los productos al inicio
mostrarProductos(productos);