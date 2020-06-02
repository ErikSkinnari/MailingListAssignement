const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const users = require('./routes/api/users');

app.use('/api/users', users);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is started at port: ${port}`));