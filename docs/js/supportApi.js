const databaseURL2 = "https://landing-180e0-default-rtdb.firebaseio.com/soporte.json";

let sendDataSupport = (event) => {
  event.preventDefault(); 

  const nameElement = document.getElementById("name");
  const emailElement = document.getElementById("email");
  const issueTypeElement = document.getElementById("issue-type");
  const issueDescriptionElement = document.getElementById("issue-description");
  if (nameElement.value.trim() === "" || emailElement.value.trim() === "" || issueDescriptionElement.value.trim() === "") {
    alert("Por favor, complete todos los campos del formulario.");
    return;
  }

  const data = {
    nombre: nameElement.value,
    email: emailElement.value,
    descripcionProblema: issueDescriptionElement.value,
    tipoProblema: issueTypeElement.value,
  };

function showToast() {
    const toastElement = document.getElementById('support-toast');
    const toast = new bootstrap.Toast(toastElement, {
        animation: true,
        autohide: true,
        delay: 5000 
    });
    toast.show();
}

fetch(databaseURL2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("Respuesta de Firebase:", response);
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      return response.json();
    })
    .then((_result) => {
      //console.log("Datos enviados con éxito:", _result);
      //alert("¡Gracias por enviar tu solicitud de soporte!");
      showToast();
      nameElement.value = "";
      emailElement.value = "";
      issueTypeElement.value = ""; 
      issueDescriptionElement.value = "";
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al procesar tu solicitud. ¡Vuelve pronto!");
    });
};

document.getElementById("support-form").addEventListener("submit", sendDataSupport);

