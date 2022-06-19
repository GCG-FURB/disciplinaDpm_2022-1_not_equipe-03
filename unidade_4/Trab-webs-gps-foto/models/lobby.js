'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lobby.init({
    name: DataTypes.STRING,
    activeLobby: DataTypes.BOOLEAN,
    physicalLocation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lobby',
  });
  return lobby;
};