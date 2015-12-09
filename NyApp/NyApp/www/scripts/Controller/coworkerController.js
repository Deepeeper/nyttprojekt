app.controller('coworkerController', function ($scope, $cordovaGlobalization, $cordovaFile, $cordovaLocalNotification, $q, $location) {

    // Debug toggles
    var DEBUG = 1;
    var USEDEBUGDATEFROMFILE = true;
    var USEDEBUGDATECURRENT = true;
    var DEBUGDATEFROMFILE = new Date("1/1/2015");
    var DEBUGCURRENTDATE = new Date("1/2/2015");

    // asdf
    var currentDate;
    var dateFromFile;
    $scope.dayDelta = 0;
    $scope.cardsDone = 0;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        // Wrap the ngCordova services for file access and date fetching in promises
        // TODO: Make into service
        var fetchDateFromFilePromise = $cordovaFile.readAsText(cordova.file.dataDirectory, "date.txt").then(
            fetchDateFromFileSuccess, failCallback);
        var fetchDateFromAPIPromise = $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(
            fetchDateFromAPISuccess, failCallback);

        // Fetch number of completed cards from file
        $cordovaFile.readAsText(cordova.file.dataDirectory, "jort.txt").then(
            fetchCompletedCardsSuccess, failCallback);

        // Only attempt operations on Date objects after they've been succesfully fetched
        $q.all([fetchDateFromFilePromise, fetchDateFromAPIPromise]).then(function () {
            if (USEDEBUGDATEFROMFILE) { dateFromFile = DEBUGDATEFROMFILE; }
            if (USEDEBUGDATECURRENT) { currentDate = DEBUGCURRENTDATE; }
            var timeDiff = Math.abs(currentDate.getTime() - dateFromFile.getTime());
            $scope.dayDelta = Math.ceil(timeDiff / (1000 * 3600 * 24));
        })

        // Callback functions
        function fetchDateFromFileSuccess(result) {
            dateFromFile = new Date(JSON.stringify(result));
            if (DEBUG == 1) { console.log("1"); }
        }
        function fetchDateFromAPISuccess(result) {
            currentDate = new Date(result.value);
            if (DEBUG == 1) { console.log("1"); }
        }
        function fetchCompletedCardsSuccess(result) {
            $scope.cardsDone = result;
            if (DEBUG == 1) { console.log(JSON.stringify(result)); }
        }
        function failCallback(error) {
            console.log(JSON.stringify(error, null, 4));
        }

        $scope.previous = function () {
            window.history.back();
        }

        $scope.cancel = function () {
            $cordovaLocalNotification.cancel(1).then(function (result) {
                alert("Notification avbruten");
            });
        };

        $scope.d;
        $scope.c;
        $scope.g = function () {
            if (parseInt($scope.c) * 7 <= parseInt($scope.d)) {
                return parseInt($scope.d) + parseInt(4);
            }
            else {
                return parseInt($scope.d) + parseInt(11 - parseInt($scope.d % 7));
            }
        }
        /*****************************************************************/
        /*                       TestilitestTest                         */
        //Har lagt till $location i app.controller
        $scope.changeViewLeaderCard1 = function (view) {
            $location.path('/leaderTrainingCard1');
        }
        $scope.changeViewLeaderCard2 = function (view) {
            $location.path('/leaderTrainingCard2');
        }
        $scope.changeViewLeaderCard3 = function (view) {
            $location.path('/leaderTrainingCard3');
        }
        $scope.changeViewLeaderCard4 = function (view) {
            $location.path('/leaderTrainingCard4');
        }
        $scope.changeViewLeaderCard5 = function (view) {
            $location.path('/leaderTrainingCard5');
        }
        $scope.changeViewLeaderCard6 = function (view) {
            $location.path('/leaderTrainingCard6');
        }
        /****************************************************************/
    }

});

