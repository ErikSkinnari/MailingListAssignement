const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

const router = express.Router();
require('dotenv').config()

const connectionString = process.env.CONNECTION_STRING;

router.post('/login', async (request, response) => {
    var email = request.body.email;
    var password = request.body.password;

    const users = await loadUsers();
    var userToCheck = await users.findOne({ email: email });

    const passwordEnteredByUser = password;
    const hash = userToCheck.password;

    bcrypt.compare(passwordEnteredByUser, hash, function (err, isMatch) {
        if (err) {
            throw err
        } else if (!isMatch) {
            console.log("Password doesn't match!");
            response.status(500).send("Password doesn't match!"); // TODO What should this mean?
        } else {
            console.log("Password matches!");
            response.status(201).send("Password matches!"); // TODO How to set user as logged in?
        }
    });
});


router.post('/register', async (request, response) => {

    var username = request.body.username;
    var email = request.body.email;
    var password = request.body.password;
    var password2 = request.body.password2;


    console.log(request.body);

    let existingUsers = await loadUsers();

    // Check id user entered same password.
    if (password !== password2) return response.status(500).send('Passwords do not match.');

    // Do the username already exist?
    const users = await loadUsers();
    let existingUser = await existingUsers.findOne({ username: username, email: email });
    if (existingUser !== null) return response.status(500).send('Username already taken.');


    // Hash password and save user to db.
    let saltRounds = 15;
    console.log('Before hashing');
    bcrypt.genSalt(saltRounds, function (err, salt) {
        console.log('salt created');
        bcrypt.hash(password, salt, function (err, hash) {
            console.log('Hash: ' + hash);

            // Save to db.
            users.insertOne({
                username: username,
                password: hash,
                email: email,
                isAdmin: false,
                wantNewsMail: true,
                createdAt: new Date()
            });

            response.status(201).send();
        });
    });
});



router.get('/', async (request, response) => {
    const users = await loadUsers();

    response.send(await users.find({}).toArray());
});

router.get('/:id', async (request, response) => {
    const users = await loadUsers();

    response.send(await users.findOne({ _id: new mongodb.ObjectID(request.params.id) })); // TODO Not send the whole user back, with passwordHash..
});



router.delete('/:id', async (request, response) => {
    const users = await loadUsers();

    await users.deleteOne({ _id: new mongodb.ObjectID(request.params.id) });
    response.status(200).send();
});


module.exports = router;

async function loadUsers() {

    const client = await mongodb.MongoClient.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('MailingListAssignement').collection('users');
}




