'use strict';

describe('The currency controller', function() {
    var $rootScope, $scope, $controller;

    beforeEach(module('marketApp'));

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;

        $controller('currencyController', {'$scope' : $scope});
    }));

    it('should have input value', function() {
        expect($scope.amount).toEqual(100.50);
    });
});