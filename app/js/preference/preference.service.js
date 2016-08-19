module.exports = function ($rootScope) {
    var service = {};

    getThemePreference = function () {
        return localStorage.getItem('Theme');
    };

    getBlockThemePreference = function () {
        return localStorage.getItem('BlockTheme');
    };

    service.preferenceHandler = function () {
        if (getBlockThemePreference() == undefined) {
            localStorage.setItem('BlockTheme', 'tilelist2');
        }
        if (getThemePreference() == undefined) {
            localStorage.setItem('Theme', 'default');
        }

        $rootScope.BlockTheme = getBlockThemePreference();
        $rootScope.Theme = getThemePreference();
    };


    return service;
};