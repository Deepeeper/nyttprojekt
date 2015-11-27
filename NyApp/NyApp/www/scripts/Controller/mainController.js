app.controller('mainController', function ($scope, $cordovaGlobalization, $cordovaFile) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        //Sucess = filen finns i systemet.
        $cordovaFile.checkFile(cordova.file.dataDirectory, "date.txt").then(
            function (success) {
                alert("fil finns");
            },
            function (error) {
                $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(
             function (result) {
            $cordovaFile.writeFile(cordova.file.dataDirectory, "date.txt", result.value, true)
            .then(function (success) { alert("Success vaue är" + success); });
             },
                  function (error) {
              alert("risigt");
              });
            });


    }
});