'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_issues: {
        type: Sequelize.INTEGER
      },
      avg_issues: {
        type: Sequelize.INTEGER
      },
      std_issues: {
        type: Sequelize.INTEGER
      },
      contributors: {
        type: Sequelize.INTEGER
      },
      stars: {
        type: Sequelize.STRING
      }
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projects');
  }
};
