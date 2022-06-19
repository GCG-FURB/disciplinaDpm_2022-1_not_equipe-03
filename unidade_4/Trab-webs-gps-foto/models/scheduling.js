'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scheduling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  scheduling.init({
    visitReason: DataTypes.STRING,
    visitType: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    lobby: DataTypes.STRING,
    visited: DataTypes.STRING,
    visit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'scheduling',
  });
  return scheduling;
};