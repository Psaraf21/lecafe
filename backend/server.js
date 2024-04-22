
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');

// Import your models and controllers
const Booking = require('../booking');
const User = require('../User');
const { submitForm, viewBookings } = require('../bookingController');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Set static path for serving static files like HTML, CSS, JS, etc.
const static_path = path.join(__dirname, '../public');
app.use(express.static(static_path));

// Set view engine if you're using templating engine like EJS, Pug, etc.
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  // res.render('index');
  res.render('index');
});

app.post('/submit-form', submitForm);

app.get('/thank-you', (req, res) => {
  res.send('Thank you for submitting the form!');
});

app.get('/view-bookings', viewBookings);

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    return res.redirect('/login.html?error=username_email_taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.redirect('/index.html?success=registered_successful');
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
});

app.post('/login', async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.redirect('/index.html?success=login_successful');
    } else {
      return res.redirect('/login.html?error=invalid_credentials');
    }
  } catch (error) {
    res.status(500).send('Error during login.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
