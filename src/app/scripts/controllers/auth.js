'use strict';

angular.module('whatsPup')
    .controller('AuthCtrl', function ($firebaseArray, $firebaseObject, Auth) {

        var ref = new Firebase("https://whatspup.firebaseio.com/");

        this.sitterlogin = Auth.sitterlogin;

    });