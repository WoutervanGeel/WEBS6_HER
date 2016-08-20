module.exports = function ($rootScope) {
    var service = {};

    service.themes = ['default', 'blue','fancy'];
    service.boardThemes = ['boardSet1', 'boardSet2'];

    service.getThemeSetting = function () {
        if (localStorage.getItem('Theme') == null)
            service.setThemeSetting(service.themes[0]);
        return localStorage.getItem('Theme');
    };

    service.getBoardThemeSetting = function () {
        if (localStorage.getItem('BoardTheme') == null)
            service.setBoardThemeSetting(service.boardThemes[0]);
        return localStorage.getItem('BoardTheme');
    };

    service.setThemeSetting = function (value) {
        localStorage.setItem('Theme', value);
    };

    service.setBoardThemeSetting = function (value) {
        localStorage.setItem('BoardTheme', value);
    };

    service.preferenceHandler = function () {
        $rootScope.BoardTheme = service.getBoardThemeSetting();
        $rootScope.Theme = service.getThemeSetting();
    };

    return service;
};