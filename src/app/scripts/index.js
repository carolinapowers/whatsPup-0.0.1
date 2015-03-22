'use strict';

angular.module('whatsPup', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap', 'firebase'])

.constant('FIREBASE_URL', 'https://whatspup.firebaseio.com/')

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/view/main.html',
            controller: 'AuthCtrl',
            controllerAs: "app"
        })

    .state('client', {
        url: '/client',
        templateUrl: 'app/view/addclient.html',
        controller: 'AddClientCtrl',
        controllerAs: 'client'
    })

    .state('navbar', {
        url: '/nav',
        templateUrl: 'app/view/navbar.html',
        controller: 'NavCtrl',
        controllerAs: 'nav'
    })

    .state('owner', {
        url: '/owner',
        templateUrl: 'app/view/ownerpage.html',
        controller: 'OwnerBtnCtrl',
        controllerAs: 'ownerbtn'
    })

    .state('newvisit', {
        templateUrl: 'app/view/newvisit.html',
        url: '/newvisit/:user/:clientId/',
        controller: 'NewVisitCtrl',
        controllerAs: 'newvisit'
    })
    

    $urlRouterProvider.otherwise('/');
})

.factory('Auth', function ($firebaseObject, $state) {
    var auth = new Firebase('https://whatspup.firebaseio.com');
    var currentUser = {};

    return {
        /**
         * Wrapper for `onAuth` that filters the `auth` object
         * through the `updateUser()` function
         */
        onAuth: function (creds) {
            auth.onAuth(function (data) {
                creds(updateUser(data));
            });
        },
        /**
         * Wrapper for `authWithOAuthPopup()` for each login option.
         */


        sitterlogin: function () {

            return auth.authWithOAuthPopup("facebook", function (error, authData) {
                //                console.log(authData)
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    $state.go('client');
                    console.log("Authenticated successfully with payload:", authData);
                }
            }, {
                remember: "sessionOnly"
            })
        },


        /** Wrapper for the unauth() functionality to logout
         */
        logout: function () {
            auth.unauth();
            $state.go('home');
            console.log("hello");
        },
        /** Wrapper to allow the main controller to check if a user is currently 
         * Logged in currently
         */
        loggedIn: function () {
            if (auth.getAuth()) {
                return true;
            }
        },
        /**
         *Get the current user.
         */
        getUser: function () {
            return currentUser;
        }
    };

    /**
     * Tranform the `authdUser` object from `$firebaseAuth` into a full User
     * record in the `/users` collection.
     *
     * @param {Object} authdUser from $firebaseAuth.getAuth()
     * @return {Object} from $firebase.$asObject()
     */
    function updateUser(authdUser) {
        console.log(authdUser)
        if (authdUser === null) {
            return null;
        }
        console.log("This will break if you login with anything other than FB")
            /**
             * Create a reference to the users collection within Firebase
             * Then create a child of the users collection named after the
             * authdUser's Facebook ID
//             */
        var fbUser = auth.child('petsitter').child(authdUser.facebook.id);

        console.log(fbUser);
        //            //
        //            //    // Update the authdUser's information in Firebase
        fbUser.update({
            uid: authdUser.facebook.id,
            facebook: authdUser.facebook,
            fullName: authdUser.facebook.displayName,
            firstName: authdUser.facebook.cachedUserProfile.first_name,
            lastName: authdUser.facebook.cachedUserProfile.last_name,
            avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url,
            gender: authdUser.facebook.cachedUserProfile.gender
        });
        //    // Set user to the object reference of authdUser
        fbUser = $firebaseObject(auth
                .child('petsitter')
                .child(authdUser.facebook.id)
            )
            //            //
            //            //    //stores the user information for use elsewhere
        currentUser = fbUser;
        //            //
        return fbUser;
    }
})
//
//.factory('Upload', function () {
//    
//    return {
//   
//        uploadImg : function () {
//            
//       document.getElementById("upload_widget_opener").addEventListener("click", function() {
//            cloudinary.openUploadWidget({ 
//                cloud_name: 'whatspup',
//                upload_preset: 'npnf6uka'
//            }, 
//            function(error, result) { 
//                console.log(result[0].url)
////                self.image = result[0].url;
////                return self.image 
//                return self.image = result[0].url
//            });
//            
//        }, false);
//}
//    }
//
//    
//});

.factory ('SendEmail', function ($http) {
    var self = this;
    var currentdate = new Date();
    var time = (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " at " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return {
//         widget : function () { document.getElementById("upload_widget_opener").addEventListener("click", function() {
//            cloudinary.openUploadWidget({ 
//                cloud_name: 'jaredstevick',
//                upload_preset: 'xnpszqid'
//            }, 
//            function(error, result) { 
//                console.log(result[0].url)
//                
//                self.image = result[0].url;
//                return self.image;
//            });
////            return self.image
////            console.log(self.image);
//       }, false);
//                              },
    
        sentEmail: function () {
            $http({
                method: "POST",
                url: "https://mandrillapp.com/api/1.0/messages/send-template.json",
                data: {
                    'key': 'SjfF7oGr1BHLUnBlnSF20A',
                    "template_name": "whatspup1",
                    "template_content": [
                        {
                            "name": "example name",
                            "content": "example content"
                        }
                    ],
                    'message': {
                        'from_email': 'whatspupupdate@gmail.com',
                        'from_name': 'WhatsPup',
                        'headers': {
                            'Reply-To': 'whatspupupdate@gmail.com'
                        },
                        
                        'subject': 'New Visit Update from WhatsPup',
                        
                        'to': [
                            {
                                'email': this.getEmail,
                                'name': 'name',
                                'type': 'to'
                        }],
                    
                    "global_merge_vars": [
                        {
                            "name": "time",
                           "content": time
                        },
                        {
                            "name": "food",
                            "content": this.food
                        },
                        {
                            "name": "water",
                            "content": this.water
                        },
                        {
                            "name": "play",
                            "content": this.play
                        },
                        {
                            "name": "treats",
                            "content": this.treats
                        },
                        {
                            "name": "meds",
                            "content": this.meds
                        },
                        {
                            "name": "mess",
                            "content": this.mess
                        },
                        {
                            "name": "packages",
                            "content": this.packages
                        },
                        {
                            "name": "mail",
                            "content": this.mail
                        },
                        {
                            "name": "plants",
                            "content": this.plants
                        },
                        {
                            "name": "other",
                            "content": this.other
                        },
                        {
                            "name": "message",
                            "content": this.message
                        },
                        {
                            "name": "image",
                            "content": this.image
                        }
                    ]
                    }
                }
            })
                .success(function (response) {
                    alert('The visit has been saved. Thank you!'); // show success message
                    console.log(response);
                })
                .error(function (response) {
                    alert('There was a problem sending the visit.');
                });
        }
    }

});



