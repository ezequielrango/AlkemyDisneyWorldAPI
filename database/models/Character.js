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
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        image: {
            type : dataTypes.STRING(255),
            allowNull: false
        }

    }

    const config = {
        timestamps: true,
        tableName: "characters",
    }

    const Character = sequelize.define(alias,cols,config);

    Character.associate = (models) =>{                //apply sequelize method

        Character.belongsToMany(models.movies,{
            as : "movies",
            through : "movieCharacter",    //Pivot table
            foreignKey : "characterId",   // id que hace referencia a la tabla actual
            otherKey : "movieId"         //FK Pivot
        })
    }
    
    return Character
}