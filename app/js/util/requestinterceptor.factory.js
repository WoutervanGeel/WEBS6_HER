module.exports = function () {
    // token en username meegeven
    var inject = {
        request: function (config) {
            config.headers['x-username'] = localStorage.getItem("username");
            config.headers['x-token'] = localStorage.getItem("token");
            return config;
        }
    };
    return inject;
};