
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
        /***********************************************/
        /*                 Testitest                   */
     .when('/ledareTest', {
        templateUrl: 'PartialViews/ledareTest.html',
        controller: 'coworkerController'
     })
        .when('/leaderTrainingCard1Test', {
            templateUrl: 'PartialViews/leaderTrainingCard1Test.html',
            controller: 'trainingCardController'
        })
        .when('/leaderTrainingCard2Test', {
            templateUrl: 'PartialViews/leaderTrainingCard2Test.html',
            controller: 'trainingCardController'
        })
        .when('/leaderTrainingCard3Test', {
            templateUrl: 'PartialViews/leaderTrainingCard3Test.html',
            controller: 'trainingCardController'
        })
        .when('/leaderTrainingCard4Test', {
            templateUrl: 'PartialViews/leaderTrainingCard4Test.html',
            controller: 'trainingCardController'
        })
        .when('/leaderTrainingCard5Test', {
            templateUrl: 'PartialViews/leaderTrainingCard5Test.html',
            controller: 'trainingCardController'
        })
        .when('/leaderTrainingCard6Test', {
            templateUrl: 'PartialViews/leaderTrainingCard6Test.html',
            controller: 'trainingCardController'
        })
        /****************************************************/
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

