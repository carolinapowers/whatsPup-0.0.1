'use strict';

angular.module('whatsPup')
    .controller('AuthCtrl', function ($firebaseArray, $firebaseObject, $location, Auth) {
        var ref = new Firebase("https://whatspup.firebaseio.com/");


        this.sitterlogin = Auth.sitterlogin;

        this.logout = Auth.logout;


    });

//'use strict';
//
//angular.module('whatsPup')
//    .controller('AuthCtrl', function ($firebaseArray, $firebaseObject, $location, $state) {
//        var ref = new Firebase("https://whatspup.firebaseio.com/client");
//
//        this.sitterlogin = function () {
//            ref.authWithOAuthPopup("facebook", function (error, authData) {
//                if (error) {
//                    console.log("Login Failed!", error);
//                } else {
//
//                    console.log("Authenticated successfully with payload:", authData);
//                    $state.go('client');
//                }
//                //                remember: "sessionOnly"
//            })
//        };
//
//        this.logout = function () {
//            ref.unauth();
//        };
//
//
//    });