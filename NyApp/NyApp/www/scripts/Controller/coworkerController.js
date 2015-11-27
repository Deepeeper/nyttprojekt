﻿app.controller('coworkerController', function ($scope, $cordovaGlobalization, $cordovaFile) {

    var DEBUGALERTS = true;
    var DEBUGFILEDATE = false;


    document.addEventListener("deviceready", onDeviceReady, false);
    var currentDate;
    var dateFromFile;
    function onDeviceReady() {
        alert("coworker Controller");
        $cordovaFile.readAsText(cordova.file.dataDirectory, "date.txt").then(function (result) {
            dateFromFile = new Date(JSON.stringify(result));
            if(DEBUGALERTS) { alert("Success(rAT)!\ndateFromFile = " + dateFromFile + "\nresult = " + JSON.stringify(result)); }
        }, function (error) {
            alert("läsfel: " + error);
        });

        $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(
            function (result) {
                currentDate = new Date(result.value);
                if (DEBUGALERTS) { alert("Success(dTS)!\ncurrentDate = " + currentDate + "\nresult.value = " + result.value); }
            },
            function (error) {
                alert("dateToString error: " + error);
            });
        document.getElementById('lastest').addEventListener('click', test, false);

        function test() {
            $cordovaFile.readAsText(cordova.file.dataDirectory, "jort.txt").then(function (result) {
                if (DEBUGALERTS) { alert(JSON.stringify(result)); }
            }, function (error) {
                alert("läsfel");
            });
        }
        if(DEBUGALERTS) { alert("checkDate = " + checkDate());
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
