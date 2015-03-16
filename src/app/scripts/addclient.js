// 'use strict';

// angular.module('whatsPup')
//     .controller('AddClientCtrl', function ($firebaseArray, $firebaseObject, Auth) {

//         var userInfo = new Firebase('https://whatspup.firebaseio.com/Clients');


//         this.obj = $firebaseArray(userInfo);
//         //        console.log(this.obj)

//         this.userArray = {};


//         this.newClient = {
//             name: '',
//             pet: '',
//             email: '',
//             phone: '',
//             street: '',
//             city: '',
//             state: '',
//             zip: ''

//         };

//         this.addClient = function (user) {
//             this.obj.$add(user);
//             return this.newUser = {
//                 name: '',
//                 pet: '',
//                 email: '',
//                 phone: '',
//                 street: '',
//                 city: '',
//                 state: '',
//                 zip: ''
//             };
//         }

//     });


'use strict';

angular.module('whatsPup')
   .controller('AddClientCtrl', function ($firebaseArray, $firebaseObject, Auth) {
       var self = this;

       var userUid = Auth.onAuth(function (user) {
           self.user = user;
           if (user === null) {
               console.log('null')
           } else {
               console.log(user.$id)
               return user.$id;
           }
       });

       var userInfo = new Firebase('https://whatspup.firebaseio.com/Clients/' + self.user.$id);
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
           name: '',
           pet: '',
           email: '',
           phone: '',
           street: '',
           city: '',
           state: '',
           zip: '',
           sitterUid: self.user.$id

       };

       this.addClient = function (user) {
           this.obj.$add(user);
           return this.newUser = {
               name: '',
               pet: '',
               email: '',
               phone: '',
               street: '',
               city: '',
               state: '',
               zip: '',
               sitterUid: ''

           };
       }
       // $scope.addClientForm.$setPristine();
       // $scope.currentRecord={};
   });