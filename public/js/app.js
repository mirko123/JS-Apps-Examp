/* globals Navigo controllers $ dataService document */

let router = new Navigo(null, true);

let controllersInstance = controllers.get(dataService, templates);

router
    .on("login", controllersInstance.login)
    .on("register", controllersInstance.register)
    .on("profiles/", profilesController.printAll)
    .on("profiles/:username", profilesController.print)
    // .on("home", controllersInstance.home)
    .on("user-materials", materialsController.searchByUser)
    .on("home/:id", materialsController.searchById)
    .on("home", materialsController.all)
    // .on("#/materials/:id",materialsController.searchById)
    .on(() => {
        $("#main-nav .home a").addClass("active");
        router.navigate("/home");
    })
    .resolve();

dataService.isLoggedIn()
    .then(function(isLoggedIn) {
        if (isLoggedIn) {
            $(document.body).addClass("logged-in");
        }
    });

$(".btn-nav-logout").on("click", () => {
    dataService.logout()
        .then(() => {
            $(document.body).removeClass("logged-in");
        });
});

$("#main-nav").on("click", "li", function(ev) {
    $("#main-nav .active").removeClass("active");
    $(this).addClass("active");
});

$(function() {
    $("#main-nav .active").removeClass("active");
    let $currentPageNavButton = $(`#main-nav a[href="${window.location.hash}"]`).parents("li");
    $currentPageNavButton.addClass("active");
});