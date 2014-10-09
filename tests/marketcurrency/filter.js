describe('The marketcurrency filter', function() {
   'use strict';

    var $filter;

    beforeEach(function () {
        module('market.filters');

        inject(function (_$filter_) {
           $filter = _$filter_;
        });
    });

    it('should default to USD', function() {
        // Arrange
        var input = 100;

        // Act
        var result = $filter('marketcurrency')(input);

        // Assert
        expect(result).toEqual('$100.00');
    });
});