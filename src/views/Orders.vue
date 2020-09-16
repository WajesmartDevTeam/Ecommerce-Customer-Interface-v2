<template>
  <div>
    <TopNav></TopNav>
    <div class="orders page bg-white py-5">
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <div id="options">
              <div
                class="opt active"
                @click="$router.push('/orders')"
              >
                <a href="/orders">My Orders</a>
              </div>
              <div
                class="opt"
                @click="$router.push('/account')"
              >
                <a href="/account">My Account</a>
              </div>
              <div
                class="opt "
                @click="$router.push('/addressbook')"
              >
                <a href="/addressbook">Address Book</a>
              </div>
            </div>
          </div>
          <div class="col-sm-9">
            <div class="content">

              <div class="row">
                <div
                  v-for="(row, i) in orders"
                  v-bind:key="i"
                  class="col-sm-6 col-md-6 col-lg-4 "
                >
                  <div
                    class="order-box "
                    @click="$router.push(`orderview/${row.id}`)"
                  >
                    <h5 class="order-title">Order {{row.unique_code}}</h5>
                    <div class="price">
                      <p>₦{{formatPrice(row.order_total)}}</p>
                    </div>
                    <div class="order-badge">
                      <span
                        v-if="row.completion_status =='Delivered' ||row.completion_status =='Picked'"
                        class="badge bg-success status"
                      >{{row.completion_status}}</span>
                      <span
                        v-else
                        class="badge status"
                      >{{row.completion_status}}</span>
                      <span class="badge mode ml-3">{{row.delivery_method}}</span>
                    </div>
                    <p class="date">{{formatDate(row.created_at)}}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <storeSelector></storeSelector>

    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import StoreSelector from '@/components/StoreSelector.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'MyOrders',
  components: {
    StoreSelector, TopNav, Footer
  },
  data () {
    return {
      showSearch: false,
      orders: [],
      loader: ''
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true);
    this.loader = this.$loading.show();
  },
  mounted () {
    // console.log(this.$store.getters.showSearch)
    this.fetchOrders();
  },
  methods: {
    fetchOrders () {
      let req = {
        what: "listorder",
        showLoader: false,
        params: {
          user_id: this.$store.getters.user.id
        }
      }
      this.$request.makeGetRequest(req)
        .then(res => {

          if (res.type == 'listorder') {
            console.log(res.data.data)
            this.$store.dispatch('orders', res.data.data)
            this.orders = res.data.data;
            this.loader.hide()
          }

        })
        .catch(error => {
          this.$swal.fire("Error", error, "error");
          console.log(error)
        });
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
        return null
      }
    },
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
  }
}

</script>

