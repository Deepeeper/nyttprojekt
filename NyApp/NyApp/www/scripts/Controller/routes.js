
app.config(function ($routeProvider) {
    $routeProvider

      .when('/', {
          templateUrl: 'PartialViews/main.html',
          controller: 'mainController'
      })

     .when('/leader', {
         templateUrl: 'PartialViews/leader.html',
         controller: 'coworkerController'

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

      .when('/trainingCard5', {
          templateUrl: 'PartialViews/trainingCard5.html',
          controller: 'trainingCardController'
      })

      .when('/trainingCard6', {
          templateUrl: 'PartialViews/trainingCard6.html',
          controller: 'trainingCardController'
      })

      .when('/leaderTrainingCard1', {
          templateUrl: 'PartialViews/leaderTrainingCard1.html',
          controller: 'trainingCardController'
      })

      .when('/leaderTrainingCard2', {
          templateUrl: 'PartialViews/leaderTrainingCard2.html',
          controller: 'trainingCardController'
      })

      .when('/leaderTrainingCard3', {
          templateUrl: 'PartialViews/leaderTrainingCard3.html',
          controller: 'trainingCardController'
      })

      .when('/leaderTrainingCard4', {
          templateUrl: 'PartialViews/leaderTrainingCard4.html',
          controller: 'trainingCardController'
      })

      .when('/leaderTrainingCard5', {
          templateUrl: 'PartialViews/leaderTrainingCard5.html',
          controller: 'trainingCardController'
      })

      .when('/leaderTrainingCard6', {
          templateUrl: 'PartialViews/leaderTrainingCard6.html',
          controller: 'trainingCardController'
      })
});

