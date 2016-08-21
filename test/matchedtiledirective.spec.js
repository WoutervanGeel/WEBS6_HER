describe('Directive test', function () {
    var $scope, $compile;

    beforeEach(module('webs6'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
    }));

    it('should create a matchedtile element with Dragon-Red', function () {
        $scope.tile = {
            tile: {
                suit: 'Dragon',
                name: 'Red'
            }
        };
        var element = $compile('<matchedtile></matchedtile>')($scope);
        $scope.$digest();
        console.log(element);
        expect(element.hasClass("Dragon_Red")).to.be.true;
    });

    it('should create a tile element with Dragon-Red', function () {
        $scope.tile = {
            tile: {
                suit: 'Dragon',
                name: 'Red'
            }
        };
        var element = $compile('<tile></tile>')($scope);
        $scope.$digest();
        console.log(element);
        expect(element.hasClass('Dragon_Red')).to.be.true;
    });
    
});