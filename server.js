'use strict';

const express = require('express');
const swaggerTools = require('swagger-tools');
const bodyParser = require('body-parser');
const logger = require('express-fluent-logger');

const swaggerDoc = require('./swagger.json');
const ServiceError = require('./src/exceptions/ServiceError');
const ValidationException = require('./src/exceptions/ValidationException');

const serverPort = process.env.PORT || 3030;
const app = express();

/**
 * Logging middleware
 */
if (process.env.AWS_ENV) {
    const fluentHost = process.env.FLUENT_HOST || '172.17.0.1';
    //@TODO change the "to_be_changed" key to the api service name
    app.use(logger('to_be_changed', {host: fluentHost}));
    console.log('Sending access logs to fluentd on ' + fluentHost);
}

/**
 * initialize the Swagger middleware
 */
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    //body-parser middleware
    //parsing json encoded and application/x-www-form-urlencoded bodies
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter({
        swaggerUi: '/swagger.json',
        controllers: 'src/controllers',
        useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
    }));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    // route not found middleware
    app.use(function(req, res, next) {
        let error = new ValidationException(req.originalUrl, 'Route not defined');

        throw new ServiceError('Route not found', 404, error);
    });

    // basic exception handling
    app.use(function(err, req, res, next) {

        if(!err.statusCode) {
            err.statusCode = 500;
        }
        if(!err.message) {
            err.message = 'Something went wrong';
        }

        console.error(err);

        res.status(err.statusCode).json({message: err.message});
    });

    // Start the server
    app.listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs/', serverPort);
    });
});


function exitOnSignal(signal) {
    console.log('\ncaught ' + signal + ', exiting');
    process.exit();
}

process.on('SIGINT', () => exitOnSignal('SIGINT'));
process.on('SIGTERM', () => exitOnSignal('SIGTERM'));

module.exports = app;
