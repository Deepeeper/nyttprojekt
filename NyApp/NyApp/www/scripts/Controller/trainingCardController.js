﻿app.controller('trainingCardController', function ($scope, $cordovaFile, $cordoveGlobalization, $cordovoLocalNotification) {

    var timeToSchedule = 1000 * 60 * 60 * 24 * 4;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

        $cordovaFile.readAsText(cordova.file.dataDirectory, "jort.txt").then(function (result) {
            alert(JSON.stringify(result)); $scope.cardsDone = result;
        }, function (error) {
            alert("läsfel");
            $scope.cardsDone = 0;
        });

        $scope.saveCardNumber = function (num) {
            $cordovaFile.writeFile(cordova.file.dataDirectory, "jort.txt", num, true)
            .then(function (success) {
                $scope.cardsDone = num;
            },
        function (error) {
            alert(JSON.stringify(error, null, 4));
        });
        }

        $scope.updateSchedule = function (num) {
            $cordovaLocalNotification.cancel(num).then(function (result) {
                alert("Notification " + num + " avbruten");
            });
            $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).
            then(function (date) {
                var currentTime = new Date(date.value).getTime();
                var scheduleDate = new Date(currentTime + 20 * 1000);
                alert("currentTime: " + currentTime);
                alert("scheduleDate: " + scheduleDate.getDate());
                $cordovaLocalNotification.schedule({
                    id: num+1,
                    title: 'Kort schemalagt' + (num+1),
                    text: 'Confucius say… dont let your affection give you an infection – put some protection on that erection.',
                    at: scheduleDate,
                    data: {
                        // customProperty: 'custom value'
                    }
                }).then(function (result) {
                    alert("kort schemalagt: " + (num+1));
                });
            });

        }

    }
    $scope.previous = function () {
        window.history.back();
    }
});