const express = require('express');
const app = express();
const routesUsers = require('./routes/users');
const routesPlants = require('./routes/plants');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Plant, User } = require('./models');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/plantDatabase', { useNewUrlParser: true}).then(() => {
    console.log("Connected to MongoDB  ");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});



app.use('/', routesUsers);
app.use('/', routesPlants);



app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})