require("dotenv").config({path: '../../.env'});
const mongoose = require('mongoose');
const User = require('./models/user.js')

const uri = `mongodb+srv://Kchen:${process.env.DB_PASSWORD}@cluster0.hnjjls3.mongodb.net/Users?retryWrites=true&w=majority`

const db = mongoose.connect(uri,{ useNewUrlParser: true });

db
  .then(db => console.log(`Connected to: MondoDB}`))
  .catch(err => {
    console.log(`There was a problem connecting to mongo at: mongoDB`);
    console.log(err);
  });

module.exports = db;

// User.create({
//   firstName: "Matt",
//   lastName: "Butler",
//   email: "mbutler@gmail.com",
//   password:"password"
// })