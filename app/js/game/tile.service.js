module.exports = function () {
    var service = {};

    service.easyVerification = function (tile1, tile2) {
        console.log(tile1);
        if (_sameid(tile1._id, tile2._id)) {
            console.log("cant match with the same tile");
        }

    }

    function _sameid(id1, id2) {
        return id1 === id2;
    }

    return service;
};