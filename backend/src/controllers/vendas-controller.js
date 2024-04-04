const { where } = require('sequelize')
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
                model: db.Itens_venda,
                include: {
                    model: db.Produto,
                }
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

const consultar_numero = async (req, res) => {
    try {
        const numero = await db.Config.findOne({
            attributes: ['numero_venda']
        })

        const numero_venda = numero.numero_venda + 1

        await db.Config.update({ numero_venda }, { where: { id: 1 } })
        // console.log(novo_numero)

        // await db.Config.update({numero_venda:novo_numero})

        res.json(numero)
    } catch (error) {
        res.json(error.message)
    }
}

const atualizar_valor_venda = async (venda_id) => {
    const valor_total = await db.Itens_venda.sum('valor_total_item', { where: { venda_id: venda_id } })
    const venda = await db.Venda.update({ valor_total }, { where: { id: venda_id } })
    console.log(venda)
    console.log(`Valor da venda ${venda_id} atualizado para ${valor_total}`)
}

const cancelar_item = async (req, res) => {
    const item_cancelado = await db.Itens_venda.destroy({ where: { id: req.body.id } })
    atualizar_valor_venda(req.params.venda_id)
    res.json(item_cancelado)
}

const atualizar_status_venda = async (req, res) => {
    const status = req.body.status
    await db.Venda.update({ status }, { where: { id: req.params.venda_id } })
    res.json(status)
}

const concluir_venda = async (req, res) => {
    try {
        const date = new Date()
        const data_conclusao = date.toISOString()

        await db.Venda.update({ status: 1, data_emissao: data_conclusao }, { where: { id: req.params.venda_id } })
        await baixar_quantidade(req.params.venda_id)

    } catch (error) {
        res.json(error.message)
    }
}

const cancelar_venda = async (req, res) => {
    try {
        await db.Venda.destroy({ where: { id: req.params.venda_id } })

        const itens = await voltar_quantidade(req.params.venda_id)
        res.json(itens)
    } catch (error) {
        res.json(error.message)
    }
}

const baixar_quantidade = async (venda_id) => {
    try {
        const lista_itens = await db.Itens_venda.findAll({ where: { venda_id: venda_id } })

        lista_itens.forEach(async item => {
            const quantidade_atual = await db.Produto.findOne({
                attributes: ['quantidade'],
                where: {
                    id: item.produto_id
                }
            })
            const nova_quantidade = Number(quantidade_atual.quantidade) - Number(item.quantidade)
            await db.Produto.update({ quantidade: nova_quantidade }, { where: { id: item.produto_id } })
        })
        return lista_itens

    } catch (error) {
        res.json(error.message)
    }
}

const voltar_quantidade = async (venda_id) => {
    try {
        const lista_itens = await db.Itens_venda.findAll({ where: { venda_id: venda_id } })

        lista_itens.forEach(async item => {
            const quantidade_atual = await db.Produto.findOne({
                attributes: ['quantidade'],
                where: {
                    id: item.produto_id
                }
            })
            const nova_quantidade = Number(quantidade_atual.quantidade) + Number(item.quantidade)
            await db.Produto.update({ quantidade: nova_quantidade }, { where: { id: item.produto_id } })
        })
        return lista_itens

    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {
    nova_venda,
    adicionar_item,
    consultar_vendas,
    consultar_venda_especifica,
    cancelar_item,
    atualizar_status_venda,
    consultar_numero,
    concluir_venda,
    cancelar_venda
}