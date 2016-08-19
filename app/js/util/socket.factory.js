module.exports = function ($mdToast, $state) {
    var service = {};

    service.connectGame = function (id) {
        var socket = io('http://mahjongmayhem.herokuapp.com?gameId=' + id);
        console.log("Connected");

        socket.on('start', function () {
            $mdToast.show($mdToast.simple().textContent("Game started"));
            $state.go('app.game', { id: id });
        });

        socket.on('end', function () {
            $mdToast.show($mdToast.simple().textContent("Game ended").action('LEAVE').highlightAction(true)).then(function (response) {
                if (response == 'ok') {
                    $state.go('app.dashboard');
                }
            });
            // optie om naar dashboard te gaan?
        });

        socket.on('playerJoined', function (data) {
            $mdToast.show($mdToast.simple().textContent(data._id + " joined"));
        });
        return socket
    }
    return service;
};