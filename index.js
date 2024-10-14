const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');
const express = require('express');
const cors = require('cors');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Importa las rutas de productos
const productosRouter = require('./api/productos');
app.use('/api/productos', productosRouter);

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
