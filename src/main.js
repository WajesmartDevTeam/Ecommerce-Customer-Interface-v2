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
// import io from "socket.io-client";
import swal from "sweetalert2";
import VueLazyload from 'vue-lazyload'
import InfiniteLoading from "vue-infinite-loading";
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import { required, email, max, numeric, length } from 'vee-validate/dist/rules';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import Toasted from "vue-toasted";
import VueCarousel from 'vue-carousel';
import EasySlider from 'vue-easy-slider'
// import VueAnalytics from 'vue-analytics';
import VueGtag from "vue-gtag";

Vue.config.productionTip = false;

// No message specified.
extend('email', {
    ...email,
    message: 'The {_field_} field must be an email'
});

// Override the default message.
extend('required', {
    ...required,
    message: 'This field is required'
});
extend('numeric', {
    ...numeric,
    message: 'This field must include numbers only'
});
// extend('length', {
//     ...length,
//     message: 'The {_field_} field must have maximum length of 11'
// });
extend('confirmedBy', {
    params: ['target'],
    // Target here is the value of the target field
    validate(value, { target }) {
        return value === target;
    },
    // here it is its name, because we are generating a message
    message: 'The {_field_} does not match the {target}'
});
import loader from '../src/assets/img/lazyLoader.gif'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: loader,
    attempt: 1,
    listenEvents: ['scroll'],
})
Vue.use(VueTelInput) // Define default global options here (optional)
Vue.use(VueAxios, axios);
Vue.use(InfiniteLoading);
Vue.use(VueCarousel);

Vue.use(EasySlider)
Vue.use(Toasted, {
    theme: "bubble",
    position: "top-right",
    duration: 5000,
    type: "danger",
    iconPack: "fontawesome",
    action: {
        text: "X",
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        }
    },
    router
});

Vue.use(Loading, {
    canCancel: false,
    color: 'red',
    height: 65,
    width: 65,
    loader: 'Dots',
    opacity: 0.8,
    backgroundColor: '#ffffff',
});
// Vue.use(VueAnalytics, {
//     id: 'UA-157722413-2',
//     router
// })
Vue.use(VueGtag, {
        config: { id: 'UA-157722413-2' }
    },
    router);
Vue.component('v-select', vSelect)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// var socket = io("https://marketsquare.azurewebsites.net:3000");
// var socket = io("localhost:3300");
// Vue.prototype.$socket = socket;
Vue.prototype.$request = Request;
Vue.prototype.$swal = swal;
Vue.prototype.$loader = Loading;



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


router.beforeEach((to, from, next) => {
    if (to.name === 'Login' || to.name === 'Register' || to.name == 'GiftCard' || to.name == 'Contact' || to.name == 'Terms' || to.name == 'Privacy' || to.name == 'StoreLocator' || to.name == 'About' || to.name == 'MyOrders' || to.name == 'MyAccount' || to.name == 'AddressBook' || to.name == 'Product') next()
    else if (to.name !== 'LandingPage' && !store.getters.isStoreSet) next({ name: 'LandingPage' })
    else if (to.name == 'LandingPage' && store.getters.isStoreSet) next({ name: 'Home' })
    else next();
    if (to.name !== 'Register' && from.name == 'Login') next({ name: 'Home' })
    else next();
    if (to.name !== 'OrderConfirmation' && from.name == 'Login') next({ name: 'Home' })
    else next();

})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')