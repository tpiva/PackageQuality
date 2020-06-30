'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('issues', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING
      },
      projectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id'
        }
      },
      created: {
        type: Sequelize.DATE
      },
      updated: {
        type: Sequelize.DATE
      }
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('issues');
  }
};
