'use strict';

angular.module('whatsPup')
    .controller('AddClientCtrl', function ($firebaseArray, $firebaseObject, Auth) {

        var userInfo = new Firebase('https://whatspup.firebaseio.com/Clients');
        this.loggedIn = Auth.loggedIn;

//        this.getUser = Auth.getUser;
//
//        this.currentUser = Auth.currentUser;
//        console.log(this.getUser);

        var authData = userInfo.getAuth();
        if (authData) {
            console.log("Authenticated user with uid:", authData.uid);
        }


        this.obj = $firebaseArray(userInfo);
        console.log(this.obj)

        this.userArray = {};


        this.newClient = {
            email: '',
            lastName: '',
            firstName: '',
            pet: '',
            street: '',
            city: '',
            zip: '',
            sitterUid: authData.uid

        };

        this.addClient = function (user) {
            this.obj.$add(user);
            return this.newUser = {
                email: '',
                lastName: '',
                firstName: '',
                pet: '',
                street: '',
                city: '',
                zip: '',
                sitterUid: ''

            };
        }

    });