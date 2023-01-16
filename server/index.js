// DOTENV setup //
require("dotenv").config({path: '../.env'});

//Express setup //
const express = require("express");
const cors = require("cors");
const app=express();
const morgan = require("morgan")
const db = require('./db')
// Express Router Setup //
const routes = require("./routes/auth.js")

//PORT setup //
const PORT = process.env.PORT || 8000

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions));

// Mongo database setup //
// const mongoose = require("mongoose")
const User = require("./db/models/user.js")

// Middleware Setup //
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(morgan("dev"))

// Routes //
app.get('/user', routes)
app.post('/details', routes)
app.post('/signup', routes)
app.post('/signin', routes)
app.post('/log', routes)




// Listening on port //
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))