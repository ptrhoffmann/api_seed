'use strict';

class MonitorService {

    /**
     * return health response object as promise (to match further service calls)
     * @returns {Promise.<{status: string, build_commit: (*|string), build_id: (*|string)}>}
     */
    checkHealth() {
        return Promise.resolve({
            status: 'ok',
            build_commit: process.env.BUILD_COMMIT || 'undefined',
            build_id: process.env.BUILD_ID || 'undefined'
        });
    }
}

module.exports = new MonitorService();