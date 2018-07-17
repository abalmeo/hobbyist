const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validateProfileInput = require('../../validation/profile')

//load profile model
const Profile = require('../../models/Profile');
//load  profile
const User = require('../../models/User');


//GET api/posts/test
//Tests post route
//Public route
router.get('/test', (req, res) => res.json({msg: "Profile Works"})); 

//GET api/profile
//Get current users profile
//Private route
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {};
  
      Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
          if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
          }
          res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    }
  );

//POST api/profile
//Create or Edit user profile
//Private route
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

            //Check Validation
            if(!isValid) {
                //return errors 
                return res.status(400).json(errors); 

            }
        
            console.log(req.body); 
     // Get inputs
     const profileInputs = {} ;
     profileInputs.user = req.user.id; 
     if(req.body.handle) profileInputs.handle = req.body.handle;
     if(req.body.location) profileInputs.location = req.body.location;
     if(req.body.bio) profileInputs.bio = req.body.bio;
     //The next tnree inputs need to separated to be put into an array.
        if (typeof req.body.skills !== 'undefined') {
            profileInputs.skills = req.body.skills.split(',');
        }
        if (typeof req.body.equipment !== 'undefined') {
            profileInputs.equipment = req.body.equipment.split(',');
        }

        if (typeof req.body.interests !== 'undefined') {
            profileInputs.interests = req.body.interests.split(',');
        }

        Profile.findOne({ user: req.user.id })
        .then(profile => {

            //make sure profile exists
            if(profile) {
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileInputs },
                    { new: true }
                )
                .then(profile => res.json(profile));
            } else {

                //Create
                //Check if handle exists
                Profile.findOne({ handle: profileInputs.handle })
                .then(profile => {
                    if(profile) {
                        errors.handle = 'Thant handle already exists';
                        res.status(400).json(errors); 
                    }

                    //save profile
                    new Profile(profileInputs).save()
                    .then(profile => res.json(profile));
                })
            }
        })
    }
  );

module.exports = router; 