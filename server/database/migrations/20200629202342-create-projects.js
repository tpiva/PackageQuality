'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('Projects', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      totalIssues: {
        type: Sequelize.INTEGER,
        default: 0
      },
      avgTimeIssue: {
        type: Sequelize.INTEGER,
        default: 0
      },
      stdTimeIssue: {
        type: Sequelize.INTEGER,
        default: 0
      },
      contributors: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      stars: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Projects');
  }
};
