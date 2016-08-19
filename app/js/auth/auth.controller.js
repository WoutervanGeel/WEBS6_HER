module.exports = function ($location, AuthenticationService, $mdDialog) {
    
    if ($location.search().username != undefined) {
        // username is gezet
        var username = $location.search().username;
        var token = $location.search().token;

        //save values in service
        AuthenticationService.setLocalUserValues(username, token);
    }
    else {
        // weergeven van landingpage navigatie popup
        $mdDialog.show({
            templateUrl: 'views/login/login.html',
            controller: 'MenuController as MenuC',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        });
    }


};