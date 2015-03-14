'use strict';

angular.module('whatsPup')
    .controller('AuthCtrl', function ($firebaseArray, $firebaseObject, Auth) {
        var ref = new Firebase("https://whatspup.firebaseio.com/");
        this.sitterlogin = Auth.sitterlogin;
        //        this.loggedIn = Auth.loggedIn;
        Auth.onAuth(function (user) {
            self.user = user;
            if (user === null) {
                console.log('null')
            } else {
                console.log(user)
            }
        });

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