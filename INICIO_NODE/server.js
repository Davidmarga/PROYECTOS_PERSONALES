// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos como index.html
app.use(express.static(path.join(__dirname, 'public')));

// Ruta API: devuelve un nombre aleatorio
app.get('/api/nombre', (req, res) => {
  const nombres = ['Lucía', 'Carlos', 'María', 'Juan', 'Ana', 'Luis'];
  const elegido = nombres[Math.floor(Math.random() * nombres.length)];
  res.json({ nombre: elegido });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});