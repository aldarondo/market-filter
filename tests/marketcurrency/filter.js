'use strict';

describe('The marketcurrency filter', function() {

    var $filter;
    var $cookies;
    var $window;
    var currencyList = {
        "ARS": [0.5, "AR$", 2, ".", ","],
        "AMD": [0.5, "AMD", 2, ",", "."],
        "AWG": [0.5, "AWG", 2, ",", "."],
        "AUD": [0.5, "AUD$", 2, " ", "."],
        "BRL": [0.5, "BRL", 2, ".", ","],
        "CAD": [0.5, "$", 2, ",", "."],
        "CHF": [0.5, "CHF", 2, "'", "."],
        "CNY": [0.5, "CNY", 2, ",", "."],
        "EUR": [0.5, "€", 2, ",", "."],
        "GBP": [0.5, "£", 2, ",", "."],
        "HKD": [1, "HKD$", 2, ",", "."],
        "INR": [0.5, "INR", 2, ",", "."],
        "JPY": [0.5, "JPY", 0, ",", ""],
        "MXN": [0.5, "MXN", 2, ",", "."],
        "NZD": [1, "NZD$", 2, ",", "."],
        "RUB": [2, "RUB", 2, ".", ","],
        "SEK": [0.5, "SEK", 2, ".", ","],
        "USD": [1, "$", 2, ",", "."]
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
        var input = 1000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('$1,000.00');
    });

    it('should default to USD for invalid language', function() {
        // Arrange
        $window.navigator.userLanguage = 'qa-qa';
        $window.navigator.language = 'qa-qa';
        var input = 1000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('$1,000.00');
    });

    it('should default to GBP when en-gb', function() {
        // Arrange
        $window.navigator.userLanguage = 'en-gb';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('£1,000.00');
    });

    it('should read ARS cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=ARS';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('AR$1.000,00');
    });

    it('should read AMD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=AMD';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('AMD1,000.00');
    });

    it('should read AWG cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=AWG';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('AWG1,000.00');
    });

    it('should read AUD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=AUD';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('AUD$1 000.00');
    });

    it('should read CAD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=CAD';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('$1,000.00');
    });

    it('should read CHF cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=CHF';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual("CHF1'000.00");
    });

    it('should read CNY cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=CNY';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('CNY1,000.00');
    });

    it('should read EUR cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=EUR';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('€1,000.00');
    });

    it('should read GBP cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=GBP';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('£1,000.00');
    });

    it('should read HKD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=HKD';
        var input = 1000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('HKD$1,000.00');
    });

    it('should read INR cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=INR';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('INR1,000.00');
    });

    it('should read JPY cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=JPY';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('JPY1,000');
    });

    it('should read MXN cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=MXN';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('MXN1,000.00');
    });

    it('should read NZD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=NZD';
        var input = 1000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('NZD$1,000.00');
    });

    it('should read RUB cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=RUB';
        var input = 1000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('RUB2.000,00');
    });

    it('should read SEK cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=SEK';
        var input = 2000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('SEK1.000,00');
    });

    it('should read USD cookie', function() {
        // Arrange
        $cookies.preferences = 'currency=USD';
        var input = 1000;

        // Act
        var result = $filter('marketcurrency')(input, currencyList);

        // Assert
        expect(result).toEqual('$1,000.00');
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
        expect(result).toEqual('£50.00');
        expect($cookies.preferences).toEqual('currency=GBP');
    });
});