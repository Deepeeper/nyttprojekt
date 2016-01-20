var app = angular.module('TeleCoaching', ['ngRoute', 'ngCordova']);
app.constant('TotalCards', '6');
app.factory('$getDaysDelta', ['$q', '$cordovaGlobalization', '$cordovaFile', function ($q, $cordovaGlobalization, $cordovaFile) {
    
    var currentDate;
    var dateFromFile;

    var fetchDateFromFilePromise = $cordovaFile.readAsText(cordova.file.dataDirectory, "date.txt").then(
    fetchDateFromFileSuccess, failCallback);
    var fetchDateFromAPIPromise = $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(
        fetchDateFromAPISuccess, failCallback);

    // Only attempt operations on Date objects after they've been succesfully fetched
    $q.all([fetchDateFromFilePromise, fetchDateFromAPIPromise]).then(function () {
        if (USEDEBUGDATEFROMFILE) { dateFromFile = DEBUGDATEFROMFILE; }
        if (USEDEBUGDATECURRENT) { currentDate = DEBUGCURRENTDATE; }
        var timeDiff = Math.abs(currentDate.getTime() - dateFromFile.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    })

    function fetchDateFromFileSuccess(result) {
        dateFromFile = new Date(JSON.stringify(result));
    }
    function fetchDateFromAPISuccess(result) {
        currentDate = new Date(result.value);
    }
    function failCallback(error) {
        console.log(JSON.stringify(error, null, 4));
    }
}]);