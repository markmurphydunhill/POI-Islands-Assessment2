/*'use strict';

const assert = require('chai').assert;
const axios = require('axios');

suite('Region API tests', function () {

    test('get Regions', async function () {
        const response = await axios.get('http://localhost:3000/api/regions');
        const regions = response.data;
        assert.equal(5, regions.length);

        assert.equal(regions[0].title, 'North East');
        assert.equal(regions[0].geo.lat, '54.7');
        assert.equal(regions[0].geo.long, '-6.1412');

        assert.equal(regions[4].title, 'Mid West');
        assert.equal(regions[4].geo.lat, '53.574');
        assert.equal(regions[4].geo.long, '-9.382');

    });

    test('get one user', async function () {
        let response = await axios.get('http://localhost:3000/api/regions');
        const regions = response.data;
        assert.equal(5, regions.length);

        const oneRegionUrl = 'http://localhost:3000/api/regions/' + regions[0]._id;
        response = await axios.get(oneRegionUrl);
        const oneRegion = response.data;

        assert.equal(oneRegion.title, 'North East');
        assert.equal(oneRegion.geo.lat, '54.7');
        assert.equal(oneRegion.geo.long, '-6.1412');
    });

    test('create a region', async function () {
        const regionUrl = 'http://localhost:3000/api/createregion';
        const newRegion = {
            title: 'The South East',
             geo: {
                lat: "54.7",
                long: "-6.1412"
             }
        };

        const response = await axios.post(regionUrl, newRegion);
        const returnedRegion = response.data;
        assert.equal(201, response.status);

        assert.equal(returnedRegion.title, 'The South East');
        assert.equal(returnedRegion.geo.lat, '54.7');
        assert.equal(returnedRegion.geo.long, '-6.1412');
    });
});

