module.exports = function () {
    //filteren wat getoont moet worden in het dashboard
    return function (input, gameStatus) {
        var i, len = input.length;
        var filtered = [];
        if(gameStatus != "" && gameStatus != "open" && gameStatus != "playing" && gameStatus != "finished"){
            for (i = 0; i < len; i++) {
                if (input[i].createdBy._id == gameStatus){
                    filtered.push(input[i]);
                }
            }
        }
        for (i = 0; i < len; i++) {
            if (input[i].state == gameStatus || gameStatus == "") {
                filtered.push(input[i]);
            }   
        }
        return filtered.reverse();
    };
};