'use strict';

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Projects', [{
      id: 24195339,
      name: 'angular',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 10270250,
      name: 'react',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 11730342,
      name: 'vue',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}); 
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Projects', [
      {
        id: 24195339
      },
      {
        id: 10270250
      },
      {
        id: 11730342
      }
    ], {});
  }
};
