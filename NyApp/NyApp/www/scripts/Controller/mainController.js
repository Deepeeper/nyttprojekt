app.controller('mainController', function ($scope, $cordovaGlobalization, $cordovaFile, $cordovaLocalNotification, $location, $q, DEBUG_DATES) {

    var timeToSchedule = 1000 * 86400 * 4; // milliseconds * 86,400s=24h * number of days

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        $scope.debug = false;
        // Check if date.txt exists. If true, do nothing, else fetch todays date, write it to the file and schedule a notification.
        $cordovaFile.checkFile(cordova.file.dataDirectory, "date.txt").then(
            resultCallback,
            function (error) {
                $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(function (date) {
                    $cordovaFile.writeFile(cordova.file.dataDirectory, "date.txt", date.value, true).then(resultCallback);
                    if (DEBUG_DATES.USEDEBUGDATEFROMFILE == 'true') {
                        var currentTime = new Date(DEBUG_DATES.DEBUGDATEFROMFILE).getTime();
                    } else {
                        var currentTime = new Date(date.value).getTime();
                    }
                    var scheduleDate = new Date(currentTime + timeToSchedule);
                    $cordovaLocalNotification.schedule({
                        id: 1,
                        title: 'Tele Coaching',
                        text: 'Glöm ej göra färdigt kort 1',
                        at: scheduleDate,
                        icon: 'ic_notification.png',
                        smallIcon: 'ic_notification_small.png'
                    }).then(function (result) {
                        console.log("Notification scheduled to " + scheduleDate.toDateString() + " " + scheduleDate.toTimeString());
                    });
                }, resultCallback);
            });

        // Deletes respective file when invoked
        $scope.removeCount = function () {
            $cordovaFile.removeFile(cordova.file.dataDirectory, "jort.txt").then(
                resultCallback, resultCallback);
        }
        $scope.removeDate = function () {
            $cordovaFile.removeFile(cordova.file.dataDirectory, "date.txt").then(
                resultCallback, resultCallback);
        }

        // Callback functions
        function resultCallback(result) {
            console.log(JSON.stringify(result, null, 4));
        }

        $scope.changeView = function (view) {
            $location.path(view);
        }

    }
});