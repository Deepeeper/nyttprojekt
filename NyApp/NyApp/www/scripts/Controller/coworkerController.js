app.controller('coworkerController', function ($scope, $cordovaGlobalization, $cordovaFile, $q) {

    // Debug toggles
    var DEBUG = 1;
    var USEDEBUGDATEFROMFILE = true;
    var USEDEBUGDATECURRENT = true;
    var DEBUGDATEFROMFILE = new Date("1/1/2015");
    var DEBUGCURRENTDATE = new Date("12/1/2015");

    // asdf
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
        console.log("daydelta 1:" + dayDelta);
        $q.all([fetchDateFromFilePromise, fetchDateFromAPIPromise]).then(function () {
            console.log("2:");
            if (USEDEBUGDATEFROMFILE) { dateFromFile = DEBUGDATEFROMFILE; console.log("datefomrfile: " + dateFromFile); }
            if (USEDEBUGDATECURRENT) { currentDate = DEBUGCURRENTDATE; console.log("currentDate: " + currentDate); }
            var timeDiff = Math.abs(currentDate.getTime() - dateFromFile.getTime());
            console.log("daydelta 2:" + dayDelta);
            dayDelta = Math.ceil(timeDiff / (1000 * 3600 * 24));
            console.log("daydelta 3:" + dayDelta);
        })
        console.log("daydelta 4:" + dayDelta);
        // Callback functions
        function fetchDateFromFileSuccess(result) {
            dateFromFile = new Date(JSON.stringify(result));
            if (DEBUG == 1) { console.log("1"); }
        }
        function fetchDateFromAPISuccess(result) {
            currentDate = new Date(result.value);
            if (DEBUG == 1) { console.log("1"); }
        }
        function failCallback(error) {
            alert(JSON.stringify(error, null, 4));
        }

        // Fetch number of completed cards from file
        $cordovaFile.readAsText(cordova.file.dataDirectory, "jort.txt").then(function (result) {
            $scope.cardsDone = result;
            if (DEBUG == 1) { alert(JSON.stringify(result)); }
        }, function (error) {
            alert("läsfel");
            $scope.cardsDone = 0;
        });

        $scope.checkDate = function () {
            console.log("daydelta 5:" + dayDelta);
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

