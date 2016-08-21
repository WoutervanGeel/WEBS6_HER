describe('GameState filter test', function () {
    var $filter;
    var currentPlayer = 'w.vangeel@student.avans.nl';

    var games = [];
    games.push(
        {
            "_id": "1",
            "createdBy": {
                "_id": "1",
                "name": "testUser",
            },
            "state": "open",
        },
        {
            "_id": "2",
            "createdBy": {
                "_id": "1",
                "name": "testUser",
            },
            "state": "open",
        },
        {
            "_id": "3",
            "createdBy": {
                "_id": "1",
                "name": "testUser",
            },
            "state": "open",
        },
        {
            "_id": "4",
            "createdBy": {
                "_id": "w.vangeel@student.avans.nl",
                "name": "Wouter van Geel",
            },
            "state": "playing",
        },
        {
            "_id": "5",
            "createdBy": {
                "_id": "w.vangeel@student.avans.nl",
                "name": "Wouter van Geel",
            },
            "state": "finished",
        },
        {
            "_id": "6",
            "createdBy": {
                "_id": "4",
                "name": "SecondTestUser",
            },
            "state": "finished",
        }
    );

    beforeEach(module('webs6'));

    beforeEach(inject(function (_$filter_, _$rootScope_) {
        $filter = _$filter_;
        $rootScope = _$rootScope_.$new();
    }));

    it('should return 3 for number of open games in the list', function () {
        var tempGames = games;

        var result = $filter('gameState')(tempGames, "open");
        expect(result).to.be.length(3);
    });
    
    it('should return 1 for number of playing games in the list', function () {
        var tempGames = games;

        var result = $filter('gameState')(tempGames, "playing");
        expect(result).to.be.length(1);
    });
    
    it('should return 2 for number of finished games in the list', function () {
        var tempGames = games;

        var result = $filter('gameState')(tempGames, "finished");
        expect(result).to.be.length(2);
    });
    
    it('should return 6 for all games in the list', function () {
        var tempGames = games;

        var result = $filter('gameState')(tempGames, "");
        expect(result).to.be.length(6);
    });
    
    it('should return 2 for number of games created by the user in the list', function () {
        var tempGames = games;

        var result = $filter('gameState')(tempGames, currentPlayer);
        expect(result).to.be.length(2);
    });

});