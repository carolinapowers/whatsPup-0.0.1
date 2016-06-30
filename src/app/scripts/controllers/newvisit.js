
angular.module('whatsPup')
    .controller('NewVisitCtrl', function (Auth, SendEmail, $state, $stateParams, $firebaseObject, $http) {
        var self = this;
        this.loggedIn = Auth.loggedIn;
        this.sentEmail = SendEmail.sentEmail;
        this.loggedIn = Auth.loggedIn;
    
        if (this.loggedIn() == undefined) {
            $state.go('home');
        }

        var clientVisit = new Firebase('https://whatspup.firebaseio.com/Clients/' + $stateParams.user + '/' + $stateParams.clientId);
        console.log(clientVisit);

        this.visitObj = $firebaseObject(clientVisit);

        this.visitObj.$loaded().then(function (data) {
            console.log(data.email);
            return self.getEmail = data.email;
        })

        this.image = '';

        document.getElementById("upload_widget_opener").addEventListener("click", function() {
            cloudinary.openUploadWidget({ 
                cloud_name: 'whatspup',
                upload_preset: 'npnf6uka'
            }, 
            function(error, result) { 
                console.log(result[0].url)
                alert("Your image was uploaded successfully");
//                self.image = result[0].url;
//                return self.image 
                return self.image = result[0].url
            });
            
        }, false);

        var currentdate = new Date();
        var time = (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " at " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds(); //get time
    
        
        this.sentEmail = function () {
            var visitData = {
                to: this.getEmail,
                time: time,
                food: this.food ? "Yes": "No",
                water: this.water ? "Yes": "No",
                play: this.play ? this.play: "N/A",    
                treats: this.treats ? "Yes": "No",
                meds: this.meds ? this.meds: "N/A",
                mess: this.mess ? "Yes": "N/A",
                mail: this.mail ? "Yes": "No",
                packages: this.packages ? "/Yes": " ", 
                plants: this.plants ? "Yes": "No",
                other: this.other ? "See Message": "No",
                message: this.message ? this.message: "Your Pet misses you!",
                image: this.image
            }
            
            $http({
                method: "POST",
                // url: "https://polar-scrubland-63183.herokuapp.com/api/email",
                url: "http://localhost:8080/api/email",
                data: visitData        
            })
                .success(function (response) {
                    alert('The visit has been saved. Thank you!'); // show success message
                    console.log(response);
                })
                .error(function (response) {
                    alert('There was a problem sending the visit.');
                });
        };
    });