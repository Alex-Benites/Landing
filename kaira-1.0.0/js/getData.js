// URL de la base de datos de Firebase
const databaseURL = "https://landing-180e0-default-rtdb.firebaseio.com/coleccion.json";

// Función para obtener y mostrar los datos desde Firebase
let getData = async () => {
  try {
    const response = await fetch(databaseURL, { method: "GET" });
    if (!response.ok) {
      alert("Error al obtener los datos.");
    }
    const data = await response.json();
    if (data) {
      let countSuscribers = new Map();
      for (let key in data) {
        let { email, saved } = data[key];
        let date = saved.split(",")[0];
        let count = countSuscribers.get(date) || 0;
        countSuscribers.set(date, count + 1);
      }

      if (countSuscribers.size > 0) {
        let index = 1;
        const subscribersElement = document.getElementById("subscribers");
        subscribersElement.innerHTML = ""; // Limpiar contenido anterior
        for (let [date, count] of countSuscribers) {
          let rowTemplate = `
            <tr>
              <th>${index}</th>
              <td>${date}</td>
              <td>${count}</td>
            </tr>`;
          subscribersElement.innerHTML += rowTemplate;
          index++;
        }
      }
    }
  } catch (error) {
    alert("Error al obtener los datos.");
  }
};

// Evento para iniciar al cargar la página
let ready = () => {
  console.log("DOM está listo");
  getData(); 
};

window.addEventListener("DOMContentLoaded", ready);