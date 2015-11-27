app.controller('coworkerController', function ($scope, $cordovaGlobalization, $cordovaFile, $q) {

    // Debug toggles
    var DEBUG = 1;
    var USEDEBUGDATEFROMFILE = false;
    var USEDEBUGDATECURRENT = false;
    var DEBUGDATEFROMFILE = new Date("1/1/2015");
    var DEBUGCURRENTDATE = new Date("1/1/2015");

    //
    var currentDate;
    var dateFromFile;
    var dayDelta = 0;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        // Wrap ngCordova services in promises
        var fetchDateFromFilePromise = $cordovaFile.readAsText(cordova.file.dataDirectory, "date.txt").then(
            fetchDateFromFileSuccess, failCallback);
        var fetchDateFromAPIPromise = $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(
            fetchDateFromAPISuccess, failCallback);

        // Only attempt operations on Date objects after they've been succesfully fetched
        $q.all([fetchDateFromFilePromise, fetchDateFromAPIPromise]).then(function () {
            if(!USEDEBUGDATEFROMFILE) { dateFromFile = DEBUGDATEFROMFILE; }
            if(!USEDEBUGCURRENTDATE) { currentDate = DEBUGCURRENTDATE; }
            var timeDiff = Math.abs(currentDate.getTime() - dateFromFile.getTime());
            dayDelta = Math.ceil(timeDiff / (1000 * 3600 * 24));
        })

        // Callback functions
        function fetchDateFromFileSuccess(result) {
            dateFromFile = new Date(JSON.stringify(result));
            if (DEBUG == 1) { console.log("1"); alert("Success(rAT)!\ndateFromFile = " + dateFromFile + "\nresult = " + JSON.stringify(result)); }
        }
        function fetchDateFromAPISuccess(result) {
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
            return dayDelta;
        };

        $scope.checkCard = function () {
            return getCardValue();
        }

        $scope.previous = function () {
            goBack();
        }
    }

});

