module.exports = (sequelize, DataTypes) => {

    const alias = "genres"

    const cols = {

        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name : {
            type : dataTypes.STRING,
            allowNull : false
        },
        image : {
            type : dataTypes.STRING,
            allowNull : false
        }
    }

    const config = {
        timestamps : false,
        tableName : 'genres'
    }

    const Genre = sequelize.define(alias,cols,config);

    return Genre;
}