const express = require("express");
const router = express.Router();

const {signIn, signUp, getUser, addDetails, postLog} = require("../controllers/auth.js")


router.get('/user', getUser);
router.post('/details', addDetails)
router.post("/signup", signUp);
router.post('/log', postLog)
router.post('/signin', signIn)



module.exports = router;