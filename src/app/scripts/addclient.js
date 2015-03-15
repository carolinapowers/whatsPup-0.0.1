'use strict';

angular.module('whatsPup')
    .controller('AddClientCtrl', function ($firebaseArray, $firebaseObject, Auth) {

        var userInfo = new Firebase('https://whatspup.firebaseio.com/Clients');


        this.obj = $firebaseArray(userInfo);
        //        console.log(this.obj)

        this.userArray = {};


        this.newClient = {
            email: '',
            name: '',
            pet: '',
            street: '',
            city: '',
            state: '',
            zip: ''

        };

        this.addClient = function (user) {
            this.obj.$add(user);
            return this.newUser = {
                email: '',
                name: '',
                pet: '',
                street: '',
                city: '',
                state: '',
                zip: ''
            };
        }

    });