app.controller('trainingCardController', ['$scope', function ($scope) {
    $scope.trainingCard1Done = function () {
        trainingCardDone(1);
    }
    $scope.trainingCard2Done = function () {
        trainingCardDone(2);
    }
    $scope.trainingCard3Done = function () {
        trainingCardDone(3);
    }
    $scope.trainingCard4Done = function () {
        trainingCardDone(4);
    }
}]);