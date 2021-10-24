

module.exports = (sequelize,dataTypes) =>{

    const alias = 'movieCharacter';

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        movieId : {
            type : dataTypes.INTEGER,
            allowNull : false
        },
        characterId : {
            type : dataTypes.INTEGER,
            allowNull : false
        },


    };

    const config = {
        timestamps : false,
        tableName : 'movieCharacter'
    };

    const MovieCharacter= sequelize.define(alias,cols,config);

    return MovieCharacter;
}