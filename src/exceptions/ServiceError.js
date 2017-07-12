'use strict';

const ExtendableError = require('./ExtendableError');

class ServiceError extends ExtendableError {

    constructor(message, statusCode, error) {
        super(`${statusCode} - ${message}`, statusCode, error);
    }

}

module.exports = ServiceError;