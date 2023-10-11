const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
require('dotenv').config();

const { UserModel } = require('./user/user.model');
const ProductModel  = require('./product/product.model')

const mongoDBURL = process.env.MONGO_DB_URL;

async function seedData() {
  try {
    await mongoose.connect(mongoDBURL, { useNewUrlParser: true });
    const hashedpassword = await bcrypt.hash('password123', 10);
    const userData = [
      {
        "username": "admin_user",
        "password": hashedpassword,
        "email": "admin@gmail.com",
        "role": "admin",
        "phoneNumber": "090YYYXXXXX"
      }
    ];

    const ProductsData = [
      {
        name: 'Apple iPhone 13',
        description: 'The latest iPhone with advanced features.',
        price: 799.99,
        quantity: 50,
        size: 'medium',
        categories: [{ name: 'Electronics' }],
        sku: 'IP13-001',
      },
      {
        name: 'Samsung Galaxy S21',
        description: 'Powerful Android smartphone with a stunning display.',
        price: 749.99,
        quantity: 30,
        size: 'medium',
        categories: [{ name: 'Electronics' }],
        sku: 'SGS21-002',
      },
      {
        name: 'Sony 55-inch 4K Smart TV',
        description: 'High-definition television with smart features.',
        price: 599.99,
        quantity: 20,
        size: 'large',
        categories: [{ name: 'Electronics' }],
        sku: 'TV55-003',
      },
      {
        name: 'Nike Air Zoom Pegasus 38',
        description: 'Running shoes for ultimate comfort and performance.',
        price: 129.99,
        quantity: 100,
        size: 'medium',
        categories: [{ name: 'Footwear' }],
        sku: 'NIKE38-004',
      },
      {
        name: 'Apple MacBook Pro 16-inch',
        description: 'Powerful laptop for professionals and creatives.',
        price: 2199.99,
        quantity: 10,
        size: 'medium',
        categories: [{ name: 'Electronics' }],
        sku: 'MBP16-005',
      },
      {
        name: 'Bose QuietComfort 35 II',
        description: 'Wireless noise-canceling headphones for immersive sound.',
        price: 299.99,
        quantity: 40,
        size: 'medium',
        categories: [{ name: 'Electronics' }],
        sku: 'QC35-006',
      },
      {
        name: 'KitchenAid Stand Mixer',
        description: 'Versatile kitchen appliance for baking and cooking.',
        price: 349.99,
        quantity: 15,
        size: 'medium',
        categories: [{ name: 'Kitchen' }],
        sku: 'KSM-007',
      },
      {
        name: 'Canon EOS 5D Mark IV',
        description: 'Professional DSLR camera for photography and videography.',
        price: 2999.99,
        quantity: 5,
        size: 'medium',
        categories: [{ name: 'Electronics' }],
        sku: '5DM4-008',
      },
      {
        name: 'Fitbit Versa 3',
        description: 'Fitness smartwatch to track your health and workouts.',
        price: 199.99,
        quantity: 25,
        size: 'small',
        categories: [{ name: 'Fitness' }],
        sku: 'FV3-009',
      },
      {
        name: 'Le Creuset Dutch Oven',
        description: 'High-quality cast iron pot for cooking delicious meals.',
        price: 349.99,
        quantity: 12,
        size: 'large',
        categories: [{ name: 'Kitchen' }],
        sku: 'LCDO-010',
      },
    ];
    
    
    // Seed user data into the collection
    await UserModel.insertMany(userData);

    await ProductModel.insertMany(ProductsData)

    console.log('Data seeded successfully.');
  } catch (err) {
    console.error('Error seeding data into userModel:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
