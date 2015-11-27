app.controller('coworkerController', function ($scope, $cordovaGlobalization, $cordovaFile) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        alert("coworker Contorller");
        $cordovaFile.readAsText(cordova.file.dataDirectory, "fucks666.txt").then(function (result) {
            alert(JSON.stringify(result));
        }, function (error) {
            alert("läsfel");
        });
        document.getElementById('lastest').addEventListener('click', test, false);

        function test() {
            $cordovaFile.readAsText(cordova.file.dataDirectory, "jort.txt").then(function (result) {
                alert(JSON.stringify(result));
            }, function (error) {
                alert("läsfel");
            });
        }
    }

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
});
