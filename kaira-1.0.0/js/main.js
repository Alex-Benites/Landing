// URL de la base de datos de Firebase
const databaseURL = "https://landing-180e0-default-rtdb.firebaseio.com/coleccion.json";

// Función para enviar los datos al servidor
let sendDataFooter = () => {
  const emailElement = document.getElementById("footer_email"); // Input de email en el footer
  const emailText = emailElement.value;

  // Verifica si el campo de correo está vacío
  if (emailText.length === 0) {
    emailElement.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(50px)" },
        { transform: "translateX(-50px)" },
        { transform: "translateX(0)" },
      ],
      {
        duration: 400,
        easing: "linear",
      }
    );
    emailElement.focus();
    return;
  }

  // Preparar los datos para Firebase
  const data = {
    email: emailText,
    saved: new Date().toLocaleString("es-CO", {
      timeZone: "America/Guayaquil",
    }),
  };

  // Enviar los datos a Firebase
  fetch(databaseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      return response.json();
    })
    .then((_result) => {
      alert("Gracias por suscribirte, ¡te mantendremos actualizado!"); // Mensaje de éxito
      emailElement.value = "";
      emailElement.placeholder = "Your email Address";
      emailElement.focus();
      getData(); // Llamada para actualizar la tabla de suscriptores
    })
    .catch((_error) => {
      alert("Hubo un error al procesar tu solicitud. ¡Vuelve pronto!"); // Mensaje de error
    });
};

// Función para obtener y mostrar los suscriptores desde Firebase
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

      // Actualiza la tabla con los nuevos datos
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

// Función de inicialización que se ejecuta al cargar la página
let ready = () => {
  console.log("DOM está listo");
  getData(); // Recuperar los datos al cargar la página
};

// Función para añadir los eventos al botón de SignUp en el footer
let loaded = (_eventLoaded) => {
  const signupButton = document.getElementById("footer_signup");
  signupButton.addEventListener("click", sendDataFooter); // Enviar datos al hacer clic
};

// Eventos de carga
window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded);

