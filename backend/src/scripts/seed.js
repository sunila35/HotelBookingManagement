const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Hotel = require('../api/models/Hotel');
const Booking = require('../api/models/Booking');
const Payment = require('../api/models/Payment');
const { flushAll } = require('../config/redis');
const fs = require('fs');
const path = require('path');

connectDB();

const seedData = async () => {
  try {
    await Hotel.deleteMany();
    await Booking.deleteMany();
    await Payment.deleteMany();
    await flushAll();

    console.log('Data Cleared...');

    const filePath = path.join(__dirname, '..', 'data', 'hotels.json');
    const hotels = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    await Hotel.insertMany(hotels);

    console.log('Hotels and Rooms Created...');
    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

seedData();