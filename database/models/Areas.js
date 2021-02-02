const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class Areas extends Model {}

Areas.init({

    area_uuid: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4
    },
    adress: DataTypes.STRING,
    activated: DataTypes.BOOLEAN,
    indoor: DataTypes.BOOLEAN,
    cover: DataTypes.BOOLEAN,
    post: DataTypes.BOOLEAN,
    draw_line: DataTypes.BOOLEAN,
    net: DataTypes.BOOLEAN,
    water_point: DataTypes.BOOLEAN,
    latitude: DataTypes.DECIMAL(9, 6),
    longitude: DataTypes.DECIMAL(9, 6),

}, 
{ 
  sequelize: sequelize, 
  modelName: 'Areas', 
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Areas;