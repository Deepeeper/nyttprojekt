app.controller('trainingCardController', function ($scope, $cordovaGlobalization, $cordovaFile, $cordovaLocalNotification, $q, DEBUG_DATES, MAX_CARDS) {

    // 16.00 = 57,600s
    // 24h = 86,400s
    var DEBUG = 0;
    var USEDEBUGSCHEDULING = true;
    var DEBUGSCHEDULETIME = 20 * 1000; //20s

    var timeToSchedule = 1000 * 57600; // 16h
    var dayInMS = 1000 * 86400; // 24h
    var currentDate;
    var dateFromFile;
    var dayDelta;

    $scope.cardsDone = 0;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        // TODO: Make into service
        var fetchDateFromFilePromise = $cordovaFile.readAsText(cordova.file.dataDirectory, "date.txt").then(
            fetchDateFromFileSuccess, failCallback);
        var fetchDateFromAPIPromise = $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(
            fetchDateFromAPISuccess, failCallback);

        // Only attempt operations on Date objects after they've been succesfully fetched
        $q.all([fetchDateFromFilePromise, fetchDateFromAPIPromise]).then(function () {
            if (DEBUG_DATES.USEDEBUGDATEFROMFILE == "true") { dateFromFile = new Date(DEBUG_DATES.DEBUGDATEFROMFILE); }
            if (DEBUG_DATES.USEDEBUGDATECURRENT == "true") { currentDate = new Date(DEBUG_DATES.DEBUGCURRENTDATE); }
            var timeDiff = Math.abs(currentDate.getTime() - dateFromFile.getTime());
            dayDelta = Math.ceil(timeDiff / (1000 * 3600 * 24));
            alert(
       "dayDelta = " + dayDelta
       + " dates:  " + currentDate.getDate() + "   " + dateFromFile.getDate()
       );
        })

        // Callback functions
        function fetchDateFromFileSuccess(result) {
            dateFromFile = new Date(result.toString());
            alert("datefromfile = " + dateFromFile);
        }
        function fetchDateFromAPISuccess(result) {
            currentDate = new Date(result.value);
            alert(currentDate);
        }
        function fetchCompletedCardsSuccess(result) {
            $scope.cardsDone = result;
            if (DEBUG == 1) { console.log(JSON.stringify(result)); }
        }
        function failCallback(error) {
            alert(JSON.stringify(error, null, 4));
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
            alert(dateFromFile);
            console.log("NUM: " + num);
            console.log("DayDelta " + dayDelta);
            var newNum = num + 1;
            newNum = newNum.toString();
            var scheduleDate;

            if (num * 7 <= dayDelta) {
                scheduleDate = new Date(dateFromFile.getTime() + (dayDelta * dayInMS) + 4 * dayInMS + timeToSchedule);
                console.log("if " + dateFromFile.toDateString());
            } else {
                scheduleDate = new Date(dateFromFile.getTime() + (dayDelta * dayInMS) + (11 - dayDelta % 7) * dayInMS + timeToSchedule);
            }
            console.log("scheduleDate: " + scheduleDate);

            if (num < MAX_CARDS) {
                $cordovaLocalNotification.schedule({
                    id: newNum,
                    title: 'Tele Coaching',
                    text: 'Glöm ej göra färdigt kort ' + newNum,
                    at: scheduleDate,
                    icon: 'ic_notification.png',
                    smallIcon: 'ic_notification_small.png',
                    data: {
                        // customProperty: 'custom value'
                    }
                }).then(function (result) {
                    alert("Notification scheduled to " + scheduleDate.toDateString() + " " + scheduleDate.toTimeString());
                });
            }

        }

    }
    $scope.previous = function () {
        window.history.back();
    }

});