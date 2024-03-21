const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

const produtosRoutes = require('./routes/produtos-routes')
app.use(produtosRoutes)

module.exports = app;