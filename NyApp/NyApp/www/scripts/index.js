// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

var dateFilePath;
var dateFilePath2;
var fileName2 = "heyy.txt";
(function () {
    "use strict";

    var fileWriter;
    var fileName = "lohhh.txt";
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
      //  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        // document.getElementById('readFile').addEventListener('click', readFile, false);
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function gotFS(fileSystem) {
        fileSystem.root.getFile(fileName, { create: true, exclusive: false }, gotFileEntry, fail);
    };

    function gotFileEntry(fileEntry) {
        dateFilePath = fileEntry;
        fileEntry.createWriter(gotFileWriter, fail);
    };

    function gotFileWriter(writer) {
        writeDateToFile(writer);
    };

    function fail(error) {
        console.log(error.code);
    };

    function fileExist(writer) {
        if (writer.length < 1) {
            return false;
        }
        return true;

    };

    function writeDateToFile(writer) {
        if (!fileExist(writer)) {
            navigator.globalization.dateToString(
                new Date(),
                function (date) { writer.write(date.value) },
                function () { },
                { formatLength: 'short', selector: 'date and time' }
            );
        }
        else {
            console.log("File already exists");
        }
    };

    function readFileDate() {
        dateFilePath.file(
                  function (file) {
                      var reader = new FileReader();
                      reader.onloadend = function (evt) { alert(evt.target.result); };
                      reader.readAsText(file);
                  },
                  function () {
                      console.log("Panic, cant read file!");
                  }
              );
    };

    function writeToFile() {
        /* fileWriter.onwriteend = function (evt) {
         };
         fileWriter.write("tjena!");*/
    }
})();


function makeFile() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
function gotFS(fileSystem) {
    fileSystem.root.getFile(fileName2, { create: true, exclusive: false }, gotFileEntry, fail);
}
function gotFileEntry(fileEntry) {
    dateFilePath2 = fileEntry;
    fileEntry.createWriter(gotFileWriter, fail);
}
function gotFileWriter(writer) {
    writer.write("igen");
}
function readFileDate2() {
    dateFilePath2.file(
              function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function (evt) { alert(evt.target.result); };
                  reader.readAsText(file);
              },
              function () {
                  console.log("Panic, cant read file!");
              }
          );
}
function fail(error) {
    console.log(error.code);
}
function readFileDate1() {
    dateFilePath.file(
              function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function (evt) { alert(evt.target.result); };
                  reader.readAsText(file);
              },
              function () {
                  console.log("Panic, cant read file!");
              }
          );
}

//checks if earlier trainingcards are done!
function checkEarlierCards() {
    return true;
}

function goBack() {
    window.history.back();
}
function trainingCardDone(i) {
    alert(i);
}