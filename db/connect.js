const mongoose = require('mongoose');

//set strictQuery true globally to supress the warning
mongoose.set('strictQuery', true); //add this line of code to get rid of the deprecation errors

//set the flag to false if you want to override the current strictQuery behavior and prepare for the new release
// mongoose.set('strictQuery', false);

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
