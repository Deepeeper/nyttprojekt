app.controller('coworkerController', function ($scope, $cordovaGlobalization, $cordovaFile) {
    document.addEventListener("deviceready", onDeviceReady, false);
    var currentDate;
    var dateFromFile;
    function onDeviceReady() {
        alert("coworker Controller");
        $cordovaFile.readAsText(cordova.file.dataDirectory, "fucks666.txt").then(function (result) {
            dateFromFile = new Date(JSON.stringify(result));
        }, function (error) {
            alert("läsfel");
        });

        $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date and time' }).then(
            function (result) {
                currentDate = new Date(result.value);
                alert("Success!\ncurrentDate = " + currentDate.getDate + "\nresult.value = " + result.value);
            },
            function (error) {

            });
    }

    $scope.initCardValue = function () {
        $scope.cardsDone = getCardValue();
    }

    
    

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
