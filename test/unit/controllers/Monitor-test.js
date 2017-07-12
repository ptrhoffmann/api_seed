'use strict';

const sinon  = require('sinon');
const expect = require('chai').expect;

const MonitorController = require('../../../src/controllers/Monitor');
const MonitorService = require('../../../src/services/MonitorService');

describe('MonitorController', () => {

    let checkHealth = sinon.stub(MonitorService, "checkHealth");

    describe('checkHealth()', () => {

        it('should call send method with given response', (done) => {
            // Given
            let response = {
                status: 'ok',
                build_commit:'build_commit',
                build_id: 'build_id'
            };
            checkHealth.returns(Promise.resolve(response));

            let res = {
                status: sinon.stub().returnsThis(),
                send: (result) => {
                    // Then
                    expect(res.status.calledWith(200)).to.be.true;
                    expect(result).to.deep.equal(response);

                    done();
                }
            };

            // When
            MonitorController.checkHealth(undefined, res);
        })
    })
});