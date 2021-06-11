const routesPlants = require('express').Router();
const { Plant } = require('../models');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = (req, res, next) => {
    const accessToken = req.header('x-access-token');
    jwt.verify(accessToken, User.getJWTSecret(), (error, decoded) => {
        if (error) {
            res.status(401).send({error});
        } else {
            req.userId = decoded._id;
            next();
        }
    })
}

routesPlants.get('/plants', authenticate, (req, res) => {
    Plant.find({
        _userId: req.userId
    }).then((plants) => {
        res.send(plants);
    }).catch((e) => {
        res.send(e);
    });
})


routesPlants.get('/plants/:id', authenticate, (req, res) => {
    Plant.find({
        _id: req.params.id
    }).then((plant) => {
        res.send(plant);
    }).catch((e) => {
        res.send(e);
    });
})


routesPlants.post('/plants', authenticate, (req, res) => {
    let name = req.body.name;
    let zone = req.body.zone;
    let wateringPeriod = req.body.wateringPeriod;
    let notify = req.body.notify;
    let image = req.body.image;


    let newPlant = new Plant({
        name,
        zone,
        wateringPeriod,
        notify,
        image,
        _userId: req.userId
    });
    newPlant.save().then((plantDoc) => {
        res.send(plantDoc);
    })
});


routesPlants.patch('/plants/:id', authenticate, (req, res) => {
    Plant.findOneAndUpdate({ _id: req.params.id, _userId: req.userId }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});


routesPlants.delete('/plants/:id', authenticate, (req, res) => {
    
    Plant.findOneAndRemove({
        _id: req.params.id,
        _userId: req.userId
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
});


module.exports = routesPlants;