'use strict';

class ValidationException {

    constructor(uri, reason) {
        this.uri = uri;
        this.reason = reason;
    }

}

module.exports = ValidationException;