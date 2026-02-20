const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'contacts.json');

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite recibir datos en formato JSON

// Función auxiliar para leer el JSON
async function readData() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { contactos: [] };
    }
}

// Función auxiliar para escribir en el JSON
async function writeData(data) {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
}

// 1. OBTENER todos los contactos (GET)
app.get('/api/contactos', async (req, res) => {
    const data = await readData();
    // Convertimos los IDs a números por seguridad, tal como lo hacías en React
    const contactos = data.contactos.map(c => ({ ...c, id: Number(c.id) }));
    res.json(contactos);
});

// 2. AGREGAR un contacto (POST)
app.post('/api/contactos', async (req, res) => {
    const nuevoContacto = req.body;
    const data = await readData();

    // Le asignamos un ID y estado favorito inicial
    const contactoCompleto = {
        ...nuevoContacto,
        id: Date.now(),
        favorito: false
    };

    data.contactos.push(contactoCompleto);
    await writeData(data);

    res.status(201).json(contactoCompleto);
});

// 3. CAMBIAR ESTADO DE FAVORITO (PUT)
app.put('/api/contactos/:id/favorito', async (req, res) => {
    const id = Number(req.params.id);
    const data = await readData();

    const index = data.contactos.findIndex(c => Number(c.id) === id);
    if (index !== -1) {
        data.contactos[index].favorito = !data.contactos[index].favorito;
        await writeData(data);
        res.json(data.contactos[index]);
    } else {
        res.status(404).json({ message: "Contacto no encontrado" });
    }
});

// 4. ELIMINAR un contacto (DELETE)
app.delete('/api/contactos/:id', async (req, res) => {
    const id = Number(req.params.id);
    const data = await readData();

    const contactosFiltrados = data.contactos.filter(c => Number(c.id) !== id);
    data.contactos = contactosFiltrados;

    await writeData(data);
    res.json({ message: "Contacto eliminado" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log("\n==================================================");
    console.log("🚀 ¡ÉXITO! El servidor Backend se ha encendido.");
    console.log(`📡 Escuchando peticiones en: http://localhost:${PORT}`);
    console.log("📁 Archivo conectado: contacts.json");
    console.log("==================================================\n");
});