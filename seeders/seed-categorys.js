module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Categories', [
        {
          name: 'Category 1',
          description: 'Description of Category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Category 2',
          description: 'Description of Category 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Categories', null, {});
    },
  };
