// URL de la base de datos de Firebase
const databaseURL = "https://landing-180e0-default-rtdb.firebaseio.com/coleccion.json";

// Función para enviar los datos al servidor
let sendDataFooter = () => {
  const emailElement = document.getElementById("footer_email");
  const emailText = emailElement.value;

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

  const data = {
    email: emailText,
    saved: new Date().toLocaleString("es-CO", {
      timeZone: "America/Guayaquil",
    }),
  };

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
      alert("Gracias por suscribirte, ¡te mantendremos actualizado!");
      emailElement.value = "";
      emailElement.placeholder = "Your email Address";
      emailElement.focus();
    })
    .catch((_error) => {
      alert("Hubo un error al procesar tu solicitud. ¡Vuelve pronto!");
    });
};

// Evento para añadir al botón de SignUp
let loaded = (_eventLoaded) => {
  const signupButton = document.getElementById("footer_signup");
  signupButton.addEventListener("click", sendDataFooter);
};

// Evento de carga
window.addEventListener("load", loaded);