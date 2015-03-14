//angular.module('whatsPup')
//    .controller('OwnerBtnCtrl', function (Auth) {
//        this.logout = Auth.logout;
//        this.loggedIn = Auth.loggedIn;
//    });

'use strict';

angular.module('whatsPup')
    .controller('OwnerBtnCtrl', function ($firebaseArray, $firebaseObject, Auth, $state) {
        var ref = new Firebase("https://whatspup.firebaseio.com/");

        //        this.ownerlogin = Auth.sitterlogin;
        this.ownerlogin = function () {

            return ref.authWithOAuthPopup("facebook", function (error, authData) {
                //                console.log(authData)
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    $state.go('owner');
                    console.log("Authenticated successfully with payload:", authData);
                }
            }, {
                remember: "sessionOnly"
            })
        };


        Auth.onAuth(function (user) {
            self.user = user;
            if (user === null) {
                console.log('null')
            } else {
                console.log(user)
            }
        });

    });