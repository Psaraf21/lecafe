const mongoose = require('mongoose');
uri="mongodb+srv://pulkitsaraf20:abcdefgh@cluster0.xjpjwzh.mongodb.net/"
const connectDB = async () => {
  try {
      await mongoose.connect(uri, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          
      });
      console.log(("connect"));
  } catch (err) {
      console.error(err);
  }   
}
connectDB()