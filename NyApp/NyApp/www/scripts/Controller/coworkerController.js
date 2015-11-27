app.controller('coworkerController', function ($scope, $cordovaGlobalization, $cordovaFile, $q) {

    var DEBUG = 1;
    var USEDEBUGDATEFROMFILE = false;
    var USEDEBUGDATECURRENT = false;
    var DEBUGDATEFROMFILE = new Date("1/1/2015");
    var DEBUGCURRENTDATE = new Date("1/1/2015");

    document.addEventListener("deviceready", onDeviceReady, false);
    var currentDate;
    var dateFromFile;
    var dayDifferential = 0;

    function onDeviceReady() {

        var readAsTextPromise = $cordovaFile.readAsText(cordova.file.dataDirectory, "date.txt").then(
            readAsTextSuccess, failCallback);
        var dateToStringPromise = $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(
            dateToStringSuccess, failCallback);

        $q.all([readAsTextPromise, dateToStringPromise]).then(function () {
            var timeDiff = Math.abs(currentDate.getTime() - dateFromFile.getTime());
            dayDifferential = Math.ceil(timeDiff / (1000 * 3600 * 24));
        })

        function readAsTextSuccess(result) {
            dateFromFile = new Date(JSON.stringify(result));
            if (DEBUG == 1) { console.log("1"); alert("Success(rAT)!\ndateFromFile = " + dateFromFile + "\nresult = " + JSON.stringify(result)); }
        }
        function dateToStringSuccess(result) {
            currentDate = new Date(result.value);
            if (DEBUG == 1) { console.log("2"); alert("Success(dTS)!\ncurrentDate = " + currentDate + "\nresult.value = " + result.value); }
        }
        function failCallback(error) {
            alert(JSON.stringify(error, null, 4));
        }

        // Fetch number of completed cards from file
        $cordovaFile.readAsText(cordova.file.dataDirectory, "jort.txt").then(function (result) {
            if (DEBUG == 1) { alert(JSON.stringify(result)); $scope.cardsDone = result; }
        }, function (error) {
            alert("läsfel");
            $scope.cardsDone = 0;
        });


        $scope.checkDate = function () {
            alert("dayDifferntial: " + dayDifferential);
            return dayDifferential;
        };

        $scope.checkCard = function () {
            return getCardValue();
        }

        $scope.previous = function () {
            goBack();
        }
    }

});

