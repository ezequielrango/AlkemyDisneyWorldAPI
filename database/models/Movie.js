module.exports = (sequelize,dataTypes) => {

   // Data for model - 1 parameter
    
    const alias = "movies";

   // Data for model - 2 parameter
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
     // Data for model - 3 parameter

    const config = {
        timestamps : true,
        tableName: "movies"
    }

    // Define model with 3 parameters
    const Movie = sequelize.define(alias,cols,config);


    //Associations with other models

    Movie.associate = (models) =>{                //apply sequelize method

        Movie.belongsTo(models.genres,{         // A movie belongs to a genre 1 to 1
            as : "genre",                      //association name
            foreignKey : "genreId",           // current model genreId value 
        })

        Movie.belongsToMany(models.characters,{
            as : "characters",
            through : "movieCharacter",      //Pivot table
            foreignKey : "movieId" ,        // id que hace referencia a la tabla actual
            otherKey : "characterId"       //FK Pivot
        })
    }
    return Movie;
}
