app.controller('trainingCardController', function ($scope, $cordovaFile) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

        $cordovaFile.readAsText(cordova.file.dataDirectory, "jort.txt").then(function (result) {
            console.log(JSON.stringify(result)); $scope.cardsDone = result; 
        }, function (error) {
            $scope.cardsDone = 0;
        });

        $scope.saveCardNumber = function(num) {
                $cordovaFile.writeFile(cordova.file.dataDirectory, "jort.txt", num, true)
                .then(function (success) {
                      $scope.cardsDone = num;
                },
            function (error) {
                console.log(JSON.stringify(error, null, 4));
            });
        }
    }
    $scope.previous = function () {
        window.history.back();
    }
});