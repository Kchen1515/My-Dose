// const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require ("jsonwebtoken");
// const {nanoid} = require("nanoid");
const User = require("../db/models/user.js")

// exports.signup = async (req, res) => {
//   const {firstName, lastName, email, password,sugarReading} = req.body

//   const userExists = await User.findOne({email})

//   if(userExists) {
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
  const {firstName, lastName, email, password} = req.body;
  const userExists = await User.findOne({email}).exec();

  if(userExists){
    return res.json({
      error: "Email is taken"
    })
  }
  return User.create({
    firstName:firstName,
    lastName: lastName,
    email: email,
    password: password
  }).then((newUser) => {
    res.send(newUser.data)
  })
}

exports.signIn = async (req, res) => {
  const {email, password} = req.body;
  const userExists = await User.findOne({email});

  if(!userExists){
    return res.json({
      error: "No User Found"
    })
  }
  if(userExists && userExists.password === password){
    return res.json(userExists)
  } else {
    return res.json({
      error: "Wrong password"
    })
  }
}

exports.getUsers = (req, res) => {
  return User.find({})
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
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