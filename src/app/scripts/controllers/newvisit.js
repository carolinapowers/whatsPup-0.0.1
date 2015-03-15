angular.module('whatsPup')
    .controller('NewVisitCtrl', function (Auth) {
        this.loggedIn = Auth.loggedIn;
        $(document).ready(function () {
            console.log("sanity check");

            $("#newVisit").submit(function () {
                console.log("newVisit() started");
                console.log("submitting");
                var name = $("#clientName").val(); // get client field value
                var food = $("#food-0").val(); // get food field value
                var water = $("#food-1").val(); // get water field value
                var play = $("#play").val(); // get playtime field value
                var treats = $("#treats").val(); // get treats field value
                var meds = $("#meds").val(); // get meds field value
                var misc0 = $("#misc-0").val(); // get misc-0 field value
                var misc1 = $("#misc-1").val(); // get misc-1 field value
                var misc2 = $("#misc-2").val(); // get misc-2 field value
                var misc3 = $("#misc-3").val(); // get misc-3 field value
                var note = $("#message").val(); // get message vale
                var photo = $("#photo");

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
                                    food + water + play + treats + meds + note,
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
                        alert('Your message has been sent. Thank you!'); // show success message
                    })
                    .fail(function (response) {
                        alert('Error sending message.');
                    });
                return false; // prevent page refresh
            });
        });





    });