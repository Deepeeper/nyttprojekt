app.controller('mainController', function ($scope, $cordovaGlobalization, $cordovaFile) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        // Check if date.txt exists. If true, do nothing, else fetch todays date and write it to the file.
        $cordovaFile.checkFile(cordova.file.dataDirectory, "date.txt").then(
            resultCallback,
            function (error) {
                $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(function (result) {
                    $cordovaFile.writeFile(cordova.file.dataDirectory, "date.txt", result.value, true).then(resultCallback);
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