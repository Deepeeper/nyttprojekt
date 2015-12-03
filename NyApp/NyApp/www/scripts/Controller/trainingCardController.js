app.controller('trainingCardController', function ($scope, $cordovaGlobalization, $cordovaFile, $cordovaLocalNotification) {

    // 16.00 = 57,600s
    // 24h = 86,400s
    var timeToSchedule = 1000 * 60 * 60 * 24 * 4;

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

        $scope.updateSchedule = function (num) {
            alert("ding");
            $cordovaLocalNotification.cancel(num).then(function (result) {
                alert("Notification " + num + " avbruten");
            });
            $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).
            then(function (date) {
                var currentTime = new Date(date.value).getTime();
                var scheduleDate = new Date(currentTime + 20 * 1000);
                newNum = num + 1;
                alert("blsblsbslbasd");
                $cordovaLocalNotification.schedule({
                    id: newNum,
                    title: 'Kort schemalagt' + newNum,
                    text: 'Confucius say… dont let your affection give you an infection – put some protection on that erection.',
                    at: scheduleDate,
                    data: {
                        // customProperty: 'custom value'
                    }
                }).then(function (result) {
                    alert("kort schemalagt: " + newNum);
                });
            });

        }

    }
    $scope.previous = function () {
        window.history.back();
    }
});