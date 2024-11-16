/*

// Tu clave de API de Unsplash
const apiKey = 'j2L6_LXOBWR5cIXS_SrExgreO4-XO7tr9dZj67br0u8';  // Aquí va tu clave API
const apiUrl = `https://api.unsplash.com/search/photos?query=hairstyle&client_id=${apiKey}&per_page=9`;

// Función para cargar la galería de imágenes
const loadGallery = async () => {
  try {
    // Realizamos la solicitud a la API de Unsplash
    const response = await fetch(apiUrl);
    if (!response.ok) {
      alert('No se pudieron cargar las imágenes');
      return;
    }
    const data = await response.json();
    const images = data.results;

    // Recorrer las imágenes obtenidas de la API
    images.forEach((image) => {
      const imageUrl = image.urls.small;  // URL de la imagen
      const altText = image.alt_description || 'Hairstyle';  // Descripción alternativa de la imagen

      // Crear el HTML para cada imagen
      const template = `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${imageUrl}" class="card-img-top" alt="${altText}">
            <div class="card-body">
              <h5 class="card-title">${altText}</h5>
            </div>
          </div>
        </div>
      `;

      // Agregar la imagen al contenedor de la galería
      document.getElementById('gallery-container').innerHTML += template;
    });
  } catch (error) {
    alert('Hubo un error al cargar las imágenes');
    console.error('Error:', error);
  }
};

// Ejecutamos la función cuando la página esté completamente cargada
document.addEventListener('DOMContentLoaded', loadGallery);
*/


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCp8DfYJV8JFACQJnjIubbelf1h4yqmD5Q",
    authDomain: "chillcraze.firebaseapp.com",
    projectId: "chillcraze",
    storageBucket: "chillcraze.appspot.com",
    messagingSenderId: "492166652243",
    appId: "1:492166652243:web:dcdba9a0a7325c988101a6"
};

// Inicializa la app y el almacenamiento
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Referencia al contenedor donde se cargarán las imágenes
const galleryContainer = document.getElementById("gallery-container");

// Función para cargar imágenes
async function loadImages() {
    try {
      const imagesRef = ref(storage, 'images/');
      const response = await listAll(imagesRef);
      console.log("Imágenes encontradas:", response);
  
      response.items.forEach(async (item) => {
        const url = await getDownloadURL(item);
        console.log("URL de la imagen:", url);
  
        // Genera la imagen dinámica
        const col = document.createElement("div");
        col.className = "col-lg-4 col-md-6 mb-4";
        const img = document.createElement("img");
        img.src = url;
        img.className = "img-fluid rounded shadow";
        col.appendChild(img);
        galleryContainer.appendChild(col);
      });
    } catch (error) {
      console.error("Error cargando imágenes:", error);
    }
  }

document.addEventListener("DOMContentLoaded", loadImages);