'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'lobbies',
        'latitude',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'lobbies',
        'longitude',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },
  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('lobbies', 'latitude'),
      queryInterface.removeColumn('lobbies', 'longitude')
    ]);
  }
};