'use strict';

angular.module('whatsPup', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap', 'firebase', ])

.constant('FIREBASE_URL', 'https://whatspup.firebaseio.com/')

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/view/main.html',
            controller: 'AuthCtrl',
            controllerAs: "app"
        });

    $urlRouterProvider.otherwise('/');
});