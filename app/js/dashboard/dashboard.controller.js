module.exports = function ($scope, DashBoardService, $mdToast, $state, Socket, $rootScope, $mdDialog) {

    var self = this;
    
    //variabelen
    self.games = {};
    self.total = 0;
    self.selected = [];
    $rootScope.playing = false;
    self.gameStateFilter = '';

    // informatie voor pagination
    self.query = {
        order: '-createdOn',
        limit: 10,
        page: 1
    };

    // opties voor pagination
    self.options = {
        rowSelection: false,
        multiSelect: false,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: false,
        limitOptions: [5, 10, 15, {
            label: 'All',
            value: function () {
                return self.total;
            }
        }]
    };

    // terug naar pagina 1
    self.firstPage = function () {
        self.query.page = 1;
    };

    // berekenen van het totaal aantal games
    DashBoardService.gameStates(function (result) {
        if (result.statusText == 'OK') {
            self.total = result.data[0].count + result.data[1].count + result.data[2].count;
        }
    });

    // ophalen van de games
    self.getGames = function () {
        DashBoardService.getGames(self.total, self.query.page, function (result) {
            if (result.statusText == 'OK') {
                self.games = result.data;
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        });
    };

    // popup starten om game aan te maken
    self.showAddGamePopup = function () {
        $mdDialog.show({
            templateUrl: 'views/dashboard/create.html',
            controller: 'CreateController as CreateC',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        });
    };

    // popup starten om details van een game te bekijken
    self.showDetails = function (selected) {
        var scope = $rootScope.$new();
        scope.params = { game: selected};
        $mdDialog.show({
            scope: scope,
            templateUrl: 'views/dashboard/details.html',
            controller: 'DetailsController as DetailsC',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };

    // ONLOAD
    self.getGames();

};