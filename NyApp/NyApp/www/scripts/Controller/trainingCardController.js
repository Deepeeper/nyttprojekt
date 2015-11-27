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
    $scope.trainingCard5Done = function () {
        trainingCardDone(5);
    }
    $scope.trainingCard6Done = function () {
        trainingCardDone(6);
    }
    $scope.previous = function () {
        goBack();
    }
    $scope.trainingCard1Read = function () {
        readCardFile();
    }
}]);