module.exports = function () {
    return {
        restrict: 'E',
        link: function (scope, element) {

            var tile = scope.tile;
            var leftPos = 36.5;
            var topPos = 45;
            var zPos = 3;

            element.css({ 'left': (tile.xPos) * leftPos + 'px', 'top': tile.yPos * topPos + 'px', 'z-index': tile.zPos });
            if (scope.tile.zPos > 0) {
                element.css({ 'left': ((tile.xPos) * leftPos + (tile.zPos * zPos)) + 'px', 'top': (tile.yPos * topPos - (tile.zPos * zPos)) + 'px' })
            }
            element.addClass(tile.tile.suit + "_" + tile.tile.name);
            element.addClass('boardItem');
        }
    };
};