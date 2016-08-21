module.exports = function ($rootScope) {
    var service = {};

    //thema's
    service.themes = ['default', 'blue','fancy'];
    service.boardThemes = ['boardSet1', 'boardSet2'];

    //opvragen van het huidige thema
    service.getThemeSetting = function () {
        if (localStorage.getItem('Theme') == null)
            service.setThemeSetting(service.themes[0]);
        return localStorage.getItem('Theme');
    };

    //opvragen van het huidige bordthema
    service.getBoardThemeSetting = function () {
        if (localStorage.getItem('BoardTheme') == null)
            service.setBoardThemeSetting(service.boardThemes[0]);
        return localStorage.getItem('BoardTheme');
    };

    // setter voor thema
    service.setThemeSetting = function (value) {
        localStorage.setItem('Theme', value);
    };

    //setter voor bordthema
    service.setBoardThemeSetting = function (value) {
        localStorage.setItem('BoardTheme', value);
    };

    // regelen van gekozen settings
    service.preferenceHandler = function () {
        // var result = document.getElementsByClassName("BoardStyle");
        // var wrappedResult = angular.element(result);
        // console.log(wrappedResult);
        // wrappedResult[0].setAttribute('href', "css/"+service.getBoardThemeSetting()+".css");

        $rootScope.Theme = service.getThemeSetting();
    };

    return service;
};