module.exports = function ($window) {
    var self = this;

    self.themes = ['default', 'blue','red','dark'];
    self.blockThemes = ['tilelist1', 'tilelist2'];

    self.changeTheme = function (theme) {
        localStorage.setItem('Theme', theme);
        $window.location.reload();
    };
    self.changeBlockTheme = function (blockTheme) {
        localStorage.setItem('BlockTheme', blockTheme);
        $window.location.reload();
    };
};