var app = angular.module('TeleCoaching', ['ngRoute', 'ngCordova']);
app.constant('MAX_CARDS', 6);

app.constant("DEBUG_DATES", {
    "DEBUGDATEFROMFILE": "1/1/2015",
    "DEBUGCURRENTDATE": "12/7/2015",
    "USEDEBUGDATEFROMFILE": "true",
    "USEDEBUGDATECURRENT": "true"
});

app.factory('dates', function ($cordovaFile, $q) {

    var dateFromFile;
    var currentDate;
   
    return {
        getDateFromFile: function() {
            console.log("kissfisk");
            if (angular.isDefined(dateFromFile)) { console.log("isdefined"); return $q.when(dateFromFile); }
            return  $cordovaFile.readAsText(cordova.file.dataDirectory, "date.txt").then(
              function (result) {
                  console.log("not defined!!!!d");
                  dateFromFile = new Date(JSON.stringify(result));
                  return dateFromFile;
              });
        },
        getCurrentDate: function () {
            console.log("fisk-2");
        }
    };
});


app.value("dateFromFile", "");