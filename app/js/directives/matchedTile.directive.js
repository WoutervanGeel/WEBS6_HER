module.exports = function () {
    return {
        restrict: 'E',
        link: function (scope, element) {
            var tile = scope.tile;
            element.addClass(tile.tile.suit + "_" + tile.tile.name);
        }
    };
};