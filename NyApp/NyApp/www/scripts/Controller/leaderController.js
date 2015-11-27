app.controller('leaderController', ['$scope', function ($scope) {
    $scope.previous = function () {
        window.history.back();
    }

}]);