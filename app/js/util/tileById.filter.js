module.exports = function () {
    return function (input, id) {
        var i, len = input.length;
        for (i = 0; i < len; i++) {
            if (input[i]._id == id) {
                return input[i];
            }
        }
        return null;
    };
};