const db = require('../db/db-create')

const cadastrar_produto = async (req, res) => {
    try {


        if (!req.body.nome || req.body.nome == '') {
            throw new Error('O nome do produto é obrigatório')
        }

        else if (req.body.nome.length < 3) {
            throw new Error('O nome do produto deve ter no mínimo 3 caracteres')
        }

        else if (await db.Produto.findOne({
            where: {
                codigo_barras: req.body.codigo_barras
            }
        })) {
            throw new Error('Código de barras já utilizado')
        }

        else {
            const produto = await db.Produto.create(req.body)
            res.json({
                status: 200,
                message: 'Produto cadastrado com sucesso'
            })
        }

    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

const consultar_produtos = async (req, res) => {
    try {
        const produtos = await db.Produto.findAll()
        res.json(produtos)
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

const consultar_produto_especifico = async (req, res) => {
    try {
        const produto = await db.Produto.findOne({
            where: {
                id: req.params.produto_id
            }
        })
        if (produto) {
            res.json(produto)
        } else {
            throw new Error('Produto não encontrado')
        }
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

const editar_produto = async (req, res) => {
    try {
        const produto = await db.Produto.findOne({
            where: {
                id: req.params.produto_id
            }
        })
        produto.nome = req.body.nome
        produto.codigo_barras = req.body.codigo_barras
        produto.valor_venda = req.body.valor_venda
        produto.quantidade = req.body.quantidade
        await produto.save({ fields: ['nome', 'codigo_barras', 'valor_venda', 'quantidade'] });

        res.json(produto)
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

const apagar_produto = async (req, res) => {
    try {
        const produto = await db.Produto.findByPk(req.params.produto_id);
        produto.destroy();
        res.json({
            status: 200,
            message: 'Produto excluido com sucesso'
        })
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

module.exports = {
    cadastrar_produto,
    consultar_produtos,
    consultar_produto_especifico,
    editar_produto,
    apagar_produto
}