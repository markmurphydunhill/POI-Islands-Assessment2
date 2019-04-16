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

    create: {
        auth: false,
        handler: async function(request, h) {
            const newCandidate = new Candidate(request.payload);
            const candidate = await newCandidate.save();
            if (candidate) {
                return h.response(candidate).code(201);
            }
            return Boom.badImplementation('error creating candidate');
        }
    },

    deleteAll: {
        auth: false,
        handler: async function(request, h) {
            await Candidate.deleteMany({});
            return { success: true };
        }
    },

    deleteOne: {
        auth: false,
        handler: async function(request, h) {
            const response = await Candidate.deleteOne({ _id: request.params.id });
            if (response.deletedCount == 1) {
                return { success: true };
            }
            return Boom.notFound('id not found');
        }
    }
};

module.exports = Islands;
