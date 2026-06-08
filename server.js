const { app, port } = require('./app');

app.listen(port, () => {
  console.log(`Servidor listo en http://localhost:${port}`);
});