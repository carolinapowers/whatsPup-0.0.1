//angular.module('whatsPup')
//    .controller('OwnerBtnCtrl', function (Auth) {
//        this.logout = Auth.logout;
//        this.loggedIn = Auth.loggedIn;
//    });

'use strict';

angular.module('whatsPup')
    .controller('OwnerBtnCtrl', function ($firebaseArray, $firebaseObject, Auth, $state) {
        var ref = new Firebase("https://whatspup.firebaseio.com/");
        var newownerUser = {};
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

        function updateUser(refdUser) {
            console.log(refdUser)
            if (refdUser === null) {
                return null;
            }

            var ownerUser = ref.child('petowner').child(refdUser.facebook.id);
            console.log(ownerUser);

            ownerUser.update({
                uid: refdUserdUser.facebook.id,
                facebook: refdUser.facebook,
                fullName: refdUser.facebook.displayName,
                firstName: refdUser.facebook.cachedUserProfile.first_name,
                lastName: refdUser.facebook.cachedUserProfile.last_name,
                avatarUrl: refdUser.facebook.cachedUserProfile.picture.data.url,
                gender: refdUser.facebook.cachedUserProfile.gender
            });

            //    // Set user to the object reference of authdUser
            this.ownerUser = $firebaseObject(ref
                    .child('petowner')
                    .child(refdUser.facebook.id)
                )
                //            //
                //            //    //stores the user information for use elsewhere
            newownerUser = ownerUser;

            return ownerUser;
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