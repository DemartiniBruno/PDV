const db = require('../db/db-create')

const nova_venda = async (req, res) => {
    try {
        if (await db.Venda.findOne({
            where: {
                numero_venda: req.body.numero_venda
            }
        })) {
            throw new Error('Numero já utilizado')
        } else {
            const venda = await db.Venda.create(req.body)
            res.json(venda)
        }
    } catch (error) {
        res.json(error.message)
    }
}

const adicionar_item = async (req, res) => {
    try {
        const { quantidade, valor_unitario, valor_total_item, produto_id } = req.body
        const venda_id = req.params.venda_id

        const novo_item = await db.Itens_venda.create({ quantidade, valor_unitario, valor_total_item, produto_id, venda_id })
        
        atualizar_valor_venda(venda_id)

        res.json(novo_item)

    } catch (error) {
        res.json(error.message)
    }
}

const consultar_vendas = async (req, res) => {
    try {
        const vendas = await db.Venda.findAll()
        res.json(vendas)
    } catch (error) {
        res.json(error.message)
    }
}

const consultar_venda_especifica = async (req, res) => {
    try {
        const venda = await db.Venda.findOne({
            include: {
                model: db.Itens_venda
            },
            where: {
                id: req.params.venda_id
            }
        })

        res.json(venda)
    } catch (error) {
        res.json(error.message)
    }
}

const atualizar_valor_venda = async (venda_id) => {
    const valor_total = await db.Itens_venda.sum('valor_total_item', {where:{ venda_id: venda_id}})
    const venda = await db.Venda.update({valor_total},{where:{ id: venda_id }})
    console.log(venda)
    console.log(`Valor da venda ${venda_id} atualizado para ${valor_total}`)
}

module.exports = {
    nova_venda,
    adicionar_item,
    consultar_vendas,
    consultar_venda_especifica
}