const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     host: 'localhost',
//     storage: 'postgres',
//     username: 'postgres',
//     password: 'admin'
// });
const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
  });

const Produto = sequelize.define('produto', {
    nome: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    codigo_barras: {
        type: DataTypes.INTEGER(13),
        defaultValue: null

    },
    valor_venda: {
        type: DataTypes.DECIMAL(6,2),
        defaultValue: 0
    },
    quantidade: {
        type: DataTypes.DECIMAL(6,2),
        defaultValue: 0
    }
}, { sequelize, paranoid: true });

const Venda = sequelize.define('venda',{
    numero_venda: {
        type: DataTypes.INTEGER(6),
        allowNull: false
    },
    valor_total: {
        type: DataTypes.DECIMAL(6,2),
        defaultValue: 0
        // allowNull: false verificar a necessidade
    },
    status: {
        type: DataTypes.SMALLINT(1),
        defaultValue: 0
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

const Config = sequelize.define('Config',{
    numero_venda: {
        type: DataTypes.INTEGER(6),
        defaultValue: 1
    },
}, { sequelize, paranoid: true});

module.exports = {
    sequelize,
    Produto,
    Venda,
    Itens_venda,
    Config
};