app.controller('trainingCardController', function ($scope, $cordovaGlobalization, $cordovaFile, $cordovaLocalNotification, $q) {

    // 16.00 = 57,600s
    // 24h = 86,400s
    var DEBUG = 0;
    var USEDEBUGSCHEDULING = true;
    var DEBUGSCHEDULETIME = 20 * 1000; //20s
    var USEDEBUGDATEFROMFILE = true;
    var USEDEBUGDATECURRENT = true;
    var DEBUGDATEFROMFILE = new Date("1/1/2015");
    var DEBUGCURRENTDATE = new Date("1/2/2015");

    var timeToSchedule = 1000 * 57600; // 16h
    var dayInMS = 1000 * 86400; // 24h
    var currentDate;
    var dateFromFile;
    var dayDelta;

    $scope.cardsDone;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        // TODO: Make into service
        var fetchDateFromFilePromise = $cordovaFile.readAsText(cordova.file.dataDirectory, "date.txt").then(
            fetchDateFromFileSuccess, failCallback);
        var fetchDateFromAPIPromise = $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(
            fetchDateFromAPISuccess, failCallback);

        // Only attempt operations on Date objects after they've been succesfully fetched
        $q.all([fetchDateFromFilePromise, fetchDateFromAPIPromise]).then(function () {
            if (USEDEBUGDATEFROMFILE) { dateFromFile = DEBUGDATEFROMFILE; }
            if (USEDEBUGDATECURRENT) { currentDate = DEBUGCURRENTDATE; }
            var timeDiff = Math.abs(currentDate.getTime() - dateFromFile.getTime());
            dayDelta = Math.ceil(timeDiff / (1000 * 3600 * 24));
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
            console.log("NUM: " + num);
            console.log("DayDelta " + dayDelta);
            var newNum = num + 1;
            var scheduleDate;

            if (num * 7 <= dayDelta) {
                scheduleDate = new Date(dateFromFile.getTime() + (dayDelta * 86400 * 1000) + 4 * dayInMS);
                console.log("scheduleDate = new Date(dateFromFile.getTime() + (dayDelta * 86400 * 1000) + 4 * dayInMs)");
            } else {
                scheduleDate = new Date(dateFromFile.getTime() + (dayDelta * 86400 * 1000) + (11 - dayDelta % 7) * dayInMS);
                console.log("scheduleDate = new Date(dateFromFile.getTime() + (dayDelta * 86400 * 1000) + (11 - dayDelta % 7) * dayInMs);");
            }

            $cordovaLocalNotification.schedule({
                id: newNum,
                title: 'Kort ' + newNum + ' schemalagt',
                text: 'Kort ' + newNum,
                at: scheduleDate,
                data: {
                    // customProperty: 'custom value'
                }
            }).then(function (result) {
                console.log("Notification scheduled to " + scheduleDate.toDateString() + " " + scheduleDate.toTimeString());
            });

        }

    }
    $scope.previous = function () {
        window.history.back();
    }

});