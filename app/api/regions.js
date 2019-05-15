'use strict';

const Boom = require('boom');
const Region = require('../models/regions');

const Regions = {

    findAll: {
        auth: false,
        handler: async function(request, h) {
            const regions = await Region.find();
            return regions;
        }
    },

    findOne: {
        auth: false,
        handler: async function(request, h) {
            try {
                const region = await Region.findOne({ _id: request.params.id });
                if (!region) {
                    return Boom.notFound('No Region with this id');
                }
                return region;
            } catch (err) {
                return Boom.notFound('No Region with this id');
            }
        }
    },

   createRegion: {
        auth: false,
        handler: async function(request, h) {
            const newRegion = new Region(request.payload);
            const region = await newRegion.save();
            if (region) {
                return h.response(region).code(201);
            }
            return Boom.badImplementation('error creating region');
        }
    },

    deleteAll: {
        auth: false,
        handler: async function(request, h) {
            await Region.deleteMany({});
            return { success: true };
        }
    },

    deleteOne: {
        auth: false,
        handler: async function(request, h) {
            const response = await Region.deleteOne({ _id: request.params.id });
            if (response.deletedCount == 1) {
                return { success: true };
            }
            return Boom.notFound('Region not found');
        }
    }
};

module.exports = Regions;
