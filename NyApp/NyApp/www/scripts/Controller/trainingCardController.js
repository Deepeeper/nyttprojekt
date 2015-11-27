app.controller('trainingCardController', function ($scope, $cordovaFile) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        document.getElementById('done1').addEventListener('click', saveCardNumberToFile1, false);
        document.getElementById('done2').addEventListener('click', saveCardNumberToFile2, false);
        document.getElementById('done2').addEventListener('click', saveCardNumberToFile3, false);
        document.getElementById('done2').addEventListener('click', saveCardNumberToFile4, false);
        document.getElementById('done2').addEventListener('click', saveCardNumberToFile5, false);
        document.getElementById('done2').addEventListener('click', saveCardNumberToFile6, false);

        function saveCardNumber(num) {
                $cordovaFile.writeFile(cordova.file.dataDirectory, "jort.txt", num, true)
                .then(function (success) {
                      alert("Success vaue är" + success);
                },
            function (error) {
                alert("risigt");
            });
        }
    }




    function saveCardNumberToFile1() {
        alert("Vi ska nu spara nummer 1 till filen!");
        saveCardNumber(1);
    }
    function saveCardNumberToFile2() {
        alert("Vi ska nu spara nummer 2 till filen!");
    }
    function saveCardNumberToFile3() {
        alert("Vi ska nu spara nummer 3 till filen!");
    }
    function saveCardNumberToFile4() {
        alert("Vi ska nu spara nummer 4 till filen!");
    }
    function saveCardNumberToFile5() {
        alert("Vi ska nu spara nummer 5 till filen!");
    }
    function saveCardNumberToFile6() {
        alert("Vi ska nu spara nummer 6 till filen!");
    }
   
    $scope.previous = function () {
        goBack();
    }
    //$scope.trainingCard1Read = function () {
    //    readCardFile();
    //}
});