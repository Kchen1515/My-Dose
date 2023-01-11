const express = require("express");
const router = express.Router();

const {signIn, signUp, getUsers} = require("../controllers/auth.js")


router.get('/users', getUsers);
router.post("/signup", signUp);

router.post('/signin', signIn)



module.exports = router;