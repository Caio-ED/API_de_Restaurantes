const express = require('express');
const rotas = require('./routes')

const app = express();
app.use(express.json())
rotas(app)


app.listen(3000, () => {console.log('Servidor Ligado!')})