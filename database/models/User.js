const { sequelize } = require(".")

module.exports = (Sequelize, Datatypes) => {

const alias = 'users',

const cols = {

    id : {
        type : Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement : true,
        allowNull : false,
    },

    name : {
        type: Datatypes.STRING(255),
        allowNull : false, 
    },

    email: {
        type: Datatypes.STRING(255),
        allowNull: false,
    },

    password: {
        type: Datatypes.STRING(255),
        allowNull: false,
    }
},

const config = {
    timestamps = true,
    tableName = 'users',

}

 const User = sequelize.define(alias,cols,config)


}