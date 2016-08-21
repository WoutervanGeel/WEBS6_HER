module.exports = function ($rootScope) {
    return function (input, gameStatus) {
        var i, len = input.length;
        var filtered = [];
        for (i = 0; i < len; i++) {
            if(gameStatus == "username"){
                if (input[i].createdBy._id == $rootScope.username){
                    filtered.push(input[i]);
                }
            } else {
                if (input[i].state == gameStatus || gameStatus == "") {
                    filtered.push(input[i]);
                }   
            }
        }
        return filtered.reverse();
    };
};