module.exports = (sequelize, dataTypes) => {

    const alias = "genres"

    const cols = {

        id : {
            type: dataTypes.INTEGER,
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

    Genre.associate = (models) =>{
        Genre.hasMany(models.movies,{
            as : "movies",
            foreignKey : "genreId"
        }) 
    }
    return Genre;
}