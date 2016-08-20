module.exports = function ($rootScope, $window, $state) {
    var service = {};
    //data nodig voor navigatie
    var _data = {
        local_url: 'http://localhost:3000/%23/',
        api_url: 'http://mahjongmayhem.herokuapp.com/auth/avans',
        landingRoute: 'landing'
    }
    //data van de ingelogde user
    var _localUser = {
        token: null,
        username: null,
    };

    //setter van _localUser waardes
    service.setLocalUserValues = function (username, token) {
        //opslaan van de waardes
        $rootScope.username = username;
        $rootScope.token = token;
        $rootScope.loggedIn = true;

        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        
        _localUser.username = username;
        _localUser.token = token;

        // verwijzen naar dashboard
         $state.go('app.dashboard');
    };

    //getter van _localUser token
    service.getToken = function () {
        if (service.isLoggedIn()) {
            //is ingelogd
            return _localUser.token;
        }
    };
    
    //getter van _localUser username
    service.getUsername = function () {
        if (service.isLoggedIn()) {
            // is ingelogd
            return _localUser.username;
        }
    };
    
    //controle of ingelogd
    service.isLoggedIn = function () {
        return _localUser.token !== null;
    };
    
    //starten van externe login
    service.goToExternalLogin = function () {
        $window.location.href = _data.api_url + "?callbackUrl=" + _data.local_url + _data.landingRoute;
    };

    //uitloggen
    service.logOut = function () {
        //verwijderen van username en token
        $rootScope.username = null;
        $rootScope.token = null;
        $rootScope.loggedIn = false;
        
        _localUser.token = null;
        
        localStorage.clear();
        
        //verwijzen naar de landingpage
        $state.go(_data.landingRoute);
    };
    
    //route controle om te controleren of de gebruiker wel de pagina mag bezoeken
    service.authHandler = function (event, next) {
        // kijken of niet ingelogd en route is anders dan landingpage
        if (next.name != _data.landingRoute && !service.isLoggedIn()) {
            // route is anders dan de landingpage en user niet ingelogd
            event.preventDefault();
            
            //verwijzen naar landingpage
            $state.go(_data.landingRoute);
        }
    };

    // Bij het initialiseren ophalen van al bekende informatie van de gebruiker
    (function PrepareAuthentication() {
        if (localStorage.getItem('token') != null) {
            //ingelogd
            
            //vullen van lokale waardes
            _localUser.token = localStorage.getItem("token");
            _localUser.username = localStorage.getItem("username");
            $rootScope.username = _localUser.username;
        }
    })();

    return service;
};