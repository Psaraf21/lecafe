const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  message: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
