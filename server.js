const express = require('express');
const bodyParser = require('body-parser');
const osc = require('osc');
const path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));
app.use(bodyParser.json());

// Endpoint para recibir la acción del botón (Aquí pondremos el OSC luego)
const udpPort = new osc.UDPPort({
    localAddress: process.env.OSC_LOCAL_ADDRESS || "0.0.0.0",
    localPort: parseInt(process.env.OSC_LOCAL_PORT) || 57121, // Puerto local (puede ser cualquiera disponible)
    remoteAddress: process.env.OSC_REMOTE_ADDRESS || "127.0.0.1", // Cambia si TouchDesigner está en otra máquina
    remotePort: parseInt(process.env.OSC_REMOTE_PORT) || 8000 // Cambia si TouchDesigner escucha en otro puerto
});
udpPort.open();

app.post('/enviar', (req, res) => {
    console.log(req);
    udpPort.send({ address: req.body.action });
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Dispositivo listo en http://localhost:${port}`);
});