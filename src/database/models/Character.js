module.exports = (sequelize,dataTypes) => {


    const alias = "characters";

    const cols = {

        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        name: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        age: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        weight: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        history: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        image: {
            type : dataTypes.STRING(255),
            allowNull: false
        }

    }



}