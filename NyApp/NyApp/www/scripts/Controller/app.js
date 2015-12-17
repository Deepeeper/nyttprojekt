var app = angular.module('TeleCoaching', ['ngRoute', 'ngCordova']);
app.constant('MAX_CARDS', 6);

app.constant("DEBUG_DATES", {
    "DEBUGDATEFROMFILE": "1/1/2015",
    "DEBUGCURRENTDATE": "12/7/2015",
    "USEDEBUGDATEFROMFILE": "false",
    "USEDEBUGDATECURRENT": "false"
});

app.value("dateFromFile", "");