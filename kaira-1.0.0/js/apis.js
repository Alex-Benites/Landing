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



//import { initializeApp } from "firebase/app";
//import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqC1Jms0s3csYBphtx0m-u1PcR3biCgy4",
  authDomain: "landing-180e0.firebaseapp.com",
  databaseURL: "https://landing-180e0-default-rtdb.firebaseio.com",
  projectId: "landing-180e0",
  storageBucket: "landing-180e0.firebasestorage.app",
  messagingSenderId: "800539377625",
  appId: "1:800539377625:web:c7745c5ae7a69ec6e263c8",
  measurementId: "G-VWQQBMHLVG"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const hairstyleRef = ref(storage, 'Hairstyle/');


const loadImages = async () => {
  try {
    const res = await listAll(hairstyleRef);
    const galleryContainer = document.getElementById("container-gallery");

    res.items.forEach(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      const imgElement = document.createElement("img");
      imgElement.src = url;  
      imgElement.alt = itemRef.name; 
      imgElement.classList.add("col-12", "col-md-4", "mb-4");
      galleryContainer.appendChild(imgElement);
    });
  } catch (error) {
    console.error("Error al cargar las imágenes:", error);
  }
};

document.addEventListener('DOMContentLoaded', loadImages);
