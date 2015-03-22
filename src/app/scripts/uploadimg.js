angular.module('whatsPup')
    .controller('UploadImgCtrl', function (SendEmail, Auth, $state, $stateParams, $firebaseObject, $http) {
   
    var self = this;
    this.sentEmail = SendEmail.sentEmail;
    this.widget = SendEmail.widget;
    
  
   
    
      document.getElementById("upload_widget_opener").addEventListener("click", function() {
            cloudinary.openUploadWidget({ 
                cloud_name: 'jaredstevick',
                upload_preset: 'xnpszqid'
            }, 
            function(error, result) { 
                console.log(result[0].url)
                
                self.image = result[0].url;
                return self.image;
            });
//            return self.image
//            console.log(self.image);
       }, false);
    
    
    
    
    
});