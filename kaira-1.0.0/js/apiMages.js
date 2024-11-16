const apiUrl = 'http://localhost:3000/api/styles'; 
const loadGallery = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al cargar los estilos de corte');
    }

    const styles = await response.json();
    console.log(styles);
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = '';

    styles.forEach(style => {
      const { name, image } = style; 
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
      galleryContainer.appendChild(galleryItem);
    });
  } catch (error) {
    console.error('Error al cargar los datos de la API:', error);
  }
};

document.addEventListener('DOMContentLoaded', loadGallery);
