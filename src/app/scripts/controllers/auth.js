'use strict';

angular.module('whatsPup')
    .controller('AuthCtrl', function ($firebaseArray, $firebaseObject, Auth) {

        var ref = new Firebase("https://whatspup.firebaseio.com/");

        this.sitterlogin = Auth.sitterlogin;
    

var body = document.getElementsByTagName('body')  
    
body.onload = pre_loader;

function pre_loader() {

document.getElementById('bgvid').style.visibility='hidden';

}

    });