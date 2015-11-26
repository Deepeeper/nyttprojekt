﻿app.controller('coworkerController', ['$scope', function ($scope) {
    $scope.initCardValue = function () {
        $scope.cardsDone = getCardValue();
    }

    var dateFromFile = new Date("12/31/2015");
    var currentDate = new Date("1/1/2016");

    $scope.checkDate = function(){
        console.log(dateFromFile);
        console.log(currentDate);
        var timeDiff = Math.abs(currentDate.getTime() - dateFromFile.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    };

    $scope.checkCard = function () {
        return getCardValue();
    }

    $scope.previous = function () {
        goBack();
    }
}]);