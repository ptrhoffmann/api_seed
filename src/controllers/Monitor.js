'use strict';

const MonitorService = require('./../services/MonitorService');

class Monitor {

    /**
     * controller action checking health status
     * @param req
     * @param res
     */
    static checkHealth(req, res) {
        MonitorService.checkHealth()
            .then((response) => {
                res.status(200).send(response);
            });
    }
}

// expose function for swagger router
module.exports.checkHealth = Monitor.checkHealth;