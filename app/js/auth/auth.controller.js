module.exports = function ($location, AuthenticationService) {

    var urlSet = $location.search();
    if (urlSet.username && urlSet.token) {
        AuthenticationService.setLocalUserValues(urlSet.username, urlSet.token);
    }
    else {
        AuthenticationService.goToExternalLogin();
    }

};