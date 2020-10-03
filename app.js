const express = require('express');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));

//view engine
app.set('view engine', 'ejs');

// routes
app.use(routes);

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

