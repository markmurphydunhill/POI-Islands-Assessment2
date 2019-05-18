'use strict';

const assert = require('chai').assert;
const IslandService = require('./islands-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Islands API tests', function () {

    let islands = fixtures.islands;
    let newIsland = fixtures.newIsland;
    let newUser = fixtures.newUser;
    let regions = fixtures.regions;
    let newRegion = fixtures.newRegion;

    const islandService = new IslandService(fixtures.islandService);

    setup(async function () {
        await islandService.deleteAllRegions();
      //  await islandService.deleteAllIslands();
    });

    teardown(async function () {
        await islandService.deleteAllRegions();
      //  await islandService.deleteAllIslands()
    });


    suiteSetup(async function() {
        await islandService.deleteAllUsers();
        const returnedUser = await islandService.createUser(newUser);
        const response = await islandService.authenticate(newUser);
    });

    suiteTeardown(async function() {
        await islandService.deleteAllUsers();
        islandService.clearAuth();
    });


    test('create an island', async function () {
        const returnedIsland = await islandService.createIslands(newIsland);
        assert(_.some([returnedIsland], newIsland),  'returnedIsland must be a superset of newIsland');
        assert.isDefined(returnedIsland._id);
    });

    test('create a region', async function () {
        const returnedRegion = await islandService.createRegion(newRegion);
        console.log(newRegion);
        console.log(returnedRegion);
        assert(_.some([returnedRegion], newRegion), 'returnedUser must be a superset of newUser');
        assert.isDefined(returnedRegion._id);
    });



    test('get island', async function () {

        const i1 = await islandService.createIslands(newIsland);
        console.log (i1._id);
        const i2 = await islandService.getIslands(i1._id);
        assert.deepEqual(i1, i2);
    });

    test('get region', async function () {
        const u1 = await islandService.createRegion(newRegion);
        const u2 = await islandService.getRegions(u1._id);
        assert.deepEqual(u1, u2);
    });



    test('get invalid island', async function () {
        const i1 = await islandService.getIslands('1234');
        assert.isNull(i1);
        const i2 = await islandService.getIslands('012345678901234567890123');
        assert.isNull(i2);
    });

    test('get invalid region', async function () {
        const i1 = await islandService.getRegions('1234');
        assert.isNull(i1);
        const i2 = await islandService.getRegions('012345678901234567890123');
        assert.isNull(i2);
    });



    test('delete an island', async function () {
        let i = await islandService.createIslands(newIsland);
        assert(i._id != null);
        await islandService.deleteOneIsland(i._id);
        i = await islandService.getIslands(i._id);
        assert(i == null);
    });

    test('delete a region', async function () {
        let i = await islandService.createRegion(newRegion);
        assert(i._id != null)
        await islandService.deleteOneRegion(i._id);
        i = await islandService.getRegions(i._id);
        assert(i == null);
    });



  test('get all islands', async function () {

        console.log(islands);
        for (let i of islands) {
            await islandService.createIslands(i);
        }

        const allIslands = await islandService.getIslands();
        console.log(allIslands);
        assert.equal(allIslands.length, islands.length);
    });

    test('get all regions', async function () {

        console.log(regions);
        for (let r of regions) {
            await islandService.createRegion(r);
        }

        const allRegions = await islandService.getRegions();
        console.log(allRegions);
        assert.equal(allRegions.length, regions.length);
    });


    test('get island detail', async function () {
        for (let i of islands) {
            await islandService.createIslands(i);
        }

        const allIslands = await islandService.getIslands();
        console.log(islands);
        for (var i = 0; i < islands.length; i++) {
            assert(_.some([allIslands[i]], islands[i]), 'returnedCandidate must be a superset of newCandidate');
        }
    });

    test('get all islands empty', async function () {
        const allIslands = await islandService.getIslands();
        assert.equal(allIslands.length, 0);
    });

    test('get all regions empty', async function () {
        const allRegions = await islandService.getRegions();
        assert.equal(allRegions.length, 0);
    });

    /*test('create a island and check donor', async function() {
        const returnedIsland = await islandService.createIsland(newIsland);
        await donationService.makeDonation(returnedCandidate._id, donations[0]);
        const returnedDonations = await donationService.getDonations(returnedCandidate._id);
        assert.isDefined(returnedDonations[0].donor);
    });*/

});

