const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
require('dotenv').config()

const connectionString = process.env.CONNECTION_STRING;

router.post('/login', async (request, response) => {
    console.log(request.body);
    var email = request.body.email;
    var password = request.body.password;

    console.log(email);
    console.log(password);

    const users = await loadUsers();

    var userToCheck = await users.findOne({ email: email });

    console.log(userToCheck);

    const passwordEnteredByUser = password;
    const hash = userToCheck.password;

    bcrypt.compare(passwordEnteredByUser, hash, function (err, isMatch) {
        if (err) {
            throw err
        } else if (!isMatch) {
            console.log("Password doesn't match!");
            response.status(500).send("Password doesn't match!");
        } else {
            console.log("Password matches!");

            let token = jwt.sign({  _id: userToCheck._id,
                                    username: userToCheck.username, 
                                    email: userToCheck.email,
                                    isSubscribed: userToCheck.isSubscribed},
                                    process.env.JWT_SECRET,{ expiresIn: '24h' });

            console.log(token);

            response.json({ success: true,
                message: 'Authentication successful!',
                token: token,
                user: {
                    _id: userToCheck._id,
                    username: userToCheck.username,
                    email: userToCheck.email,
                    isSubscribed: userToCheck.isSubscribed
                }
            });
        }
    })
});


router.post('/register', async (request, response) => {

    console.log(request.data);

    var username = request.body.username;
    var email = request.body.email;
    var password = request.body.password;
    var password2 = request.body.password2;

    console.log(request.body);

    // Check id user entered same password.
    if (password !== password2) return response.status(500).send('Passwords do not match.');

    // Do the username already exist?
    const users = await loadUsers();
    console.log(await users.find({}).toArray());
    let existingUser = await users.findOne({ username: username, email: email });
    console.log(existingUser);
    if (existingUser !== null) return response.status(409).send({ message: 'Username already taken.'});

    // Hash password and save user to db.
    let saltRounds = 15;
    console.log('Before hashing');
    bcrypt.genSalt(saltRounds, function (err, salt) {
        console.log('salt created');
        bcrypt.hash(password, salt, async function (err, hash) {
            console.log('Hash: ' + hash);

            // Save to db.
            await users.insertOne({
                username: username,
                password: hash,
                email: email,
                isAdmin: false,
                isSubscribed: true,
                createdAt: new Date()
            });

            let registeredUser = await users.findOne({ username: username, email: email });

            console.log('New user: \n' + registeredUser);

            let token = jwt.sign({  id: registeredUser._id,
                username: registeredUser.username, 
                email: registeredUser.email,
                isSubscribed: registeredUser.isSubscribed},

            process.env.JWT_SECRET,{ expiresIn: '24h' });

            response.json({
            success: true,
            message: 'Registration successful!'});
        });
    });
});

router.put('/subscribe', async (request, response) => {

    console.log('Inside subscribe endpoint');
    
    try {

        const users = await loadUsers();

        console.log(request.body);
        console.log(request.body.id);
        console.log(request.body.bool);
        const updatedUser = await users.updateOne(
            { _id: new mongodb.ObjectID(request.body.id) }, 
            { $set: { isSubscribed : request.body.bool }});
            
        response.status(201).send();
    }
    catch {
        response.status(500).send('Database error');
    }
})


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


async function loadUsers() {
    
    const client = await mongodb.MongoClient.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    return client.db('MailingListAssignement').collection('users');
}

module.exports = router;



