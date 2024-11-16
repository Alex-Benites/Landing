const express = require('express');
const app = express();
const port = 3000;

// Datos de ejemplo para la API (en lugar de una base de datos)
const styles = [
  { id: 1, name: 'mohicano', image: 'https://i.imgur.com/k1jnccG.jpg' },
  { id: 2, name: 'Taper', image: 'https://i.imgur.com/d77sNjZ.jpg' },
  { id: 3, name: 'midFade', image: 'https://i.imgur.com/EUsSDBy.jpg' }
];

// Ruta para obtener todos los estilos de corte
app.get('/api/styles', (req, res) => {
  res.json(styles);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});