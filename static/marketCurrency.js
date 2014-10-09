var marketFilters = angular.module('market.filters', ['ngCookies']);
marketFilters.filter('marketcurrency', ['$filter', '$cookies', function (filter, cookies) {
    'use strict';
    var currencyList =
        {
            USD: [1, "$"],
            GBP: [0.5, "£"],
            AUD: [0.5, "$"],
            EUR: [0.5, "€"],
            CAD: [0.5, "$"],
            ARS: [0.5, "AR$"]
        },
        currencyName = 'USD';
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
    return function (input) {
        input = input * currencyList[currencyName][0];
        return filter('currency')(input, currencyList[currencyName][1]);
    };
}]);

var marketApp = angular.module('marketApp', ['market.filters']);
marketApp.controller('currencyController', function ($scope) {
    'use strict';
    $scope.amount = 100.50;
});