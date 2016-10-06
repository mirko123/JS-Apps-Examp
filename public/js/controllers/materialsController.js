var materialsController = (function() {

    function addComand() {
        var commant = {
            commentText: $("#comand-text").val()
        }
        let id = $("#vall").attr("data-id");
        dataService.addCommant(commant,id);
        search({id: id});
    }

    function all(subData) {
        return Promise.all([dataService.getMaterials(), templates.get("home")])
            .then(function([data, template]) {
                let templateFunc = handlebars.compile(template);
                data = subData || data;
                let html = templateFunc(data);
                $("#container").html(html);
                $("#btn-post").on("click", function() {
                    add();
                });

                $("#searchBtn").on("click", function() {
                    let substring = $("#substring").val();
                    dataService.getMaterialsWithFilter(substring)
                        .then(function(subdata) {
                            all(subdata);
                        });
                });
            });
    }

    function searchById(params) {
        let id = params.id;

        return Promise.all([dataService.getMaterialById(id), 
                templates.get("currentmaterial")])
            .then(function([data, template]) {
                console.log(data);
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(data.result);
                $("#container").html(html);

                $("#btn-post-command").on("click", function() {
                    addComand();
                });
            });
    }

    function searchByPhrase() {
        

        return Promise.all([dataService.getMaterial(id), 
                templates.get("currentmaterial")])
            .then(function([data, template]) {
                console.log(data);
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(data.result);
                $("#container").html(html);

                $("#btn-post-command").on("click", function() {
                    addComand();
                });
            });
    }

    function searchByUser() {
        dataService.getMaterialsByUser()
            .then(function() {
                console.log("here");
            });
    }

    function add() {
        var material = {
            title: $("#post-title").val(),
            description: $("#post-body").val(),
            img: $("#post-img").val()
        };

        dataService.addMaterial(material)
                .then(function() {
                    document.location.hash = "#/home";
                    toastr.success('Material was add', 'Server');
                    // location.reload();
                    all();
                })
                .catch(function(res) {
                    toastr.error("Invalid material", 'Server');
                });
    }

    return {
        all: all,
        searchById: searchById,
        searchByPhrase: searchByPhrase,
        searchByUser: searchByUser,
        add: add,
        addComand: addComand
    }
})();