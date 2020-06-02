const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

const router = express.Router();
require('dotenv').config();


router.get('/', async (request, response) => {
    response.send('This is the admin page');
});


module.exports = router;