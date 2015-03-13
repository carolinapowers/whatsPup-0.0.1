'use strict';

angular.module('whatsPup')
    .controller('AddClientCtrl', function ($firebaseArray, $firebaseObject, Auth, $location) {

        var userInfo = new Firebase('https://whatspup.firebaseio.com/Clients');


        this.logout = function () {
            userInfo.unauth();
            return $location.path('/');

        };

        this.obj = $firebaseArray(userInfo);
        console.log(this.obj)

        this.userArray = {};


        this.newClient = {
            email: '',
            name: '',

        };

        this.addClient = function (user) {
            this.obj.$add(user);
            return this.newUser = {
                email: '',
                name: ''
            };
        }

    });