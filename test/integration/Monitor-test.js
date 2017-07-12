'use strict';

const supertest = require('supertest');
const expect = require('chai').expect;
const server = require('../../server');
const app = supertest(server);

describe('monitor', () => {

    describe('health check', () => {
        it('should return healthy status', (done) => {
            // Given
            let response = {
                'status': 'ok',
                'build_commit': 'undefined',
                'build_id': 'undefined'
            };

            app
                .get('/monitor/health')
                .expect('Content-type',/json/)
                .expect(200)
                .end(function(err,res){
                    // HTTP status should be 200
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.deep.equal(response);
                    done();
                });
        });
    });

});