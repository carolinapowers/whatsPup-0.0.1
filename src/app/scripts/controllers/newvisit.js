angular.module('whatsPup')
    .controller('NewVisitCtrl', function (Auth, $state, $stateParams, $firebaseObject, $http) {
        var self = this;
        this.loggedIn = Auth.loggedIn;

        var clientVisit = new Firebase('https://whatspup.firebaseio.com/Clients/' + $stateParams.user + '/' + $stateParams.clientId);
        console.log(clientVisit);

        this.visitObj = $firebaseObject(clientVisit);



        this.visitObj.$loaded().then(function (data) {
            console.log(data.email);
            return self.getEmail = data.email;
        })
        console.log(self.getEmail);

        console.log(this.sendEmail);


        //        clientVisit.on("value", function (snapshot) {
        //            self.getEmail = snapshot.val();
        //            console.log("Client E-mail: " + self.getEmail.email);
        //            return self.getEmail = self.getEmail.email;
        //        });
        //
        //        console.log(self.getEmail);

        var currentdate = new Date();
        var time = "Time of Visit: " + (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " at " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds(); //get time
        this.sentEmail = function () {
            $http({
                    method: "POST",
                    url: "https://mandrillapp.com/api/1.0/messages/send.json",
                    data: {
                        'key': 'SjfF7oGr1BHLUnBlnSF20A',
                        'message': {
                            'from_email': 'whatspupupdate@gmail.com',
                            'from_name': 'WhatsPup',
                            'headers': {
                                'Reply-To': 'whatspupupdate@gmail.com'
                            },
                            'subject': 'New Visit Update from WhatsPup',
                            'text': 'Hi, Your pet was just visited by a WhatsPup Pet Sitter.  The following actions were recorded:' + time + "Food:" + this.food + "Water:" + this.water + "Play Time:" + this.play + "Treats:" + this.treats + "Medications:" + this.meds + "Cleaned up mess:" + this.mess + "Packages moved inside:" + this.packages + "Picked up mail:" + this.mail + "Watered Plants:" + this.plants + "Other:" + this.other + "Message:" + this.message,
                            'to': [
                                {
                                    'email': this.getEmail,
                                    'name': 'name',
                                    'type': 'to'
                }]
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

    });