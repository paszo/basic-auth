const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.DBURI;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
        app.listen(port);
    })
    .then(() => console.log(`app is listening on port ${port}...`))
    .catch((err) => console.log(err));

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

// routes
app.use(routes);


