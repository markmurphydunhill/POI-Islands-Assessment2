'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const islandSchema = Schema({
    name: String,
    lat: Number,
    long: Number,
    description: String,
    costalZone: String,

    region: {
        type: Schema.Types.ObjectId,
        ref: 'Regions'
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = Mongoose.model('Islands', islandSchema);

