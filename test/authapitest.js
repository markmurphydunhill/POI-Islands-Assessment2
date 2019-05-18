'use strict';

const assert = require('chai').assert;
const IslandService = require('./islands-service');
const fixtures = require('./fixtures.json');
const utils = require('../app/api/utils.js');

suite('Candidate API tests', function () {

    let users = fixtures.users;
    let newUser = fixtures.newUser;

    const islandService = new IslandService(fixtures.islandService);

    setup(async function () {
        await islandService.deleteAllUsers();
    });

    test('authenticate', async function () {
    });

    test('authenticate', async function () {
        const returnedUser = await islandService.createUser(newUser);
        const response = await islandService.authenticate(newUser);
        assert(response.success);
        assert.isDefined(response.token);
    });

    test('verify Token', async function () {
        const returnedUser = await islandService.createUser(newUser);
        const response = await islandService.authenticate(newUser);

        const userInfo = utils.decodeToken(response.token);
        assert.equal(userInfo.email, returnedUser.email);
        assert.equal(userInfo.userId, returnedUser._id);
    });
});