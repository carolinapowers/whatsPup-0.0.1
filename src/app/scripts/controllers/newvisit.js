angular.module('whatsPup')
    .controller('NewVisitCtrl', function (Auth, $state, $stateParams, $firebaseObject) {
        this.loggedIn = Auth.loggedIn;

        var clientVisit = new Firebase('https://whatspup.firebaseio.com/Clients/' + $stateParams.user + '/' + $stateParams.clientId);
        console.log(clientVisit);
        // Turn the info into an Object so you can grab the users info being returned
        this.visitObj = $firebaseObject(clientVisit);


        $(document).ready(function () {
            console.log("sanity check");
            console.log(Date.now());



            $("#newVisit").submit(function () {
                console.log("new visit started");
                var name = $("#clientName").val(); // get client field value
                var food = $("#food-0").val(); // get food field value
                var water = $("#food-1").val(); // get water field value
                var play = $("#play").val(); // get playtime field value
                var treatsY = $("#treats-0").val(); // get treats field value
                var treats = $("#treats-1").val(); // get treats field value
                var meds = $("#meds").val(); // get meds field value
                var misc0 = $("#misc-0").val(); // get misc-0 field value
                var misc1 = $("#misc-1").val(); // get misc-1 field value
                var misc2 = $("#misc-2").val(); // get misc-2 field value
                var misc3 = $("#misc-3").val(); // get misc-3 field value
                var note = $("#message").val(); // get message value
                var photo = $("#photo");
                var currentdate = new Date();
                var time = "Time of Visit: " + (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " at " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds(); //get time (angular hates me)

                $.ajax({
                        type: "POST",
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
                                'text': 'Hi ' + name + 'Your pet was just visited by a WhatsPup Pet Sitter.  The following actions were recorded:' +
                                    time + food + water + play + treatsY + treats + meds + misc0 + misc1 + misc2 + misc3 + note,
                                'to': [
                                    {
                                        'email': 'jstevick@gmail.com',
                                        'name': 'name',
                                        'type': 'to'
                                    }]
                            }
                        }
                    })
                    .done(function (response) {
                        alert('The visit has been saved. Thank you!'); // show success message
                        console.log(response);
                    })
                    .fail(function (response) {
                        alert('There was a problem sending the visit.');
                    });
                return false; // prevent page refresh 
            });
        });
    });