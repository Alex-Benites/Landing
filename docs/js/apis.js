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
      const fileName = itemRef.name.split('.')[0]; 
      const card = document.createElement("div");
      card.classList.add("flip-card", "col-12", "col-md-4", "mb-4"); 

      const cardInner = document.createElement("div");
      cardInner.classList.add("flip-card-inner");
      const cardFront = document.createElement("div");
      cardFront.classList.add("flip-card-front");
      const imgElement = document.createElement("img");
      imgElement.src = url;
      imgElement.alt = fileName; 
      imgElement.classList.add("gallery-image"); 
      cardFront.appendChild(imgElement);

      
      const cardBack = document.createElement("div");
      cardBack.classList.add("flip-card-back");
      const nameElement = document.createElement("h4");
      nameElement.textContent = fileName; 
      cardBack.appendChild(nameElement);
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);

      
      card.appendChild(cardInner);
      galleryContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar las imágenes:", error);
  }
};

document.addEventListener('DOMContentLoaded', loadImages);

