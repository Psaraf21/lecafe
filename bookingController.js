const Booking = require('./booking');
const nodemailer = require('nodemailer');

const submitForm = async (req, res) => {
  const { name, email, number, message } = req.body;

  const newBooking = new Booking({
    name,
    email,
    number,
    message,
  });

  try {
    await newBooking.save();
    // res.send('Booking successful!');
    res.redirect('index.html');
  } catch (error) {
    res.status(500).send('Error saving booking to the database.');
    res.redirect('index.html');
  }
};


// try {
//   await newBooking.save();

//   // Send confirmation email
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: 'd52841069@gmail.com',
//       pass: 'danny232002',
//     },
//   });

//   const mailOptions = {
//     from: 'd52841069@gmail.com',
//     to: email,
//     subject: 'Table Booking Confirmation',
//     text: 'Your table has been successfully booked. Thank you for choosing our restaurant!',
//   };

//   await transporter.sendMail(mailOptions);

  // await twilioClient.messages.create({
  //   body: 'Your table has been successfully booked. Thank you for choosing our restaurant!',
  //   to: `+${number}`, 
  //   from: 'your-twilio-phone-number',
  // });
  // Respond to the client
  // res.send('Booking successful! Confirmation email sent.');
 
// } catch (error) {
//   console.error(error);
  // res.status(500).send('Error saving booking to the database or sending confirmation email.');
//   res.redirect('/login.html');
// }
// };







const viewBookings = async (req, res) => {
  try {
    // Fetch all bookings from the database
    const bookings = await Booking.find();
    // Send a JSON response with the fetched data
    res.json({ bookings });
  } catch (error) {
    res.status(500).send('Error fetching bookings from the database.');
  }
};
module.exports = {
  submitForm,
  viewBookings,
};
