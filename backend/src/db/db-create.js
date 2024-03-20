const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    storage: 'postgres',
    username: 'postgres',
    password: 'admin'
});

const Produto = sequelize.define('produto', {
    nome: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    codigo_barras: {
        type: DataTypes.INTEGER(13),
    },
    valor_venda: {
        type: DataTypes.DECIMAL(6,2),
        default: 0
    },
    quantidade: {
        type: DataTypes.DECIMAL(6,2),
        default: 0
    }
}, { sequelize, paranoid: true });

const Venda = sequelize.define('venda',{
    valor_total: {
        type: DataTypes.DECIMAL(6,2),
        // allowNull: false verificar a necessidade
    },
    processada: {
        type: DataTypes.SMALLINT(1),
        default: 0
    },
    data_emissao:{
        type: DataTypes.DATE
    }

}, { sequelize, paranoid: true});

const Itens_venda = sequelize.define('itens_venda',{
    quantidade:{
        type: DataTypes.DECIMAL(6,2),
        allowNull: false
    },
    valor_unitario:{
        type: DataTypes.DECIMAL(6,2),
        allowNull: false
    },
    valor_total_item:{
        type: DataTypes.DECIMAL(6,2),
    }
}, { sequelize, paranoid: true});

Produto.hasMany(Itens_venda,{foreignKey: 'produto_id'});
Itens_venda.belongsTo(Produto, {foreignKey: 'produto_id'});
Venda.hasMany(Itens_venda,{foreignKey:'venda_id'});
Itens_venda.belongsTo(Venda,{foreignKey:'venda_id'});


module.exports = {
    sequelize,
    Produto,
    Venda
};