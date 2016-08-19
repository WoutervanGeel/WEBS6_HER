describe('Filter test', function () {
    var $filter;
    var currentPlayer = 'aw.vanzijderveld@student.avans.nl';

    beforeEach(module('webs6'));

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    it('should return true when id is in te list', function () {
        var players = []

        players.push(
            {
                _id: currentPlayer
            },
            {
                _id: 'id2'
            },
            {
                _id: '3'
            });

        var result = $filter('spectate')(players, currentPlayer);
        console.log(result);
        expect(result).to.be.true;
    });

    it('should return false when id is in te list', function () {
        var players = []

        players.push(
            {
                _id: '12313'
            },
            {
                _id: 'id2'
            },
            {
                _id: '3'
            });

        var result = $filter('spectate')(players, currentPlayer);
        console.log(result);
        expect(result).to.be.false;
    });
});