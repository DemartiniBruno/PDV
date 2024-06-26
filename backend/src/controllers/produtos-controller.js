const db = require('../db/db-create')

const cadastrar_produto = async (req, res) => {
    try {

        if (!req.body.nome || req.body.nome == '') {
            throw new Error('O nome do produto é obrigatório')
        }

        else if (req.body.nome.length < 3) {
            throw new Error('O nome do produto deve ter no mínimo 3 caracteres')
        }

        else if (req.body.codigo_barras) {
            if (await db.Produto.findOne({
                where: {
                    codigo_barras: req.body.codigo_barras
                }
            })) {
                throw new Error('Código de barras já utilizado')
            } else {
                const produto = await db.Produto.create(req.body)
                res.json({
                    status: 200,
                    message: 'Produto cadastrado com sucesso'
                })
            }
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
        const produto = await localizaProduto(req.params.produto_id);
        console.log(produto)
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
        const { nome, codigo_barras, valor_venda, quantidade } = req.body
        const produto = await localizaProduto(req.params.produto_id);

        if (!produto) {
            throw new Error('Produto não encontrado')
        } else {
            if (req.body.codigo_barras) {
                const produto_cadastrado = await db.Produto.findOne({
                    where: {
                        codigo_barras: req.body.codigo_barras
                    }
                })

                console.log(produto_cadastrado)

                if (produto_cadastrado) {
                    if(produto_cadastrado.id == req.params.produto_id){
                        const produto_alterado = await db.Produto.update({ nome, codigo_barras, valor_venda, quantidade }, { where: { id: req.params.produto_id } })
                        // res.json(produto_alterado)
                        res.json({
                            status: 200,
                            message: 'Produto alterado com sucesso'
                        })
                    } else {
                        throw new Error('Código de barras já utilizado')
                    }

                }
                else {
                    const produto_alterado = await db.Produto.update({ nome, codigo_barras, valor_venda, quantidade }, { where: { id: req.params.produto_id } })
                    // res.json(produto_alterado)
                    res.json({
                        status: 200,
                        message: 'Produto alterado com sucesso'
                    })
                }
            } else {
                const produto_alterado = await db.Produto.update({ nome, codigo_barras, valor_venda, quantidade }, { where: { id: req.params.produto_id } })
                res.json(produto_alterado)
            }
        }

    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }

}

const apagar_produto = async (req, res) => {
    try {
        const produto = await localizaProduto(req.params.produto_id);
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

const localizaProduto = async (id) => {
    return produto = await db.Produto.findByPk(id);
}

module.exports = {
    cadastrar_produto,
    consultar_produtos,
    consultar_produto_especifico,
    editar_produto,
    apagar_produto
}