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

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    it('should return 3 for number of open games in the list', function () {
        var tempGames = games;

        var result = $filter('gameState')(tempGames, "open");
        expect(result).to.be.length(3);
    });

    // it('should return false when id is in te list', function () {
    //     var players = []

    //     players.push(
    //         {
    //             _id: '1'
    //         },
    //         {
    //             _id: 'id2'
    //         },
    //         {
    //             _id: '3'
    //         });

    //     var result = $filter('spectate')(players, currentPlayer);
    //     console.log(result);
    //     expect(result).to.be.false;
    // });
});