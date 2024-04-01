const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.json());

const produtosRoutes = require('./routes/produtos-routes');
app.use(produtosRoutes);

const vendasRoutes = require('./routes/vendas-reoutes');
app.use(vendasRoutes);

module.exports = app;