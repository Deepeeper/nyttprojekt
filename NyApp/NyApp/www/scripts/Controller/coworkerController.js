app.controller('coworkerController', ['$scope', function ($scope) {
    $scope.initCardValue = function () {
        alert("Nu körs inint!");
        readCardFile();
        $scope.cardsDone = getCardValue();
        alert($scope.cardsDone);
    }
    
    //readCardFile();
    //$scope.cardsDone = getCardValue();

    //var dateFromFile = new Date("12/31/2015");
    //var currentDate = new Date("1/1/2016");

    //$scope.checkDate = function(){
    //    console.log(dateFromFile);
    //    console.log(currentDate);
    //    var timeDiff = Math.abs(currentDate.getTime() - dateFromFile.getTime());
    //    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //    return diffDays;
    //};

    $scope.readFiles = function(){
        readFileDate2();
    }

    $scope.makeFile = function () {
        makeFile();
     
    }
}]);