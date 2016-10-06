var profilesController = (function() {

    function print(params) {

        return Promise.all([dataService.getUser(params.username), templates.get("profile")])
            .then(function([data, template]) {
                console.log(data.result);
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(data.result);
                $("#container").html(html);
            });
    }

    function printAll(params) {
        return Promise.all([dataService.getUsers(), templates.get("users")])
            .then(function([data, template]) {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(data.result);
                $("#container").html(html);
            });
    }

    return {
        print: print,
        printAll: printAll
    }
})();
