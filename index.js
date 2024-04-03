import express from 'express';
import router from './routes/router.js';
const app = express();
import path from "path";
import { fileURLToPath } from "node:url";
const filePath = fileURLToPath;
const PORT = process.env.PORT || 3003;

//Middleware de la ruta
app.use('/', router);
app.use(express.static('assets'))


app.listen(PORT, () => {
    console.log(`El servidor esta levantado en el port http://localhost:${PORT}`
    )
});