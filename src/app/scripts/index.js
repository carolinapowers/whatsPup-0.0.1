'use strict';

angular.module('whatsPup', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap', 'firebase', ])

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
        // .state('newvisit', {
        //         url: '/newvisit',
        //         templateUrl: 'app/view/newvisit.html',
        //         controller: 'NewVisitCtrl',
        //         controllerAs: 'newvisit'
        // })
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
});

// .factory('newVisit', ['FIREBASE_URL', function(){
//     return function name(){

//     };
// }])