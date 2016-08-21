module.exports = function ($scope, AuthenticationService, $mdToast, $mdDialog, $window, $state, $mdSidenav) {

    var self = this;
    
    // menu toggle
    self.toggleMenu = function() {
        $mdSidenav('left').toggle();
    };

    // wanneer speler niet is ingelogd
    self.goToLogin = function () {
        AuthenticationService.goToExternalLogin();
    };

    // uitloggen
    self.logOut = function () {
        AuthenticationService.logOut();
    };

    // dashboard button action
    self.goToDashboard = function () {
        $state.go('app.dashboard');
    };
    
    // popup starten om preferences aan te passen
    self.goToPreferences = function () {
        $mdDialog.show({
            templateUrl: 'views/settings/settings.html',
            controller: 'SettingsController as settingsC',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };

};