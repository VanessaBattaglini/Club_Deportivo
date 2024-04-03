import express from "express";
const router = express.Router();
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../views/index.html");
const dataFilePath = path.join(__dirname, "../assets/data.json");


//Ruta raíz
router.get("/", (req, res) => {
    res.sendFile(filePath);
});

//Ruta data
router.get('/deportes', (req, res) => {
    console.log(dataFilePath);
    res.sendFile(dataFilePath)
});

//Capturar la data de data.json
router.get('/agregar', (req, res) => {
    const { nombre, precio } = req.query;
    try {
      //Primero se hace la llamada de la data
        const dataSport = fs.readFileSync(dataFilePath);
        console.log(dataSport);
        const { deportes } = JSON.parse(dataSport);
      //Se agregas lo que recogemos de la query string
        deportes.push({
            nombre,
            precio,
        });
      //Y escribimos la data
        fs.writeFileSync(dataFilePath, JSON.stringify({ deportes }));
        res.send("Se ha agregado un nuevo deporte");
    } catch (error) {
        res.status(500).send("Error al leer la data de deportes");
    }
});
//Ruta para editar
router.get("/editar", (req, res) => {
    const { nombre, precio } = req.query;

    try {
        // Leer la data actual
        const dataSport = JSON.parse(fs.readFileSync(dataFilePath));
        let { deportes } = JSON.parse(dataSport);
        // Buscar el deporte por su nombre
        deportes.forEach((s) => {
            if (s.nombre === nombre) {
                s.precio = precio;
            }
            res.send("Deporte no encontrado");
        });
        // Escribir la data actualizada
        fs.writeFileSync(dataFilePath, JSON.stringify({ deportes }));
        res.send("Se ha editado el deporte correctamente");
    } catch (error) {
        res.status(500).send("Error al editar el deporte");
    }
});

//Ruta para eliminar
router.get('/eliminar', (req, res) => {
    const { nombre } = req.query;
    try {
        const dataSport = fs.readFileSync(dataFilePath);
        console.log(dataSport);
        let { deportes } = JSON.parse(dataSport);
        deportes = deportes.filter(item => item.nombre !== nombre);
        fs.writeFileSync(dataFilePath, JSON.stringify({ deportes }));
        res.send("El item ha sido eliminado con éxito");
    } catch (error) {
        res.status(500).send("Se produjo un error al borrar items en deporte");
    }

});

export default router;
