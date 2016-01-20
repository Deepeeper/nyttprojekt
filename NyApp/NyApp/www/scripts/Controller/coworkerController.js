app.controller('coworkerController', function ($scope, $cordovaGlobalization, $cordovaFile, $cordovaLocalNotification, $q, $location, DEBUG_DATES) {

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        var currentDate;
        var dateFromFile;

        $scope.dayDelta = 0;
        $scope.cardsDone = 0;

        // Wrap the ngCordova services for file access and date fetching in promises
        // TODO: Make into services
        var fetchDateFromFilePromise = $cordovaFile.readAsText(cordova.file.dataDirectory, "date.txt").then(
            fetchDateFromFileSuccess, failCallback);
        var fetchDateFromAPIPromise = $cordovaGlobalization.dateToString(new Date(), { formatLength: 'short', selector: 'date' }).then(
            fetchDateFromAPISuccess, failCallback);

        // Fetch number of completed cards from file
        $cordovaFile.readAsText(cordova.file.dataDirectory, "jort.txt").then(
            fetchCompletedCardsSuccess, failCallback);

        // Only attempt operations on Date objects after they've been succesfully fetched
        $q.all([fetchDateFromFilePromise, fetchDateFromAPIPromise]).then(function () {
            if (DEBUG_DATES.USEDEBUGDATEFROMFILE == "true") { dateFromFile = new Date(DEBUG_DATES.DEBUGDATEFROMFILE); }
            if (DEBUG_DATES.USEDEBUGDATECURRENT == "true") { currentDate = new Date(DEBUG_DATES.DEBUGCURRENTDATE); }
            var timeDiff = Math.abs(currentDate.getTime() - dateFromFile.getTime());
            $scope.dayDelta = Math.ceil(timeDiff / (1000 * 3600 * 24));
            console.log("DateFromFile = "+dateFromFile);
            console.log("dayDelta: " + $scope.dayDelta
                + " dates:  " + currentDate.getDate() + "   " + dateFromFile.getDate()
                );
        })

        // Callback functions
        function fetchDateFromFileSuccess(result) {
               dateFromFile = new Date(result.toString());
               console.log("datefromfile = " + dateFromFile);
        }
        function fetchDateFromAPISuccess(result) {
            currentDate = new Date(result.value);
            console.log(JSON.stringify(result, null, 4));
        }
        function fetchCompletedCardsSuccess(result) {
            $scope.cardsDone = result;
            console.log(JSON.stringify(result, null, 4));
        }
        function failCallback(error) {
            console.log(JSON.stringify(error, null, 4));
        }

        $scope.previous = function () {
            window.history.back();
        }

        $scope.changeView = function (view, cardControl, dateControl) {
            if($scope.cardsDone < cardControl){
                swal({
                    title:"",
                    text: 'Låses upp när tidigare kort är avklarade.',
                    confirmButtonColor: '#DC232D',
                });
            }
            else if ($scope.dayDelta < dateControl) {
                console.log("Daydelta är: "+$scope.dayDelta);
                console.log("dateControl är: "+dateControl);

                //swal("Låses upp om "+ $scope.dayDelta +" dagar");
                swal({
                    title:"",
                    text: 'Låses upp om '+ (dateControl - $scope.dayDelta) +' dagar',
                    confirmButtonColor: '#DC232D',
                });
            }
            else {
                $location.path(view);
            }
        }
        
    }

});

