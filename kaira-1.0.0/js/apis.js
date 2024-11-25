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

      // Extrae el nombre del archivo sin la extensión
      const fileName = itemRef.name.split('.')[0]; // Obtiene el nombre del archivo sin la extensión

      // Crea el contenedor de la tarjeta (flip)
      const card = document.createElement("div");
      card.classList.add("flip-card", "col-12", "col-md-4", "mb-4"); // Aquí aseguramos que las clases sean las correctas para el diseño

      // Contenedor para el flip
      const cardInner = document.createElement("div");
      cardInner.classList.add("flip-card-inner");

      // Parte delantera de la tarjeta con la imagen
      const cardFront = document.createElement("div");
      cardFront.classList.add("flip-card-front");

      // Imagen en la parte delantera
      const imgElement = document.createElement("img");
      imgElement.src = url;
      imgElement.alt = fileName; // Usamos el nombre del archivo sin la extensión
      imgElement.classList.add("gallery-image"); // Aplicamos la clase que ya tiene estilos definidos
      cardFront.appendChild(imgElement);

      // Parte trasera de la tarjeta (con el nombre del corte)
      const cardBack = document.createElement("div");
      cardBack.classList.add("flip-card-back");

      // Agregar el nombre del corte en la parte trasera
      const nameElement = document.createElement("h4");
      nameElement.textContent = fileName; // Usamos solo el nombre del archivo
      cardBack.appendChild(nameElement);

      // Agregar las partes (frontal y trasera) al contenedor interno de la tarjeta
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);

      // Finalmente, agregar el contenedor de la tarjeta al contenedor de la galería
      card.appendChild(cardInner);
      galleryContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar las imágenes:", error);
  }
};

document.addEventListener('DOMContentLoaded', loadImages);
