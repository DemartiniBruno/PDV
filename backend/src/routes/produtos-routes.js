const { Router } = require('express');
const controller = require('../controllers/produtos-controller')

const gruposRouters = Router();

gruposRouters.post('/produtos', controller.cadastrar_produto)
gruposRouters.get('/produtos', controller.consultar_produtos)
gruposRouters.get('/produtos/:produto_id', controller.consultar_produto_especifico)
gruposRouters.put('/produtos/:produto_id', controller.editar_produto)
gruposRouters.delete('/produtos/:produto_id', controller.apagar_produto)

module.exports = gruposRouters