'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Issues', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING
      },
      projectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'id'
        }
      },
      fixedTime: {
        type: Sequelize.INTEGER
      },
      createdTime: {
        type: Sequelize.DATE
      },
      closedTime: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Issues');
  }
};
