/*
	This script make requests through a NodeJS proxy.
	The other variation of this script makes requests directly to the URL defined.

*/

import Vue from "vue";
import store from "./store";

/*

	Additional flags:

	- useToken (BOOL) - If the request should use token. Token is gotten from VueX store (store.getters.token).
	Default value is true.
	
	showLoader (BOOL) - If a loader should be shown when sending a request. Default value is true.


*/
export default {
    name: "Request",

    makeGetRequest: request => {
        if (request.showLoader || request.showLoader == undefined) {
            if (!Vue.prototype.$swal.isVisible()) {
                var loading_html =
                    '<div style="height:150px;width:150px;margin: 0 auto;"><img style="width: 100%;" src="https://thumbs.gfycat.com/AchingSpeedyArmyworm-size_restricted.gif" /></div>';

                Vue.prototype.$swal.fire({
                    title: "",
                    html: loading_html,
                    showConfirmButton: false,
                    showCancelButton: false
                });
            }
        }

        console.log(
            "%cSending get request: ",
            "color:#fff;font-size:14px;background:#00ff00;"
        );

        return new Promise((resolve, reject) => {
            // if (request.useToken || request.useToken == undefined) {
            //     var token = store.getters.token;
            //     request.headers = {
            //         Authorization: "Token " + token
            //     };
            // }

            console.log(request);

            Vue.prototype.$socket.emit("makeGetRequest", request);
            Vue.prototype.$socket.once("makeGetRequestResponse", response => {
                Vue.prototype.$swal.close();
                // console.log(response);
                if (response.status == "true") {
                    // console.log(response);
                    resolve(response);
                } else {
                    reject(response);
                }
            });
        });
    },

    makePostRequest: request => {
        Vue.prototype.$swal.close();

        if (request.showLoader || request.showLoader == undefined) {
            var loading_html =
                '<div style="height:150px;width:150px;margin: 0 auto;"><img style="width: 100%;" src="https://thumbs.gfycat.com/AchingSpeedyArmyworm-size_restricted.gif" /></div>';

            Vue.prototype.$swal.fire({
                title: "",
                html: loading_html,
                showConfirmButton: false,
                showCancelButton: false
            });
        }

        console.log(
            "%cSending post request: ",
            "color:#fff;font-size:14px;background:#00ff00;"
        );

        return new Promise((resolve, reject) => {
            if (request.useToken || request.useToken == undefined) {
                var token = store.getters.token;

                request.headers = {
                    Authorization: "Token " + token
                };
            }
            console.log(request);
            Vue.prototype.$socket.emit("makePostRequest", request);
            Vue.prototype.$socket.once("makePostRequestResponse", response => {
                Vue.prototype.$swal.close();
                // console.log(response);
                if (response.status !== undefined && response.status == "true") {
                    resolve(response);
                } else {
                    reject(response);
                }
            });
        });
    },

    editItem: request => {

        console.log(
            "%cSending put request: ",
            "color:#fff;font-size:14px;background:#00ff00;"
        );
        console.log(request)

        return new Promise((resolve, reject) => {
            if (request.useToken || request.useToken == undefined) {
                var token = store.getters.token;
                request.headers = {
                    Authorization: "Token " + token
                };
            }

            Vue.prototype.$socket.emit("editItem", request);
            Vue.prototype.$socket.once("editItemResponse", response => {
                if (response.status == "true") {
                    resolve(response);
                } else {
                    console.log(response);
                    reject(response);
                }
            });
        });
    }
};