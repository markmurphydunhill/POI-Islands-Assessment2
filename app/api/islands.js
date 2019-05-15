'use strict';

const Boom = require('boom');
const User = require('../models/user');
const Island = require('../models/islands');
const Regions = require('../models/regions');

const Islands = {

    find: {
        auth: false,
        handler: async function(request, h) {
            const islands = await Island.find();
            console.log(islands)
            return islands;
        }
    },

    findOne: {
        auth: false,
        handler: async function(request, h) {
            try {
                const island = await Island.findOne({ _id: request.params.id });
                if (!island) {
                    return Boom.notFound('No Island with this id');
                }
                return island;
            } catch (err) {
                return Boom.notFound('No Candidate with this id');
            }
        }
    },

    islandsInRegion: {
        auth: false,
        handler: async function(request, h) {
            try {
                const islands = await Island.find({ region: request.params.id });
                if (!islands) {
                    return Boom.notFound('No Region with this id');
                }
                return islands;
            } catch (err) {
                return Boom.notFound('No Region with this id');
            }
        }
    },

    islandsByUser: {
        auth: false,
        handler: async function(request, h) {
            try {
                const islands = await Island.find({ creator: request.params.id });
                if (!islands) {
                    return Boom.notFound('No User with this id');
                }
                return islands;
            } catch (err) {
                return Boom.notFound('No User with this id');
            }
        }
    },

    createIsland: {
        auth: false,
        handler: async function(request, h) {
            const newIsland = new Island(request.payload);
            const island = await newIsland.save();
            console.log("island created");
            if (island) {
                return h.response(island).code(201);
            }
            return Boom.badImplementation('error creating island');
        }
    },

    deleteAll: {
        auth: false,
        handler: async function(request, h) {
            await Island.deleteMany({});
            return { success: true };
        }
    },

    deleteOne: {
        auth: false,
        handler: async function(request, h) {
            const response = await Island.deleteOne({ _id: request.params.id });
            if (response.deletedCount == 1) {
                return { success: true };
            }
            return Boom.notFound('Island not found');
        }
    }
};

module.exports = Islands;
