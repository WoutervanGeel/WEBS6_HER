require('angular/angular');
require('angular-ui-router');
require('angular-aria/angular-aria');
require('angular-animate/angular-animate');
require('angular-material/angular-material');
require('angular-messages/angular-messages');
require('angular-material-data-table/dist/md-data-table.min.js');
// Create your app
var app = angular.module('webs6', ['ngMaterial', 'ui.router', 'ngMessages', 'ngAnimate', 'md.data.table']);
// DIRECTIVES
app.directive('tile', require('./directives/tile.directive.js'));
app.directive('matchedtile', require('./directives/matchedTile.directive.js'));
// Filters
app.filter('tileById', require('./util/tileById.filter.js'));
app.filter('foundBy', require('./util/foundBy.filter.js'));
app.filter('spectate', require('./util/spectate.filter.js'));
// SERVICES
app.service('APIService', require('./util/api.service.js'));
app.service('AuthenticationService', require('./auth/auth.service.js'));
app.service('DashBoardService', require('./dashboard/dashboard.service.js'));
app.service('GameService', require('./game/game.service.js'));
app.service('PreferenceService', require('./preference/preference.service.js'));
app.service('TileService', require('./game/tile.service.js'));

// Factories
app.factory('HttpRequestInterceptor', require('./util/requestinterceptor.factory.js'));
app.factory('Socket', require('./util/socket.factory.js'));

// CONTROLLERS
app.controller('MenuController', require('./menu/menu.controller.js'));
app.controller('AuthController', require('./auth/auth.controller.js'));
app.controller('DashboardController', require('./dashboard/dashboard.controller.js'));
app.controller('GameController', require('./game/game.controller.js'));
app.controller('PreferenceController', require('./preference/preference.controller.js'));


app.run(function (AuthenticationService, $rootScope, PreferenceService) {
    $rootScope.$on('$stateChangeStart', AuthenticationService.authHandler);
    PreferenceService.preferenceHandler();
});

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, $httpProvider) {
    // Prepare our http requests with Token and username
    $httpProvider.interceptors.push('HttpRequestInterceptor');

    // Themes
    $mdThemingProvider.theme('default')
        .primaryPalette('green', {
            'default': '400',
        })
        .accentPalette('lime', {
            'default': 'A400'
        })
        .backgroundPalette('grey', {
            'default': '50'
        });
    $mdThemingProvider.theme('blue')
        .primaryPalette('blue')      
        .accentPalette('deep-orange')
        .backgroundPalette('grey',
        {
            'default': '50'
        });

    $mdThemingProvider.theme('red')
        .primaryPalette('red')      
        .accentPalette('blue-grey')
        .backgroundPalette('grey',
        {
            'default': '50'
        });

    $mdThemingProvider.theme('dark')
        .primaryPalette('grey',{
            'default': '900'
        })      
        .accentPalette('light-blue')
        .backgroundPalette('grey',
        {
            'default': '50'
        });


    //$mdThemingProvider.setDefaultTheme('default');
    $mdThemingProvider.alwaysWatchTheme(true);

    $stateProvider

        .state('landing', {
            url: '/landing?username&token',
            templateUrl: 'views/login/landing.html',
            controller: 'AuthController as AuthC'
        })
        .state('app', {
            abstract: true,
            templateUrl: 'views/menu.html',
            controller: 'MenuController as MenuC'
        })
        .state('app.dashboard', {
            url: '/dashboard',
            views: {
                'menuContent': {
                    templateUrl: 'views/dashboard/dashboard.html',
                    controller: 'DashboardController as DashC'
                }
            }
        })
        .state('app.game', {
            url: '/game/:id',
            views: {
                'menuContent': {
                    templateUrl: 'views/game/gamepage.html',
                    controller: 'GameController as GameC'
                }
            }
        })
        ;

    $urlRouterProvider.otherwise('/dashboard');
});