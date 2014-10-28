var marketFilters = angular.module('market.filters', ['ngCookies']);
marketFilters.filter('marketcurrency', ['$cookies', '$window', function (cookies, $window) {
    'use strict';
    var currencyList =
        {
            USD: [1, "$", 2],
            GBP: [0.5, "£", 2],
            AUD: [0.5, "$", 2],
            EUR: [0.5, "€", 2],
            CAD: [0.5, "$", 2],
            ARS: [0.5, "AR$", 2]
        },
        localeCurrencies =
        {
            'en-us': 'USD',
            'es-us': 'USD',
            'en-gb': 'GBP',
            'en-au': 'AUD'
        },
        currencyName = '',
        CURRENCY_MULTIPLIER_INDEX = 0,
        CURRENCY_SYMBOL_INDEX = 1,
        CURRENCY_DECIMAL_PLACES_INDEX = 2;
    if (cookies.preferences !== undefined && cookies.preferences.length) {
        angular.forEach(cookies.preferences.split("&"), function (value) {
            if (value.indexOf('currency=') === 0) {
                var tempCurrencyName = value.split('=')[1];
                if (currencyList.hasOwnProperty(tempCurrencyName)) {
                    currencyName = tempCurrencyName;
                }
            }
        });
    }
    if (!currencyName.length) {
        currencyName = localeCurrencies[$window.navigator.userLanguage || $window.navigator.language] || 'USD';
        if (cookies.preferences !== undefined && cookies.preferences.length) {
            cookies.preferences += "&currency=" + currencyName;
        } else {
            cookies.preferences = "currency=" + currencyName;
        }
    }
    return function (input, roundOption) {
        input = input * currencyList[currencyName][CURRENCY_MULTIPLIER_INDEX];

        var numDecimalPlaces = currencyList[currencyName][CURRENCY_DECIMAL_PLACES_INDEX];
        if (numDecimalPlaces > 0) {
            numDecimalPlaces = Math.pow(10, numDecimalPlaces);
            if (roundOption === 'rounddown') {
                input = Math.floor(input * numDecimalPlaces) / numDecimalPlaces;
            } else {
                input = Math.ceil(input * numDecimalPlaces) / numDecimalPlaces;
            }
        }
        return currencyList[currencyName][CURRENCY_SYMBOL_INDEX] +
            input.toFixed(currencyList[currencyName][CURRENCY_DECIMAL_PLACES_INDEX]);
    };
}]);

var marketApp = angular.module('marketApp', ['market.filters']);
marketApp.controller('currencyController', function ($scope) {
    'use strict';
    $scope.amount = 100.50;
});