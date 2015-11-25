
app.config(function ($routeProvider) {
    $routeProvider

      .when('/', {
          templateUrl: 'PartialViews/main.html',
          controller: 'mainController'

      })

     .when('/leader', {
          templateUrl: 'PartialViews/leader.html',
          controller: 'leaderController'

     })

    .when('/coworker', {
        templateUrl: 'PartialViews/coworker.html',
        controller: 'coworkerController'
    })

        .when('/trainingCard1', {
        templateUrl: 'PartialViews/trainingCard1.html',
        controller: 'trainingCardController'
        })

      .when('/trainingCard2', {
          templateUrl: 'PartialViews/trainingCard2.html',
          controller: 'trainingCardController'
      })

      .when('/trainingCard3', {
          templateUrl: 'PartialViews/trainingCard3.html',
          controller: 'trainingCardController'
      })

      .when('/trainingCard4', {
          templateUrl: 'PartialViews/trainingCard4.html',
          controller: 'trainingCardController'
      })

});

