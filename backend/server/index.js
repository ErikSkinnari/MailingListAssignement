if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongodb = require('mongodb');
const flash = require('express-flash');
const session = require('express-session');

const connectionString = process.env.CONNECTION_STRING;

const app = express();

const initializePassport = require('./passport-config')

initializePassport( passport, async username => await getUserByUsername(username));

app.use(cors());
app.set('view-engine', 'ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static('public'));


const users = require('./routes/api/users');
app.use('/api/users', users);


// const admin = require('./routes/admin/admin');
// app.use('/admin', admin);

app.get('/admin', checkAuthentication, (request, response) => {
    response.render('admin.ejs', { username: request.user.username });
})
app.get('/admin/login', checkNotAuthenticated, (request, response) => {
    response.render('login.ejs');
})

app.post('/admin/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is started at port: ${port}`));

async function loadUsers() {

    const client = await mongodb.MongoClient.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('MailingListAssignement').collection('users');
}

async function getUserByEmail(email) {
    const userList = await loadUsers();
    return userList.findOne({ email: email });
}

async function getUserByUsername(username) {
    const userList = await loadUsers();
    return userList.findOne({ username: username });
}

async function getUserById(id) {
    const users = await loadUsers();
    return users.findOne({ _id: new mongodb.ObjectID(id) });
}


// Authentication-checking middleware
function checkAuthentication(request, response, next) {
    if(request.isAuthenticated()) {
        return next();
    }
    return response.redirect('/admin/login');
}

function checkNotAuthenticated(request, response, next) {
    if(request.isAuthenticated()) {
        return response.redirect('/admin');
    }
    return next();
}