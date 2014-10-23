'use strict';

describe('The marketcurrency filter', function() {

    var $filter;
    var $cookies;

    beforeEach(module('market.filters'));

    beforeEach(inject(function (_$filter_, _$cookies_) {
        $filter = _$filter_;
        $cookies = _$cookies_;
    }));

    it('should default to USD', function() {
        // Arrange
        $cookies.preferences = '';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input);

        // Assert
        expect(result).toEqual('$100.00');
    });

    it('should read USD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=USD';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input);

        // Assert
        expect(result).toEqual('$100.00');
    });

    it('should read GBP cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=GBP';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input);

        // Assert
        expect(result).toEqual('£50.00');
    });

    it('should read AUD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=AUD';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input);

        // Assert
        expect(result).toEqual('$50.00');
    });

    it('should read EUR cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=EUR';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input);

        // Assert
        expect(result).toEqual('€50.00');
    });

    it('should read CAD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=CAD';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input);

        // Assert
        expect(result).toEqual('$50.00');
    });

    it('should read ARS cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=ARS';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input);

        // Assert
        expect(result).toEqual('AR$50.00');
    });

    it('should default to USD with bad cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=ZZZ';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input);

        // Assert
        expect(result).toEqual('$100.00');
    });

    it('should read EUR cookie in a list', function() {
        // Arrange
        $cookies.preferences = 'item1=true&item2=false&currency=EUR';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input);

        // Assert
        expect(result).toEqual('€50.00');
    });

    it('should round ARS up', function() {
        // Arrange
        $cookies.preferences = 'currency=ARS';
        var input = 99.99;

        // Act
        var result = $filter('marketcurrency')(input);

        // Assert
        expect(result).toEqual('AR$50.00');
    });

    it('should round ARS down', function() {
        // Arrange
        $cookies.preferences = 'currency=ARS';
        var input = 99.99;

        // Act
        var result = $filter('marketcurrency')(input, 'rounddown');

        // Assert
        expect(result).toEqual('AR$49.99');
    });
});