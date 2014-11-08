Number.prototype.formatMarketCurrency = function (n, x, s, c) {
    'use strict';
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(n);

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

var marketFilters = angular.module('market.filters', ['ngCookies']);
marketFilters.filter('marketcurrency', ['$cookies', '$window', function (cookies, $window) {
    'use strict';
    var localeCurrencies =
        {
            'en-us': 'USD',
            'es-us': 'USD',
            'en-gb': 'GBP',
            'en-au': 'AUD'
        },
        currencyName = '',
        CURRENCY_MULTIPLIER_INDEX = 0,
        CURRENCY_SYMBOL_INDEX = 1,
        CURRENCY_DECIMAL_PLACES_INDEX = 2,
        CURRENCY_THOUSANDS_CHAR_INDEX = 3,
        CURRENCY_DECIMAL_CHAR_INDEX = 4;
    return function (input, currencyList, roundOption) {
        var multipliedInput = input,
            numDecimalPlaces;
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
        multipliedInput = multipliedInput * currencyList[currencyName][CURRENCY_MULTIPLIER_INDEX];

        numDecimalPlaces = currencyList[currencyName][CURRENCY_DECIMAL_PLACES_INDEX];
        if (numDecimalPlaces > -1) {
            numDecimalPlaces = Math.pow(10, numDecimalPlaces);
            if (roundOption === 'rounddown') {
                multipliedInput = Math.floor(multipliedInput * numDecimalPlaces) / numDecimalPlaces;
            } else {
                multipliedInput = Math.ceil(multipliedInput * numDecimalPlaces) / numDecimalPlaces;
            }
        }
        return (currencyList[currencyName][CURRENCY_SYMBOL_INDEX] +
        multipliedInput.formatMarketCurrency(
                currencyList[currencyName][CURRENCY_DECIMAL_PLACES_INDEX],
                3,
                currencyList[currencyName][CURRENCY_THOUSANDS_CHAR_INDEX],
                currencyList[currencyName][CURRENCY_DECIMAL_CHAR_INDEX]
            ));
    };
}]);

var marketApp = angular.module('marketApp', ['market.filters']);
marketApp.controller('currencyController', function ($scope, $http) {
    'use strict';
    $scope.amount = 100.50;
    $http.get('http://localhost:3000/api/latest.json').
        success(function (data) {
            $scope.currencyList = data;
        }).
        error(function () {
            $scope.currencyList = undefined;
        });
});