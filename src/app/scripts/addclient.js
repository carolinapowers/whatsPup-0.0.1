'use strict';

angular.module('whatsPup')
    .controller('AddClientCtrl', function ($firebaseArray, $firebaseObject) {
        var self = this;
        var userInfo = new Firebase('https://whatspup.firebaseio.com/Clients');


        this.obj = $firebaseArray(userInfo);
        console.log(this.obj)

        this.userArray = {};


        this.newUser = {
            email: '',
            name: '',
        };

        this.addUser = function (user) {
            this.obj.$add(user);
            return this.newUser = {
                email: '',
                name: '',
            };
        }

    });