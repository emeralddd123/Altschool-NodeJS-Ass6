module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Apple AirPods Pro',
        description: 'Wireless noise-canceling earbuds by Apple.',
        price: 249.99,
        quantity: 100,
        available: true,
        size: 'medium',
        sku: 'AP-APPRO-001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Samsung 55-inch 4K QLED TV',
        description: 'High-quality 4K television with quantum dot technology.',
        price: 799.99,
        quantity: 50,
        available: true,
        size: 'large',
        sku: 'SG-4KTV-002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Amazon Echo Dot (3rd Gen)',
        description: 'Smart speaker with Alexa voice control.',
        price: 39.99,
        quantity: 200,
        available: true,
        size: 'small',
        sku: 'AE-ECHO-003',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dyson V11 Absolute Pro',
        description: 'Cordless vacuum cleaner with powerful suction.',
        price: 599.99,
        quantity: 30,
        available: true,
        size: 'medium',
        sku: 'DV-V11-004',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sony PlayStation 5',
        description: 'Next-gen gaming console for immersive gaming experiences.',
        price: 499.99,
        quantity: 40,
        available: true,
        size: 'medium',
        sku: 'SPS5-005',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Keurig K-Elite Coffee Maker',
        description: 'Single-serve coffee maker for brewing premium beverages.',
        price: 129.99,
        quantity: 25,
        available: true,
        size: 'medium',
        sku: 'KK-COFF-006',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fitbit Charge 4 Fitness Tracker',
        description: 'Advanced fitness tracker with built-in GPS.',
        price: 149.99,
        quantity: 80,
        available: true,
        size: 'small',
        sku: 'FF-CHRG4-007',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bose SoundLink Revolve+ Bluetooth Speaker',
        description: 'Portable speaker with 360-degree sound.',
        price: 299.99,
        quantity: 35,
        available: true,
        size: 'medium',
        sku: 'BS-SLREV-008',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'KitchenAid Artisan Stand Mixer',
        description: 'Iconic stand mixer for baking and cooking enthusiasts.',
        price: 379.99,
        quantity: 15,
        available: true,
        size: 'medium',
        sku: 'KA-ARTISAN-009',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nikon D850 DSLR Camera',
        description: 'Professional-grade camera for photography and videography.',
        price: 2799.99,
        quantity: 8,
        available: true,
        size: 'medium',
        sku: 'NK-D850-010',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
