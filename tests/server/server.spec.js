'use strict';

describe('the nodejs server', function() {
    var request = require ('http');

    it('should respond to /api/latest.json', function() {
        request.get('http://localhost:3000/api/latest.json', function(response) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});