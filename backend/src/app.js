const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const produtosRoutes = require('./routes/produtos-routes');
app.use(produtosRoutes);

const vendasRoutes = require('./routes/vendas-reoutes');
app.use(vendasRoutes);

module.exports = app;