module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Products', [
        {
          name: 'Product 1',
          description: 'Description of Product 1',
          price: 19.99,
          quantity: 100,
          available: true,
          size: 'medium',
          sku: 'SKU123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Product 2',
          description: 'Description of Product 2',
          price: 29.99,
          quantity: 50,
          available: true,
          size: 'large',
          sku: 'SKU456',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Products', null, {});
    },
  };
  