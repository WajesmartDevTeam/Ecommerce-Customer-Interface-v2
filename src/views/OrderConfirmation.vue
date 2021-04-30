<template>
  <div>
    <Disclaimer />
    <TopNav></TopNav>
    <div class="orderconfirmation page">
      <div class="confirm-banner">
        <div class="text">
          <div class="banner-icon">
            <img
              src="../assets/img/confirmed.png"
              alt=""
            >
          </div>
          <h3 class="banner-title">Thank You</h3>
          <p class="banner-subtitle">Your order has been received
            <br>
            <!-- Confirmation receipt and order details has been shared to <span>{{order.customer.email}}</span> -->
		<!-- Your order has been recieved -->
          </p>
        </div>
      </div>
      <div class="content bg-white">
        <div class="container">
          <div class="row my-5 py-3">
            <div class="col-md-3 col-sm-6 orderinfo">
              <h5 class="title">Order Number</h5>
              <p class="value">{{order.unique_code}}</p>
            </div>
            <div class="col-md-3 col-sm-6 orderinfo">
              <h5 class="title">Date</h5>
              <p class="value">{{formatDate(order.created_at, 'date')}}</p>
            </div>
            <div class="col-md-3 col-sm-6 orderinfo">
              <h5 class="title">Total Amount</h5>
              <p class="value">₦{{formatPrice(order.order_total)}}</p>
            </div>
            <div class="col-md-3 col-sm-6 orderinfo">
              <h5 class="title">Payment method</h5>
              <p class="value">{{order.payment_method}}</p>
            </div>
          </div>

          <div class="order-details">
            <h4 class="heading mb-4">Order Details</h4>
            <div class="">
              <div class="d-flex mb-3">
                <h5>Total Item</h5>
                <div class="info">
                  <span>{{order.orderitems.length}} items</span>
                </div>
              </div>
              <div class="d-flex mb-3">
                <h5>Order time</h5>
                <div class="info">
                  <span> {{formatDate(order.created_at, 'date')}}</span>
                </div>
              </div>
              <div class="d-flex mb-3">
                <h5>Contact Details</h5>
                <div class="info">
                  <span class="text-bold">{{order.customer.fullname}}</span><br>
                  <span>{{order.customer.email}} <br> {{order.customer.phone}}</span>
                </div>
              </div>
              <div class="d-flex mb-3">
                <h5>Fulfilment Store</h5>
                <div class="info">
                  <span class="text-bold">{{order.store}}</span>
                  <br>
                  <span>9 Ada George, Port Harcourt, Rivers.</span>
                </div>
              </div>
            </div>
            <div
              v-if="this.$store.getters.isLoggedIn"
              class="orderbtn"
            >
              <button
                @click.prevent='$router.push(`/orderview/${order.id}`)'
                class="msq-button"
              >Track Order</button>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Questionnaire></Questionnaire>
    <Footer></Footer>
  </div>
</template>


<script>
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import Disclaimer from '@/components/Disclaimer.vue'
import Questionnaire from "@/components/Questionnaire";
export default {
  name: 'OrderConfirmation',
  components: {
    TopNav, Footer, Disclaimer, Questionnaire
  },
  data () {
    return {
      order: {}
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true)
  },
  created () {
    console.log(this.$store.getters.order);
    this.order = this.$store.getters.order;
    if (this.order.user && Object.keys(this.order.user)) {
      this.order.customer = this.order.user;
    }
    this.$store.getters.allstores.forEach(i => {
      if (i.id == this.order.store) {
        this.order.store = i.name
      }
    })
  },
  
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = 'Market Square NG | Order Confirmation';
        }
    },
  },

  methods: {
    formatPrice (price) {
      var str = price.toString().split(".");
      if (str[0].length >= 3) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      }
      if (!str[1]) {
        str[1] = "00";
      }
      return str.join(".");
    },
    formatDate (date, format) {
      if (date !== null) {
        let d = new Date(date)
        if (format == 'time') {

          return d.toLocaleTimeString('en-US');
        }
        else if (format == 'date') {
          return d.toDateString();
        }
        else {
          return d.toDateString() + ' ' + d.toLocaleTimeString('en-US');
        }
      }
      else {
        return ''
      }
    },
  }
}

</script>

