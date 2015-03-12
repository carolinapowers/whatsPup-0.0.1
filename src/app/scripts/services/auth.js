'use strict';

angular.module('whatsPup')
    .controller('AuthCtrl', function ($firebaseArray, $firebaseObject) {
        var ref = new Firebase("https://whatspup.firebaseio.com");

        this.login = function () {

            ref.authWithOAuthPopup("facebook", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                }
            });
        }
//        ref.unauth();
    });