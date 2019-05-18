'use strict';

const assert = require('chai').assert;
const IslandService = require('./islands-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {

    let users = fixtures.users;
    let newUser = fixtures.newUser;

    const islandService = new IslandService(fixtures.islandService);



    setup(async function () {
        await islandService.deleteAllUsers();
    });

    teardown(async function () {
        await islandService.deleteAllUsers();
    });

    /*
    suiteSetup(async function() {
        await islandService.deleteAllUsers();
        const returnedUser = await islandService.createUser(newUser);
        const response = await islandService.authenticate(newUser);
    });

    suiteTeardown(async function() {
        await islandService.deleteAllUsers();
        islandService.clearAuth();
    });*/

    test('create a user', async function () {
        const returnedUser = await islandService.createUser(newUser);
        console.log(newUser);
        console.log(returnedUser);
        assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
        assert.isDefined(returnedUser._id);
    });

    test('get user', async function () {
        const u1 = await islandService.createUser(newUser);
        const u2 = await islandService.getUser(u1._id);
        assert.deepEqual(u1, u2);
    });


    test('get invalid user', async function () {
        const u1 = await islandService.getUser('1234');
        assert.isNull(u1);
        const u2 = await islandService.getUser('012345678901234567890123');
        assert.isNull(u2);
    });


    test('delete a user', async function () {
        let u = await islandService.createUser(newUser);
        assert(u._id != null);
        console.log(u._id);
        await islandService.deleteOneUser(u._id);
        //await islandService.deleteAllUsers();
        console.log(u);
        u = await islandService.getUser(u._id);
        assert(u == null);
    });

    test('get all users', async function () {
        for (let u of users) {
            await islandService.createUser(u);
        }

        const allUsers = await islandService.getUsers();
        console.log(allUsers.length, users.length);
        assert.equal(allUsers.length, users.length);
    });

    test('get users detail', async function () {
        for (let u of users) {
            await islandService.createUser(u);
        }

        const allUsers = await islandService.getUsers();
        for (var i = 0; i < users.length; i++) {
            assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
        }
    });

    test('get all users empty', async function () {
        const allUsers = await islandService.getUsers();
        assert.equal(allUsers.length, 0);
    });

});
