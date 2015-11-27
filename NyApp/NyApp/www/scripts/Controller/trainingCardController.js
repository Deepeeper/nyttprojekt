app.controller('trainingCardController', function ($scope, $cordovaFile) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

        $scope.saveCardNumber = function(num) {
                $cordovaFile.writeFile(cordova.file.dataDirectory, "jort.txt", num, true)
                .then(function (success) {
                      alert("Success value är" + success);
                },
            function (error) {
                alert("risigt");
            });
        }
    }
    $scope.previous = function () {
        goBack();
    }
});