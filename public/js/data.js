/* globals requester localStorage */

const HTTP_HEADER_KEY = "x-auth-key",
    KEY_STORAGE_USERNAME = "username",
    KEY_STORAGE_AUTH_KEY = "authKey";

var dataService = (function(){
    function login(user) {
        return requester.putJSON("/api/users/auth", user)
            .then(respUser => {

                // if(!respUser.username) {
                //     return;
                // }
                localStorage.setItem("username", respUser.result.username);
                localStorage.setItem("authKey", respUser.result.authKey);

                return respUser
            });
    }
    function register(user) {
        // if(user.passHash !== user.passHash2) {
        //     let prom = new Promise(function(resolve, reject) {
        //         toastr.error('Have fun storming the castle!', 'Miracle Max Says');

        //         reject();
        //         // return prom;
        //     });

        //     return prom;
        // }
        return requester.postJSON("/api/users", user);
    }
    function logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem(KEY_STORAGE_USERNAME);
                // localStorage.removeItem("KEY_STORAGE_AUTH_KEY");
            });
    }
    function isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem(KEY_STORAGE_USERNAME);
            });
    }

    function getUsers() {
        return requester.get("api/users");
    }

    function getUser(name) {
        return requester.get(`api/profiles/${name}`);
    }

    function getMaterials() {
        return requester.get("api/materials");
    }

    function getMaterialsWithFilter(string) {
        return requester.get(`api/materials?filter=${string}`);
    }

    function getMaterialById(id) {
        return requester.get(`api/materials/${id}`);
    }

    function getMaterialsByUser() {

        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            }
        };
        console.log(options);
        return requester.get("/api/user-materials", options);
    }

    function addMaterial(material) {
        console.log(localStorage.getItem(KEY_STORAGE_AUTH_KEY));
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(KEY_STORAGE_AUTH_KEY)
                // "x-auth-key": localStorage.getItem("authKey")
            }
        };

        return requester.postJSON("/api/materials", material, options);

    }

    function addCommant(commant, id) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            }
        };
        console.log(id);
        return requester.putJSON(`/api/materials/${id}/comments`, commant, options);
    }
    return {
        login,
        register,
        logout,
        isLoggedIn,
        getUsers,
        getUser,
        getMaterials,
        getMaterialsWithFilter,
        getMaterialById,
        getMaterialsByUser,
        addMaterial,
        addCommant
    }
})();