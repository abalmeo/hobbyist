const express = require('express');
const router = express.Router();

//GET api/posts/test
//Tests post route
//Public route
router.get('/test', (req, res) => res.json({msg: "Profile Works"})); 

module.exports = router; 