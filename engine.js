var app = require("express")();
var fs = require("fs");
var axios = require("axios");

// var https = require('https')

// var privateKey = fs.readFileSync('mydomain.key').toString()
// var certificate = fs.readFileSync('pizzajungle_website.crt').toString()
// var ca = fs.readFileSync('pizzajungle_website.ca').toString()

// var server = https.createServer({
//     key: privateKey,
//     cert: certificate,
//     requestCert: false,
//     rejectUnauthorized: false
// }, app)

var http = require("http");
var server = http.Server(app);

//Listen on port 3300
server.listen(3000, function() {
    console.log("Listening on *:3300");
});

//Instantiate socket.io
var io = require("socket.io").listen(server);

// const URL = "http://localhost:8080/api/";
const URL = "http://marketsquareng.website/api/"
    //Configuration
const script_config = {
    debug: true,
    log_level: 1
};

//Replaces console.log. Can easily be tunerd on and off with the script_config.debug boolean
var logger = function(message, level) {
    /*
                              	LOG LEVELS: 
                              	0 - ACTIONS
                              	1 - ACTIONS AND ERRORS
                              	2 - ACTIONS, RESPONSES AND ERRORS
                              */

    if (script_config.debug) {
        if (level <= script_config.log_level) {
            console.log(message);
        }
    }
};

io.on("connection", function(socket) {
    //Create "orders" variable to hold count of orders to help track new orders.
    let orders = "";

    socket.on("makeGetRequest", function(request) {
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
            banners: 'thumbnail'

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

        logger("Sending GET request to: " + request_url, 1);

        var config = {};

        if (request.headers !== undefined) {
            config.headers = request.headers;
        }

        axios
            .get(request_url, config)
            .then(response => {
                console.log(response)
                if (response.status == "true" || response.status) {
                    var response = {
                        data: response.data,
                        type: request.what,
                        status: "true"
                    };

                    logger(response.data, 1);

                    socket.emit("makeGetRequestResponse", response);
                } else {

                    socket.emit("makeGetRequestResponse", response.data.message);
                }
            })
            .catch(err => {
                socket.emit("makeGetRequestResponse", err);
                logger(err, 1);
            });
    });

    socket.on("makePostRequest", function(request) {
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
            updatecustomer: 'updatecustomer',
            redeemgift: 'redeemgiftcard'


        };


        if (request.key) {
            var request_url = URL + request_urls[request.what] + request.key;
        } else {
            var request_url = URL + request_urls[request.what];
        }
        var config = {};

        if (request.headers !== undefined) {
            config.headers = request.headers;
        }

        logger("Sending POST request to: " + request_url, 1);

        axios
            .post(request_url, request.data, config)
            .then(response => {
                logger(response.data);
                console.log(response.data);
                if (response.data.status == "true" || response.data.status || response.success == "true") {
                    response = {
                        data: response.data,
                        type: request.what,
                        status: "true"
                    };

                    socket.emit("makePostRequestResponse", response);
                } else {
                    socket.emit("makePostRequestResponse", response.data.message);
                }
            })
            .catch(err => {
                logger(err, 1);
                socket.emit("makePostRequestResponse", err);
            });
    });

    socket.on("editItem", function(request) {
        console.log(request);

        var request_urls = {
            editaddress: 'addresses/'
        };

        var request_url = URL + request_urls[request.what];
        console.log(request_url)
        request_url += request.id == undefined ? "" : "" + request.id + "/";

        var config = {
            headers: request.headers
        };

        delete request.data.id;
        delete request.data.type;
        delete request.data.append_to_url;

        logger("Sending PUT request to: " + request_url, 0);

        axios
            .put(request_url, request.data, config)
            .then(response => {
                if (response.data.status == "true" || response.data.status) {
                    response = {
                        data: response.data,
                        type: request.what,
                        status: "true"
                    };

                    socket.emit("editItemResponse", response);
                } else {
                    socket.emit("editItemResponse", "error");
                }

                logger(response, 2);
            })
            .catch(err => {
                logger(err, 1);
                socket.emit("editItemResponse", "error");
            });
    });
    socket.on('deleteItem', function(request) {

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

        logger("Delete: " + request_url, 0)

        axios.delete(request_url, config)
            .then((response) => {

                logger(response, 2)

                if (response.data.status == 'true' || response.data.status) {

                    response = {
                        data: response.data,
                        type: request.what,
                        status: 'true'
                    }

                    socket.emit('deleteItemResponse', response)
                } else {

                    socket.emit('deleteItemResponse', 'error')
                }
            })
            .catch((err) => {
                socket.emit('deleteItemResponse', err)
                logger(err, 1)
            })
    })
});