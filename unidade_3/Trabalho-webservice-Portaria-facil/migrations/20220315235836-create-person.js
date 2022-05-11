'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('people', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      street: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      number: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      district: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      province: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('people');
  }
};