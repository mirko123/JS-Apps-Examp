/* globals dataService templates $ Handlebars console */

var handlebars = handlebars || Handlebars;

function registerUser() {
    templates.get("register")
        .then(function(html) {
            $("#container").html(html);
        
            $("#btn-register").on("click", (ev) => {
                let user = {
                    username: $("#tb-username").val(),
                    passHash: $("#tb-password").val(),
                    passHash2: $("#tb-password2").val()
                };
                if(user.passHash !== user.passHash2) {
                    toastr.error('Bad pass!', 'I say');
                    return false;
                }
                user = {username: user.username, password: user.passHash}; 
                dataService.register(user)
                    .then((respUser) => {
                        return dataService.login(user);
                    })
                    .then((respUser) => {
                        //123456q
                        $(document.body).addClass("logged-in");
                        document.location = "#/home";
                    })
                    .catch(function(response) {
                        toastr.error(response.responseText, response.statusText);
                    });

                ev.preventDefault();
                return false;
          });
    });
    

    // var user = {
    //     email: $
    // }
}

let controllers = {
    get(dataService, templates) {
        return {
            login() {
                dataService.isLoggedIn()
                    .then(isLoggedIn => {
                        if (isLoggedIn) {
                            //redirect to
                            window.location = "#/home";
                            return;
                        }

                        templates.get("login")
                            .then((templateHtml) => {
                                let templateFunc = handlebars.compile(templateHtml);
                                let html = templateFunc();
                                $("#container").html(html);

                                $("#btn-login").on("click", (ev) => {
                                    let user = {
                                        username: $("#tb-username").val(),
                                        passHash: $("#tb-password").val()
                                    };

                                    user = {username: user.username, password: user.passHash}; 
                                    dataService.login(user)
                                        .then((respUser) => {
                                            //123456q
                                            if (typeof respUser.result.username === "undefined") {
                                                console.log("response:" + respUser);
                                                toastr.error('Username or password is incorrect', 'Server');
                                                return false;
                                            }
                                            $(document.body).addClass("logged-in");
                                            document.location = "#/home";
                                        });

                                    ev.preventDefault();
                                    return false;
                                });

                                // $("#btn-register").on("click", (ev) => {
                                //     let user = {
                                //         username: $("#tb-username").val(),
                                //         passHash: $("#tb-password").val()
                                //     };

                                //     dataService.register(user)
                                //         .then((respUser) => {
                                //             return dataService.login(user);
                                //         })
                                //         .then((respUser) => {
                                //             //123456q
                                //             $(document.body).addClass("logged-in");
                                //             document.location = "#/home";
                                //         });
                                //     ev.preventDefault();
                                //     return false;
                                // });

                            });
                    });
            },
            register: registerUser
        };
    }
};