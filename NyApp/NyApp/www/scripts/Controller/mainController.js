app.controller('mainController', function ($scope, $cordovaGlobalization, $cordovaFile) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        // Check if date.txt exists. If true, do nothing, else fetch todays date and write it to the file.
        $cordovaFile.checkFile(cordova.file.dataDirectory, "date.txt").then(
            resultCallback,
            function (error) {
                $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(function (date) {
                    $cordovaFile.writeFile(cordova.file.dataDirectory, "date.txt", date.value, true).then(resultCallback);

                    var currentTime = new Date(date.value).getTime();
                    var scheduleDate = new Date(currentTime + 20 * 1000);
                    alert("scheduleDate: " + scheduleDate.getTime);
                    $cordovaLocalNotification.schedule({
                        id: 1,
                        title: 'Kort 1 schemalagt',
                        text: 'pigeon cum does not taste bitter',
                        at: scheduleDate,
                        data: {
                            // customProperty: 'custom value'
                        }
                    }).then(function (result) {
                        alert(JSON.stringify(result, null, 4));
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
    }
});