import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons'
import 'material-design-icons/iconfont/material-icons.css';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import VueTelInput from 'vue-tel-input'



Vue.config.productionTip = false;

Vue.use(VueTelInput) // Define default global options here (optional)

Vue.component('v-select', vSelect)



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


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