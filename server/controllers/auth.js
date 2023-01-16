// const { hashPassword, comparePassword } = require("../helpers/auth");
require("dotenv").config({path: '../.env'});
const jwt = require ("jsonwebtoken");
const User = require("../db/models/user.js")

exports.signUp = async  (req,res) => {
  //Deconstruct the request //
  const {firstName, lastName, email, password} = req.body;
  // Validation //
  if(!firstName || !lastName || !email || !password){
    return res.json({
      error: "All fields are required "
    })
  }
  // Search for existing user //
  const user = await User.findOne({email}).exec();
  // Handle user already exists //
  if(user){
    return res.json({
      error: "Email is taken"
    })
  }
  // Create a new user if user not found //
  const newUser = await User.create({
    firstName:firstName,
    lastName: lastName,
    email: email,
    password: password
  })
  //Create JWT //
  const token = jwt.sign({_id: newUser._id}, process.env.JWT, {expiresIn: "7d"});

  console.log({
    token,
    user: newUser
  })
  return res.json({
    token,
    user: newUser
  })
}

exports.signIn = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if(!user){
    return res.json({
      error: "No User Found"
    })
  }
  const compare = user.password === password ? true : false
  console.log(`Value of compare is: ${compare}`)
  if(!compare){
    return res.json({
      error: "Wrong Password"
    })
  }
  const token = jwt.sign({_id: user._id}, process.env.JWT, {expiresIn: "7d"});
  user.password = undefined;
  user.secret = undefined;
  return res.json({
    token,
    user
  })
}

exports.getUser = async (req, res) => {

  // console.log('Value of id' + id )
  let user = await User.findOne({_id: req.query.id})

  if(user){
    console.log(user)
    return res.json(user)
  } else {
    return res.json({
      error: "User not found"
    })
  }
}

exports.addDetails = async (req, res) => {
  const {carbRatio, isf, target} = req.body;

  const user = await User.findOne({ _id: req.query.id})

  if (!user) {
    console.log('User not found');
    return;
  }
  user.initial.push({
    carbRatio: carbRatio,
    isf: isf,
    target: target
  })
  let updatedUser = await user.save();
  return res.json({
    token: "",
    user: updatedUser
  })
}

exports.postLog = async (req, res) => {
  const {date, reading} = req.body;
  const user = await User.findOne({ _id: req.query.id})
  if (!user) {
    return res.json({
      error: "Could not save calculation"
    })
  }
  console.log(user)
  user.entries.push({
    date: date,
    reading: reading,
  })
  let updatedUser = await user.save();
  console.log(updatedUser)
  return res.json({
    token: "",
    user: updatedUser
  })
}