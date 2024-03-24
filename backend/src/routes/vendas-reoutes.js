const { Router } = require('express');
const controller = require('../controllers/vendas-controller');

const gruposRouters = Router(); 

gruposRouters.post('/vendas', controller.nova_venda)
gruposRouters.post('/vendas/:venda_id', controller.adicionar_item)
gruposRouters.get('/vendas/', controller.consultar_vendas)
gruposRouters.get('/vendas/:venda_id', controller.consultar_venda_especifica)
gruposRouters.delete('/vendas/:venda_id', controller.cancelar_item)

module.exports = gruposRouters;