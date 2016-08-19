module.exports = function () {
    return {
        restrict: 'E',
        link: function (scope, element) {
            var tile = scope.tile;
            var className = tile.tile.suit + "-" + tile.tile.name;
            element.addClass(className)
        }
    };
};