module.exports = (sequelize,dataTypes) => {

    const alias = "movies";

    const cols ={

        id: {
            type: dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: dataTypes.STRING(255),
            allowNull: false,
        },
        score: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        release : {
            type : dataTypes.DATE,
            allowNull : false,
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        genreId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
        
    }

    const config = {
        timestamps : true,
        tableName: "movies"
    }

    const Movie = sequelize.define(alias,cols,config);

    return Movie;
}
