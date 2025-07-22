// Importa el arreglo de productos desde productos.js
import { productos } from './productos.js';

// Obtiene los parámetros de la URL (por ejemplo, ?id=1)
const urlParams = new URLSearchParams(window.location.search);

// Extrae el valor del parámetro "id" de la URL y lo convierte a número entero
const id = parseInt(urlParams.get('id'));

// Busca dentro del array de productos el juego cuyo id coincida con el que se pasó en la URL
const juego = productos.find(j => j.id === id);

// Verifica si se encontró el juego con ese ID
if (juego) {
  // Inserta el nombre del juego en el elemento HTML con id="nombre-juego"
  document.getElementById('nombre-juego').textContent = juego.nombre;

  // Obtiene referencias a los elementos del slider (imagen principal y botones)
  const sliderImg = document.getElementById('imagen-slider');
  const btnAnt = document.getElementById('anterior');
  const btnSig = document.getElementById('siguiente');

  // Crea un arreglo con las imágenes del juego (imagen principal + galería)
  const imagenes = [juego.imagen, ...(juego.galeria || [])];

  // Inicializa el índice actual del slider en 0
  let indice = 0;

  // Función que cambia la imagen del slider según el índice recibido
  function mostrarImagen(i) {
    sliderImg.src = imagenes[i];
  }

  // Muestra la primera imagen al cargar la página
  mostrarImagen(indice);

  // Evento: cuando se hace clic en el botón "anterior", se muestra la imagen previa
  btnAnt.addEventListener('click', () => {
    indice = (indice - 1 + imagenes.length) % imagenes.length;
    mostrarImagen(indice);
  });

  // Evento: cuando se hace clic en el botón "siguiente", se muestra la siguiente imagen
  btnSig.addEventListener('click', () => {
    indice = (indice + 1) % imagenes.length;
    mostrarImagen(indice);
  });

  // Hace que el slider avance automáticamente cada 5 segundos
  setInterval(() => {
    indice = (indice + 1) % imagenes.length;
    mostrarImagen(indice);
  }, 5000);

  // Se muestra las descripciónes del juego 
  document.getElementById('descripcion').textContent = juego.descripcion;
  document.getElementById('genero').textContent = juego.genero;
  document.getElementById('consola').textContent = juego.consola;
  document.getElementById('precio').textContent = juego.precio.toFixed(2);
  document.getElementById('trailer-juego').src = juego.trailer;
  
} else {
  // Si no se encuentra el juego, muestra un mensaje de error en pantalla
  document.querySelector('.container').innerHTML = `<h2>Juego no encontrado.</h2>`;
}
