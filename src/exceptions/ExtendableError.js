'use strict';

class ExtendableError extends Error {

    constructor(message, statusCode, error) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.error = error;
    }

}

module.exports = ExtendableError;