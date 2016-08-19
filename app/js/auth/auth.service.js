module.exports = function ($rootScope, $window, $state) {
    var service = {};
    var _local = {
        landingRoute: 'landing',
        token: null,
        username: null,
    };

    service.setCredentials = function (username, token) {
        $rootScope.username = username;
        $rootScope.token = token;
        $rootScope.loggedin = true;

        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        _local.username = username;
        _local.token = token;

        // go to dashboard
         $state.go('app.dashboard');
    };

     service.goToDashboard = function () {
        $state.go('app.dashboard');
    };

    service.goToLogin = function () {
        console.log("go to API login");
        $window.location.href = "http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:3000/%23/landing";
    };

    service.getToken = function () {
        if (service.isLoggedIn()) {
            return _local.token;
        }
    };
    service.getUsername = function () {
        if (service.isLoggedIn()) {
            return _local.username;
        }
    };

    service.logOut = function () {
        $rootScope.username = null;
        $rootScope.token = null;
        $rootScope.loggedin = false;
        _local.token = null;
        localStorage.clear();
        $state.go(_local.landingRoute);
    };
    service.authHandler = function (event, next) {
        if (next.name != _local.landingRoute && !service.isLoggedIn()) {
            console.log("no match");
            event.preventDefault();
            $state.go(_local.landingRoute);
        }
    };
    service.isLoggedIn = function () {
        console.log('is logged in', _local.token !== null);
        return _local.token !== null;
    };
    /**
         * On Initialization, prepare the previously stored data for use
         */
    (function PrepareAuthentication() {
        // FIRST VERIFY THE STATE OF THE CLIENT | LOGGED IN OR NOT LOGGED IN ?
        if (localStorage.getItem('token') != null) { // Check if the user is logged or not
            _local.token = localStorage.getItem("token");
            _local.username = localStorage.getItem("username");
            $rootScope.username = _local.username;
        }
    })();

    return service;
};