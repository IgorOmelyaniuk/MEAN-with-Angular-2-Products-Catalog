const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', () => {
    console.log('Database error ' + error);
});

const app = express();

const users = require('./routes/users');
const products = require('./routes/products');
const menu = require('./routes/menu');
const reviews = require('./routes/reviews');
const filter = require('./routes/filters');
const search = require('./routes/search');

const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);
app.use('/products', products);
app.use('/menu', menu);
app.use('/reviews', reviews);
app.use('/filter', filter);
app.use('/search', search);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});