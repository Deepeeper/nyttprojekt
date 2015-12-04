app.controller('trainingCardController', function ($scope, $cordovaGlobalization, $cordovaFile, $cordovaLocalNotification) {

    // 16.00 = 57,600s
    // 24h = 86,400s
    var USEDEBUGSCHEDULING = true;
    var DEBUGSCHEDULETIME = 20 * 1000; //20s
    var timeToSchedule = 1000 * (57600 + 86400) * 4; // milliseconds * (16h=57,600s + 86,400s=24h) * number of days

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        $scope.cardsDone;
        $cordovaFile.readAsText(cordova.file.dataDirectory, "jort.txt").then(function (result) {
            console.log(JSON.stringify(result)); $scope.cardsDone = result;
        }, function (error) {
            $scope.cardsDone = 0;
        });

        $scope.saveCardNumber = function (num) {
            $cordovaFile.writeFile(cordova.file.dataDirectory, "jort.txt", num, true)
            .then(function (success) {
                $scope.cardsDone = num;
            },
        function (error) {
            console.log(JSON.stringify(error, null, 4));
        });
        }

        // TODO: Fixa för sista kortet
        // TODO: Lägg till knappar i alla kort
        $scope.updateSchedule = function (num) {
            $cordovaLocalNotification.cancel(num).then(function (result) {
                console.log("Notification " + num + " avbruten");
            });
            $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).
            then(function (date) {
                if (USEDEBUGSCHEDULING) {
                    var currentTime = new Date().getTime();
                    var scheduleDate = new Date(currentTime + DEBUGSCHEDULETIME);
                } else {
                    var currentTime = new Date(date.value).getTime();
                    var scheduleDate = new Date(currentTime + timeToSchedule);
                }
                newNum = num + 1;
                $cordovaLocalNotification.schedule({
                    id: newNum,
                    title: 'Kort schemalagt ' + newNum,
                    text: 'Test TCController',
                    at: scheduleDate,
                    data: {
                        // customProperty: 'custom value'
                    }
                }).then(function (result) {
                    console.log("Kort nummer " + newNum);
                    console.log("Notification scheduled to " + scheduleDate.toDateString() + " " + scheduleDate.toTimeString());
                });
            });

        }

    }
    $scope.previous = function () {
        window.history.back();
    }
});