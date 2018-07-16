const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const passport = require('passport'); 

const users = require('./routes/api/users');
const profile = require('./routes/api/profile'); 

const app = express();
//bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 


//db config
const db = require('./config/keys').mongoURI; 

//Connect to MongoDb
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

//Passport middleware 
app.use(passport.initialize())

//Passport Config JWT Strategy 
require('./config/passport')(passport); 


//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);

const port = process.env.PORT || 8000;

//Start Server
app.listen(port, () => console.log(`Serving running on port ${port}`));