module.exports = function ($location, AuthenticationService, $mdDialog) {
    // Read the params
    if ($location.search().username != undefined) {
        var username = $location.search().username;
        var token = $location.search().token;

        // Parse it into our application
        AuthenticationService.setCredentials(username, token);
    }
    else {
        console.log('show dialog')
        $mdDialog.show({
            templateUrl: 'views/login/login.html',
            controller: 'MenuController as MenuC',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        });
    }


};