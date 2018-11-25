const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const passport = require('passport'); 
const path =require('path'); 
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

//Serve static assets if in production

if(process.env.NODE_ENV ==='production'){
    //Set static folder to client build
    app.use(express.satic('client/build')); 
    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html')); 
    })
}



const port = process.env.PORT || 8000;

//Start Server
app.listen(port, () => console.log(`Serving running on port ${port}`));