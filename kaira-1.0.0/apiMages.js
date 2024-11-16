// URL de tu API (ajusta esta URL según tu servidor)
const apiUrl = 'http://localhost:3000/api/styles'; // Cambia esta URL si es diferente

// Función para cargar las imágenes desde la API
const loadGallery = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al cargar los estilos de corte');
    }

    const styles = await response.json();
    console.log(styles); // Suponemos que la respuesta es un arreglo de objetos

    // Acceder al contenedor de la galería
    const galleryContainer = document.getElementById('gallery-container');

    // Limpiar cualquier contenido previo
    galleryContainer.innerHTML = '';

    // Iterar sobre los estilos y agregar las imágenes a la galería
    styles.forEach(style => {
      const { name, image } = style; // Desestructuración para obtener nombre e imagen

      // Crear el elemento HTML para cada imagen
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('col-md-4', 'mb-4');

      galleryItem.innerHTML = `
        <div class="card">
          <img src="${image}" class="card-img-top" alt="${name}">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
          </div>
        </div>
      `;

      // Insertar el nuevo elemento en el contenedor de la galería
      galleryContainer.appendChild(galleryItem);
    });
  } catch (error) {
    console.error('Error al cargar los datos de la API:', error);
  }
};

// Llamamos a la función para cargar la galería cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadGallery);
