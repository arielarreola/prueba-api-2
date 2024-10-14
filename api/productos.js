const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('productos').get();
        const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { nombre, precio } = req.body;
        const docRef = await db.collection('productos').add({ nombre, precio });
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Otras operaciones (GET, PUT, DELETE) se pueden agregar aquí

module.exports = router;
