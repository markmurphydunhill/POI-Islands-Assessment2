/*  ---Added Regions tests to islandtestapi as getting "suite is not defined" error --- */


/*'use strict';

const assert = require('chai').assert;
const IslandService = require('./islands-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {

    let regions = fixtures.regions;
    let newRegion = fixtures.newRegion;

    const islandService = new IslandService(fixtures.islandService);



    setup(async function () {
        await islandService.deleteAllRegions();
    });

    teardown(async function () {
        await islandService.deleteAllRegions();
    });

    test('create a region', async function () {
        const returnedRegion = await islandService.createRegion(newRegion);
        console.log(newRegion);
        console.log(returnedRegion);
        assert(_.some([returnedRegion], newRegion), 'returnedUser must be a superset of newUser');
        assert.isDefined(returnedRegion._id);
    });



    test('get region', async function () {
        const u1 = await islandService.createRegion(newRegion);
        const u2 = await islandService.getRegion(u1._id);
        assert.deepEqual(u1, u2);
    });




});*/
