'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: { cors: true }
});

/*const fs = require('fs');
const server = Hapi.server({
    port: 3443,
    tls: {
        key: fs.readFileSync('private/myca.key'),
        cert: fs.readFileSync('private/myca.crt')
    },
    routes: {cors:true}
});*/

require('dotenv').config();
require('./app/models/db');
const utils = require('./app/api/utils.js');

async function init() {
    await server.register(require('inert'));
    await server.register(require('vision'));
    await server.register(require('hapi-auth-cookie'));
    await server.register(require('hapi-auth-jwt2'));



    server.views({
        engines: {
            hbs: require('handlebars'),
        },
        relativeTo: __dirname,
        path: './app/views',
        layoutPath: './app/views/layouts',
        partialsPath: './app/views/partials',
        layout: true,
        isCached: false,
    });

    server.auth.strategy('standard', 'cookie', {
        password: process.env.cookie_password,
        cookie: process.env.cookie_name,
        isSecure: false,
        ttl: 24 * 60 * 60 * 1000,
        redirectTo: '/',
    });

    server.auth.strategy('jwt', 'jwt', {
        key: 'secretpasswordnotrevealedtoanyone',
        validate: utils.validate,
        verifyOptions: { algorithms: ['HS256'] },
    });

    server.auth.default({
        mode: 'required',
        strategy: 'standard',
    });

    server.route(require('./routes'));
    server.route(require('./routesapi'));
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

    process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

init();