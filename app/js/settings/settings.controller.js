module.exports = function ($window, SettingsService, $mdDialog) {
    var self = this;

    self.theme = SettingsService.getThemeSetting();
    self.boardTheme = SettingsService.getBoardThemeSetting();
    self.themes = SettingsService.themes;
    self.boardThemes = SettingsService.boardThemes;

    // popup hiden
    self.closeDialog = function () {
        $mdDialog.hide();
    }

    // opslaan van gekozen settings
    self.saveSettings = function () {
        SettingsService.setThemeSetting(self.theme);
        SettingsService.setBoardThemeSetting(self.boardTheme)
        $window.location.reload();
    };
};