const Islands = require('./app/api/islands');
const Users= require('./app/api/users');
const Regions= require('./app/api/regions');



module.exports = [
    { method: 'GET', path: '/api/islands', config: Islands.find },
    { method: 'GET', path: '/api/islands/{id}', config: Islands.findOne },
    { method: 'GET', path: '/api/islandsinregion/{id}', config: Islands.islandsInRegion},
    { method: 'GET', path: '/api/islandsbyuser/{id}', config: Islands.islandsByUser},
    { method: 'POST', path: '/api/createisland', config: Islands.createIsland },
    { method: 'DELETE', path: '/api/deleteisland/{id}', config: Islands.deleteOne },
    { method: 'GET', path: '/api/deleteallislands', config: Islands.deleteAll },

    { method: 'GET', path: '/api/users', config: Users.find },
    { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
    { method: 'POST', path: '/api/createuser', config: Users.createUser },
    // { method: 'POST', path: '/api/users', config: Users.create },
    { method: 'DELETE', path: '/api/deleteuser/{id}', config: Users.deleteOne },
    { method: 'DELETE', path: '/api/deleteusers', config: Users.deleteAll },
    { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate },

    { method: 'GET', path: '/api/regions', config: Regions.findAll },
    { method: 'GET', path: '/api/regions/{id}', config: Regions.findOne },
    { method: 'POST', path: '/api/createregion', config: Regions.createRegion },
    { method: 'GET', path: '/api/deleteregion/{id}', config: Regions.deleteOne },
    { method: 'GET', path: '/api/deleteregions', config: Regions.deleteAll }
];