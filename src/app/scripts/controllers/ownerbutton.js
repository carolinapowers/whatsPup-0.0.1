//angular.module('whatsPup')
//    .controller('OwnerBtnCtrl', function (Auth) {
//        this.logout = Auth.logout;
//        this.loggedIn = Auth.loggedIn;
//    });

'use strict';

angular.module('whatsPup')
    .controller('OwnerBtnCtrl', function ($firebaseArray, $firebaseObject, Auth, $state) {
        var ref = new Firebase("https://whatspup.firebaseio.com/");

        this.sitterlogin = Auth.sitterlogin;

        Auth.onAuth(function (user) {
            self.user = user;
            if (user === null) {
                console.log('null')
            } else {
                console.log(user)
            }
        });

    });