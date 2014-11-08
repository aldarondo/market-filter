'use strict';

describe('The currency controller', function () {
    var scope, controller, httpBackend;

    var currencyList = {
        "ARS": [0.5, "AR$", 2, ".", ","],
        "USD": [1, "$", 2, ",", "."],
        "GBP": [0.5, "£", 0, ",", "."],
        "AUD": [0.5, "$", 2, ",", "."],
        "EUR": [0.5, "€", 2, ",", "."],
        "CAD": [0.5, "$", 2, ",", "."]
    };

    beforeEach(module('marketApp'));

    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();
        controller = $controller;
    }));

    it("gets the currency list", function () {
        httpBackend.when('GET', 'http://localhost:3000/api/latest.json')
            .respond(currencyList);
        controller('currencyController', {'$scope': scope});
        httpBackend.expectGET('http://localhost:3000/api/latest.json');
        httpBackend.flush();
        expect(scope.currencyList).toMatch(currencyList);
    });

    it('should have input value', function () {
        controller('currencyController', {'$scope': scope});
        expect(scope.amount).toEqual(100.50);
    });

    it('should not have a currencyList when server unavailable', function() {
        httpBackend.expectGET('http://localhost:3000/api/latest.json').respond(500, '');
        controller('currencyController', {'$scope': scope});
        httpBackend.flush();
        expect(scope.currencyList).toBeUndefined();
    });
});