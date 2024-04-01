import express from "express";
const router = express.Router();
import fs from 'fs';
import { fileURLToPath } from "node:url";
const filePath = fileURLToPath(new URL("../views/index.html", import.meta.url));
const filePath2 = fileURLToPath(
  new URL("../assets/data.json", import.meta.url)
);


//Ruta raíz
router.get("/", (req, res) => {
    res.sendFile(filePath);
});

//Ruta data
router.get('/deportes', (req, res) => {
    console.log(filePath2);
    res.sendFile(filePath2)
});

//Capturar la data de data.json
router.get('/agregar', (req, res) => {
    const { nombre, precio } = res.query;
    //Primero se hace la llamada de la data
    const dataSport = fs.readFileSync(filePath2);
    console.log(dataSport)
    const { deportes } = JSON.parse(dataSport);
    //Se agregas lo que recogemos de la query string
    deportes.push({
        nombre,
        precio
    });
    //Y escribimos la data
    fs.writeFileSync(filePath2, JSON.stringify({ deportes }))
    res.send('')
});

export default router;
