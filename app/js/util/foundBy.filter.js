module.exports = function () {
    return function (input, player) {
        var i, len = input.length;
        var filtered = [];
        var previousId = 0;
        for (i = 0; i < len; i++) {
            if (input[i].match.foundBy == player && input[i].match.otherTileId != previousId) {
                filtered.push(input[i]);
                previousId = input[i]._id;
            }
        }
        return filtered.reverse();
    };
};