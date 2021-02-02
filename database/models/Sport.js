const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class Sport extends Model {}

Sport.init({

    sport_id: {
        primaryKey: true,
        type: DataTypes.INTEGER(11),
    },
    name: DataTypes.STRING(50),
    primary_color: DataTypes.CHAR(6),
    secondary_color: DataTypes.CHAR(6),

}, 
{ 
  sequelize: sequelize, 
  modelName: 'Sport', 
  timestamps: false,
});

module.exports = Sport;