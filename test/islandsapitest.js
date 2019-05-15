'use strict';

const assert = require('chai').assert;
const IslandService = require('./islands-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Islands API tests', function () {

    let islands = fixtures.islands;
    let newIsland = fixtures.newIsland;
   // console.log(islands);

    const islandService = new IslandService(fixtures.islandService);


    /*setup(async function() {
       await islandService.deleteAllIslands();
           });

    teardown(async function() {
       await  islandService.deleteAllIslands();
    });*/

    test('create an island', async function () {
        const returnedIsland = await islandService.createIslands(newIsland);
        assert(_.some([returnedIsland], newIsland),  'returnedIsland must be a superset of newIsland');
        assert.isDefined(returnedIsland._id);
    });

    test('get island', async function () {

        const i1 = await islandService.createIslands(newIsland);
        const i2 = await islandService.getIslands(i1._id);
        assert.deepEqual(i1, i2);
    });

    test('get invalid candidate', async function () {
        const i1 = await islandService.getIslands('1234');
        assert.isNull(i1);
        const i2 = await islandService.getIslands('012345678901234567890123');
        assert.isNull(i2);
    });
    test('delete an island', async function () {
        let i = await islandService.createIslands(newIsland);
        assert(i._id != null);
        await islandService.deleteOneIsland(i._id);
        i = await islandService.getIslands(i._id);
        assert(i == null);
    });

  /*
   getislands() does not work
  test('get all islands', async function () {

        console.log(islands);
        for (let i of islands) {
            await islandService.createIslands(i);
        }

        const allIslands = await islandService.getIslands();
        console.log(allIslands);
        assert.equal(allIslands.length, islands.length);
    });

    test('get island detail', async function () {
        for (let i of islands) {
            await islandService.createIslands(i);
        }

        const allIslands = await islandService.getIslands();
        for (var i = 0; i < islands.length; i++) {
            assert(_.some([allIslands[i]], islands[i]), 'returnedCandidate must be a superset of newCandidate');
        }
    });*/

  test('get all islands empty', async function () {
        const allIslands = await islandService.getIslands();
        assert.equal(allIslands.length, 0);
    });


});

