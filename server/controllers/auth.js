// const { hashPassword, comparePassword } = require("../helpers/auth");
require("dotenv").config({path: '../.env'});
const jwt = require ("jsonwebtoken");
// const {nanoid} = require("nanoid");
const User = require("../db/models/user.js")

// exports.signup = async (req, res) => {
//   const {firstName, lastName, email, password,sugarReading} = req.body

//   const user = await User.findOne({email})

//   if(user) {
//     return res.json({
//       error: "Email is taken"
//     })
//   }
//   return User.create({
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password:password
//   }).then((newUserData) => {
//     res.status(201).send("User successfully created")
//   }).catch((err) => {
//     res.status(501).send(err)
//   })

// }

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

exports.getUser = (req, res) => {
  console.log('These ar' + JSON.stringify(req.params))
  // console.log('Value of id' + id )
  return User.findOne({_id: req.query.id})
    .then((data) => {
      console.log(data)
      return res.json(data)
    }).catch((err) => {
      console.log(err)
    })
  res.send('POST request to the homepage')
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

// exports.signin = async (req, res) => {
//   // console.log(req.body);
//   try {
//     const { email, password } = req.body;
//     // check if our db has user with that email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({
//         error: "No user found",
//       });
//     }
//     // check password
//     const match = await comparePassword(password, user.password);
//       if (!match) {
//         return res.json({
//           error: "Wrong password",
//       });
//     }
//     // create signed token
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     user.password = undefined;
//     user.secret = undefined;
//     res.json({
//       token,
//       user,
//     });
//   } catch (err) {
//       console.log(err);
//       return res.status(400).send("Error. Try again.");
//   }
// };