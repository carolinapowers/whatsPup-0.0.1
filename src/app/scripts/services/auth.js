//'use strict';
//
//angular.module('whatsPup')
//    .factory('Auth', function ($firebaseArray, $firebaseObject) {
//
//        var ref = new Firebase("https://whatspup.firebaseio.com/");
//        var currentUser = {};
//
//        return {
//            onAuth: function (creds) {
//                auth.onAuth(function (data) {
//                    creds(updateUser(data));
//                });
//            },
//            login: function () {
//
//                return auth.authWithOAuthPopup("facebook", function (error, authData) {
//                    console.log(authData)
//                    if (error) {
//                        console.log("Login Failed!", error);
//                    } else {
//                        console.log("Authenticated successfully with payload:", authData);
//                    }
//                }, {
//                    remember: "sessionOnly"
//                })
//            },
//            logout: function () {
//                auth.unauth();
//                console.log("hello")
//            },
//            getUser: function () {
//                return currentUser;
//            }
//        };
//
//        function updateUser(authdUser) {
//            console.log(authdUser)
//            if (authdUser === null) {
//                return null;
//            }
//        }
//    });