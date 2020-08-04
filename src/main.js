import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons'
import 'material-design-icons/iconfont/material-icons.css';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import VueTelInput from 'vue-tel-input';
import axios from "axios";
import VueAxios from "vue-axios";
import Request from "./Request";
import io from "socket.io-client";
import swal from "sweetalert2";
import InfiniteLoading from "vue-infinite-loading";
import VeeValidate from "vee-validate";
import Toasted from "vue-toasted";

Vue.config.productionTip = false;


// VeeValidate.Validator.extend("verify_password", {
//     getMessage: field => ``,
//     validate: value => {
//         var strongRegex = new RegExp("^(.{6,})$");
//         return strongRegex.test(value);
//     }
// });
// VeeValidate.Validator.extend("verify_number", {
//     getMessage: field => ``,
//     validate: value => {
//         var numRegex = new RegExp('^\\d+$');
//         return numRegex.test(value);
//     }
// });

Vue.use(VueTelInput) // Define default global options here (optional)
Vue.use(VueAxios, axios);
Vue.use(InfiniteLoading);
// Vue.use(VeeValidate, {
//     events: 'change|blur|custom'
// });

Vue.use(Toasted, {
    duration: 9000,
    theme: "bubble",
    type: "success",
    iconPack: "fontawesome",
    action: {
        text: "X",
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        }
    },
    router
});

Vue.component('v-select', vSelect)

// var socket = io("http://199.192.22.132:3300");
var socket = io("localhost:3300");
Vue.prototype.$socket = socket;
Vue.prototype.$request = Request;
Vue.prototype.$swal = swal;



//stylesheet
import "../src/assets/css/layout.css"
import "../src/assets/css/style.css"
import "../src/assets/css/responsive.css"

//javascript
import "bootstrap";
import "jquery";
import Popper from "popper.js";
global.Popper = Popper;
import "bootstrap/dist/css/bootstrap.min.css";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')