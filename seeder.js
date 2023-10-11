const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
require('dotenv').config();

const { UserModel } = require('./user/user.model');

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

    // Seed data into the collection
    await UserModel.insertMany(userData);

    console.log('Data seeded successfully.');
  } catch (err) {
    console.error('Error seeding data into userModel:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
