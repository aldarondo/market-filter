'use strict';

describe('The marketcurrency filter', function() {

    var $filter;
    var $cookies;
    var $window;
    var currencyList = {
        "ARS": [0.5, "AR$", 2, ".", ","],
        "USD": [1, "$", 2, ",", "."],
        "GBP": [0.5, "£", 0, ",", "."],
        "AUD": [0.5, "$", 2, ",", "."],
        "EUR": [0.5, "€", 2, ",", "."],
        "CAD": [0.5, "$", 2, ",", "."]
    };

    beforeEach(module('market.filters'));

    beforeEach(inject(function (_$filter_, _$cookies_, _$window_) {
        $filter = _$filter_;

        $cookies = _$cookies_;
        $cookies.preferences = '';

        $window = _$window_;
        $window.navigator.userLanguage = 'en-us';
        $window.navigator.language = 'en-us';
    }));

    it('should default to USD', function() {
        // Arrange
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('$100.00');
    });

    it('should default to USD for invalid language', function() {
        // Arrange
        $window.navigator.userLanguage = 'qa-qa';
        $window.navigator.language = 'qa-qa';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('$100.00');
    });

    it('should default to GBP when en-gb', function() {
        // Arrange
        $window.navigator.userLanguage = 'en-gb';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('£50');
    });

    it('should read USD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=USD';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('$100.00');
    });

    it('should read GBP cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=GBP';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('£50');
    });

    it('should read AUD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=AUD';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('$50.00');
    });

    it('should read EUR cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=EUR';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('€50.00');
    });

    it('should read CAD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=CAD';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('$50.00');
    });

    it('should read ARS cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=ARS';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('AR$50,00');
    });

    it('should default to USD with bad cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=ZZZ';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('$100.00');
    });

    it('should read EUR cookie in a list', function() {
        // Arrange
        $cookies.preferences = 'item1=true&item2=false&currency=EUR';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('€50.00');
    });

    it('should round ARS up', function() {
        // Arrange
        $cookies.preferences = 'currency=ARS';
        var input = 99.99;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('AR$50,00');
    });

    it('should round ARS down', function() {
        // Arrange
        $cookies.preferences = 'currency=ARS';
        var input = 99.99;

        // Act
        var result = $filter('marketcurrency')(input, currencyList, 'rounddown');

        // Assert
        expect(result).toEqual('AR$49,99');
    });

    it('should default to GBP when en-gb and update cookie', function() {
        // Arrange
        $window.navigator.userLanguage = 'en-gb';
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('£50');
        expect($cookies.preferences).toEqual('currency=GBP');
    });
});