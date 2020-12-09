/*
	This script make requests through a NodeJS proxy.
	The other variation of this script makes requests directly to the URL defined.

*/

import Vue from "vue";
import store from "./store";
import axios from 'axios'

const URL = "http://localhost:8000/api/";
// const URL = "https://marketsquareng.website/api/"
// const URL = "https://admin.sundrymarkets.com/api/"

export default {
    name: "Request",

    makeGetRequest: request => {
        if (request.showLoader || request.showLoader == undefined) {
            if (!Vue.prototype.$swal.isVisible()) {
                var loading_html =
                    '<div style="height:150px;width:150px;margin: 0 auto;"><img style="width: 100%;" src="https://www.c-sgroup.com/images/loading-icon-red.gif" /></div>';

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



        var request_urls = {
            stores: 'getstores',
            allstores: 'getallstores',
            areas: 'listdeliverystoresareas',
            products: 'productsinstore',
            categories: 'productsincategory',
            search: 'productsearch',
            giftcards: 'listgiftcards',
            listorder: 'listorderitems',
            getcart: 'getcartinfo',
            windows: 'recentdeliverywindow',
            listaddress: 'addresses',
            banners: 'thumbnail',
            getproduct: 'getproduct',
            deliveryFeeVariation: 'getDeliveryFeeVariation'

        };
        if (request.params !== undefined) {
            var obj = request.params;
            var str = Object.keys(obj)
                .map(key => {
                    return key + "=" + obj[key];
                })
                .join("&");
            var request_url = URL + request_urls[request.what] + "?" + str;
        } else if (request.id) {
            var request_url = URL + request_urls[request.what] + "" + request.id;
        } else {
            var request_url = URL + request_urls[request.what];
        }
        var config = {};

        if (request.headers !== undefined) {
            config.headers = request.headers;
        }
        return new Promise((resolve, reject) => {
            axios
                .get(request_url, config)
                .then(response => {
                    // console.log(response)
                    Vue.prototype.$swal.close();
                    if (response.status == "true" || response.status) {
                        var response = {
                            data: response.data,
                            type: request.what,
                            status: "true"
                        };
                        resolve(response);
                    } else {
                        reject(response.data.message);
                    }
                })
                .catch(err => {
                    reject(err);
                });

        });
    },

    makePostRequest: request => {
        Vue.prototype.$swal.close();

        if (request.showLoader || request.showLoader == undefined) {
            var loading_html =
                '<div style="height:150px;width:150px;margin: 0 auto;"><img style="width: 100%;" src="https://www.c-sgroup.com/images/loading-icon-red.gif" /></div>';

            Vue.prototype.$swal.fire({
                title: "",
                html: loading_html,
                showConfirmButton: false,
                showCancelButton: false
            });
        }
        var request_urls = {
            contact: 'sendMessage',
            register: 'customerregister',
            login: 'customerlogin',
            forgotpassword: 'reset_password_without_token',
            purchasegiftcard: 'purchasegiftcard/',
            resetpassword: 'reset_password_with_token',
            createcart: 'createcart',
            verifycard: 'verifygiftcard',
            placeorder: 'placeorder',
            verifypayment: 'makepayment',
            createaddress: 'addresses',
            editaddress: 'editaddresses/',
            updatecustomer: 'updatecustomer',
            redeemgift: 'redeemgiftcard'


        };
        console.log(
            "%cSending post request: ",
            "color:#fff;font-size:14px;background:#00ff00;"
        );
        if (request.key) {
            var request_url = URL + request_urls[request.what] + request.key;
        } else {
            var request_url = URL + request_urls[request.what];
            request_url += request.id == undefined ? "" : "" + request.id;
        }

        var config = {};

        if (request.headers !== undefined) {
            config.headers = request.headers;
        }
        return new Promise((resolve, reject) => {

            console.log(request);
            axios
                .post(request_url, request.data, config)
                .then(response => {
                    Vue.prototype.$swal.close();
                    if (response.data.status == "true" || response.data.status || response.success == "true") {
                        response = {
                            data: response.data,
                            type: request.what,
                            status: "true"
                        };
                        resolve(response);
                    } else {
                        reject(response.data.message);
                    }
                })
                .catch(err => {
                    reject(err);
                });

        });
    },

    editItem: request => {

        if (request.showLoader || request.showLoader == undefined) {
            var loading_html =
                '<div style="height:150px;width:150px;margin: 0 auto;"><img style="width: 100%;" src="https://www.c-sgroup.com/images/loading-icon-red.gif" /></div>';

            Vue.prototype.$swal.fire({
                title: "",
                html: loading_html,
                showConfirmButton: false,
                showCancelButton: false
            });
        }
        console.log(
            "%cSending put request: ",
            "color:#fff;font-size:14px;background:#00ff00;"
        );
        // console.log(request)
        var request_urls = {
            editaddress: 'addresses/'
        };
        var request_url = URL + request_urls[request.what];
        // console.log(request_url)
        request_url += request.id == undefined ? "" : "" + request.id + "/";

        var config = {
            headers: request.headers
        };

        delete request.data.id;
        delete request.data.type;
        delete request.data.append_to_url;

        return new Promise((resolve, reject) => {
            axios
                .put(request_url, request.data, config)
                .then(response => {
                    if (response.data.status == "true" || response.data.status) {
                        response = {
                            data: response.data,
                            type: request.what,
                            status: "true"
                        };

                        resolve(response)
                    } else {
                        reject('error')
                    }
                })
                .catch(err => {
                    resolve(err)
                });

        });
    },
    deleteItem: (request) => {

        if (request.showLoader || request.showLoader == undefined) {
            if (!Vue.prototype.$swal.isVisible()) {
                var loading_html = '<div style="height:150px;width:150px;margin: 0 auto;"><img style="width: 100%;" src="https://i.ya-webdesign.com/images/minimalist-transparent-loading-gif-6.gif" /></div>'

                Vue.prototype.$swal.fire({
                    title: "",
                    html: loading_html,
                    showConfirmButton: false,
                    showCancelButton: false
                })
            }
        }

        console.log('%cDeleting: ', 'color:#fff;font-size:14px;background:#00ff00;')
        var request_urls = {
            deleteaddress: 'addresses',
        }

        var request_url = URL + request_urls[request.what]

        request_url += (request.id == undefined) ? "" : "/" + request.id

        var config = {
            headers: {

            },
            data: request.data
        }

        return new Promise((resolve, reject) => {
            axios.delete(request_url, config)
                .then((response) => {


                    if (response.data.status == 'true' || response.data.status) {

                        response = {
                            data: response.data,
                            type: request.what,
                            status: 'true'
                        }

                        resolve(response)
                    } else {

                        reject(response)
                    }
                })
                .catch((err) => {
                    reject(err)
                })

        })
    }

};