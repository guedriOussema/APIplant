const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    zone: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    wateringPeriod: {
        type: Number,
        required: true
    },
    notify: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

const Plant = mongoose.model('Plant', PlantSchema);

module.exports = { Plant }