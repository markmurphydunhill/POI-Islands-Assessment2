'use strict';

const Boom = require('boom');
const Joi = require('joi');
const User = require('../models/user');
const Island = require('../models/islands');
const Regions = require('../models/regions');

const Islands = {

    createnewisland: {
        handler: async function(request, h) {
            const regions = await Regions.find();
            return h.view('home', { title: 'Add an Island', regions: regions });
        }
    },

    islandbyregion: {
        handler: async function(request, h) {
            try {
                const regions = await  Regions.find().populate('pois');

                return h.view('main', {
                    title: 'List of Islands by Region',
                    regions: regions
                });

            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },



    report: {
        handler: async function(request, h) {
            try {
                const islands = await  Regions.find().populate('pois');
                const regions = await Island.find();
                return h.view('report', {
                    title: 'List of Islands',
                    islands: islands,
                    regions: regions
                });
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },

    islandList: {
        handler: async function(request, h) {
            try {
                const region = request.payload.id;
                const regionName =  await request.payload.title;
                const islandsInRegion = await Island.find({
                    region: region
                });

                return h.view('islandsInRegion',{
                    title: 'Islands for this Region',
                    islandsInRegion: islandsInRegion,
                    regionName: regionName
                }
                );
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },

    addIsland: {
        validate: {
            payload: {
                islandName: Joi.string().required(),
                islandDescription: Joi.string().required(),
                zone: Joi.string().required(),
                long: Joi.number().required(),
                lat: Joi.number().required(),
                region: Joi.string().required()
            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h
                    .view('home', {
                        title: 'Add Island error',
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;
                const rawRegion = request.payload.region;
                const region = await Regions.findOne({
                    title: rawRegion
                                    });

                const newIsland = new Island({
                    name: data.islandName,
                    description: data.islandDescription,
                    lat: data.lat,
                    long: data.long,
                    region: region._id,
                    creator: user,
                    costalZone: data.zone

                });
                await newIsland.save();
                return h.redirect('/myIslands');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },


    myIslands: {
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const islands = await Island.find({
                      creator : id

                });
                return h.view('report', {
                    title: 'Islands for this Region',
                    islands: islands
                });
            } catch (err) {
                return h.redirect('/myIslands', { errors: [{ message: err.message }] });
            }
        }
    },



   deleteIsland: {
        handler: async function(request, h) {
            try {
                const islandid = request.payload.id;
                const island = await Island.findOne({
                    _id: islandid
                });

                await island.delete();
                return h.redirect('/myIslands');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },

    showIsland: {
        handler: async function(request, h) {
            try {
                const islandid = request.payload.id;
                const island = await Island.findOne({
                    _id: islandid});

                return h.view('updateIsland', { title: 'Island Details', island: island });
            } catch (err) {
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },

    updateIsland: {
        validate: {
            payload: {
                islandName: Joi.string().required(),
                islandDescription: Joi.string().required(),
                zone: Joi.string().required(),
                long: Joi.number().required(),
                lat: Joi.number().required(),
                id: Joi.string().required()
            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h
                    .view('updateIsland', {
                        title: 'Update Island error',
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },
        handler: async function(request, h) {
            try {
                const islandEdit = request.payload;
                console.log(islandEdit);

                const id = request.payload.id;
                console.log(id);
                const island = await Island.findOne({
                    _id: id});
                console.log(island);
                island.name = islandEdit.islandName;
                island.description = islandEdit.islandDescription;
                island.costalZone = islandEdit.zone;
                island.lat = islandEdit.lat;
                island.long = islandEdit.long;
                await island.save();
                return h.redirect('/myIslands');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },
};

module.exports = Islands;