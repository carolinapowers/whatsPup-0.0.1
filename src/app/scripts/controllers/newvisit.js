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
        // var food = this.food;
        // var water = this.water;
        // var play = this.play;
        // var treats = this.treats;
        // var meds = this.meds;
        // var mess = this.mess;
        // var packages = this.packages;
        // var mail = this.mail;
        // var plants = this.plants;
        // var other = this.other;
        // var message = this.message;
        var currentdate = new Date();
        var time = (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " at " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds(); //get time
        this.sentEmail = function () {
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

    });