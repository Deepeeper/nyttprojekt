app.controller('coworkerController', function ($scope, $cordovaGlobalization, $cordovaFile) {

    var DEBUG = 1;
    var USEDEBUGDATEFROMFILE = false;
    var USEDEBUGCURRENTDATE = false;
    var DEBUGDATEFROMFILE = new Date("1/1/2015");
    var DEBUGCURRENTDATE = new Date("1/1/2015");

    document.addEventListener("deviceready", onDeviceReady, false);
    var currentDate;
    var dateFromFile;
    function onDeviceReady() {

        alert("coworker Controller");
        if (!USEDEBUGDATEFROMFILE) {
            $cordovaFile.readAsText(cordova.file.dataDirectory, "date.txt").then(
                function (result) {
                    dateFromFile = new Date(result.value);
                    if (DEBUG == 1) { alert("Success(rAT)!\ndateFromFile = " + dateFromFile + "\nresult = " + JSON.stringify(result)); }
                }, function (error) {
                    alert("läsfel: " + error);
                });
        } else { dateFromFile = DEBUGDATEFROMFILE; }

        if (!USEDEBUGCURRENTDATE) {
            $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(
                function (result) {
                    currentDate = new Date(result.value);
                    if (DEBUG == 1) { alert("Success(dTS)!\ncurrentDate = " + currentDate + "\nresult.value = " + result.value); }
                }, function (error) {
                    alert("dateToString error: " + error);
                });
        } else { currentDate = DEBUGCURRENTDATE; }



        //Reading the file at coworker startuo
        $cordovaFile.readAsText(cordova.file.dataDirectory, "jort.txt").then(function (result) {
            if (DEBUG == 1) { alert(JSON.stringify(result)); $scope.cardsDone = result; }
        }, function (error) {
            alert("läsfel");
            $scope.cardsDone = 0;
        });

        //if (DEBUG == 1) {
        //    alert("checkDate = " + checkDate);
        //}

        var timeDiff = Math.abs(currentDate.getTime() - dateFromFile.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        alert("diffDays = " + diffDays);

        $scope.checkDate = function () {
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
    }
});

