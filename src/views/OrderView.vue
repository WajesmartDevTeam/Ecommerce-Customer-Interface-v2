<template>
  <div>
    <TopNav></TopNav>
    <div
      id="order"
      class=" page bg-white py-5"
    >
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <div id="options">
              <div class="opt active">
                <a href="/orders">My Orders</a>
              </div>
              <div class="opt">
                <a href="/account">My Account</a>
              </div>

            </div>
          </div>
          <div class="col-sm-9">
            <div class="content">
              <div class="top d-flex">
                <a href="/orders">
                  Back</a>
                <h5 class="ml-5 text-bold">Order {{order.unique_code}}</h5>
              </div>
              <div class="card order-details mt-2">
                <div class="card-body">

                  <div v-if="Object.keys(order).length >0">
                    <div class="d-flex mb-3">
                      <h5>Total Item</h5>
                      <div class="info"><span>{{order.itemdetails.length}} items</span></div>
                    </div>
                    <div class="d-flex mb-3">
                      <h5>Order time</h5>
                      <div class="info"><span>{{formatDate(order.created_at)}}</span></div>
                    </div>
                    <div class="d-flex mb-3">
                      <h5>Contact Details</h5>
                      <div class="info"><span class="text-bold">{{order.fullname}}</span><br><span>{{order.email}}<br> {{order.phone}}</span></div>
                    </div>
                    <div
                      v-if="order.delivery_method=='pickup'"
                      class="d-flex mb-3"
                    >
                      <h5>Fulfilment Store</h5>
                      <div class="info"><span class="text-bold">{{order.name}}</span><br><span>{{order.address}}</span></div>
                    </div>
                    <div
                      v-else
                      class="d-flex mb-3"
                    >
                      <h5> Store</h5>
                      <div class="info"><span class="text-bold">{{order.name}}</span><br><span>{{order.address}}</span></div>
                    </div>
                    <div class="d-flex mb-3">
                      <h5>Fulfilment Type</h5>
                      <div class="info text-capitalize"><span>{{order.delivery_method}}</span></div>
                    </div>
                    <div class="d-flex mb-3">
                      <h5>Payment Method</h5>
                      <div class="info"><span>{{order.payment_method}}</span></div>
                    </div>
                    <div class="d-flex mb-3">
                      <h5>Total Amount</h5>
                      <div class="info"><span>₦{{formatPrice(order.order_total)}}</span></div>
                    </div>

                  </div>
                  <div class="orderbtn"><button
                      @click.prevent='reOrder()'
                      class="msq-button"
                    >Order Again</button></div>
                </div>
              </div>
              <div class="card order-status mt-3 p-4">
                <h5 class="card-title title text-left">Order Status</h5>
                <div
                  id="Order_Tracker"
                  class="card-body p-0 mt-3"
                >
                  <div class="track mt-3">
                    <svg class="Rectangle_2828">
                      <rect
                        id="Rectangle_2828"
                        rx="0"
                        ry="0"
                        x="0"
                        y="0"
                        width="2"
                        height="300"
                      >
                      </rect>
                    </svg>
                    <div class="check_1">
                      <svg class="complete">
                        <ellipse
                          id="Ellipse_237"
                          rx="18"
                          ry="18"
                          cx="18"
                          cy="18"
                        >
                        </ellipse>
                      </svg>
                      <div id="check">

                        <img
                          src="../assets/img/check.png"
                          alt=""
                        >
                      </div>
                    </div>
                    <div
                      class="check_2"
                      v-if="(order.completion_status!=='address_verification_pending' &&order.completion_status!=='address_verified' && order.completion_status!=='processing') || order.completion_status=='Ready For Dispatch' "
                    >
                      <svg class="complete">
                        <ellipse
                          id="Ellipse_237"
                          rx="18"
                          ry="18"
                          cx="18"
                          cy="18"
                        >
                        </ellipse>
                      </svg>
                      <div id="check">

                        <img
                          src="../assets/img/check.png"
                          alt=""
                        >
                      </div>
                    </div>
                    <div
                      class="check_3"
                      v-if="(order.completion_status!=='address_verification_pending' &&order.completion_status!=='address_verified' && order.completion_status!=='processing' && order.completion_status!=='Ready For Dispatch') || order.completion_status=='Dispatched'"
                    >
                      <svg class="complete">
                        <ellipse
                          id="Ellipse_237"
                          rx="18"
                          ry="18"
                          cx="18"
                          cy="18"
                        >
                        </ellipse>
                      </svg>
                      <div id="check">

                        <img
                          src="../assets/img/check.png"
                          alt=""
                        >
                      </div>
                    </div>
                    <div
                      class="check_4"
                      v-if="order.completion_status=='Delivered' || order.completion_status=='PickedUp'"
                    >
                      <svg class="complete">
                        <ellipse
                          id="Ellipse_237"
                          rx="18"
                          ry="18"
                          cx="18"
                          cy="18"
                        >
                        </ellipse>
                      </svg>
                      <div id="check">

                        <img
                          src="../assets/img/check.png"
                          alt=""
                        >
                      </div>
                    </div>
                    <svg
                      class="Ellipse_1 "
                      v-if="order.completion_status !=='Ready For Dispatch'&& order.completion_status !=='Dispatched'&&order.completion_status !=='Delivered'&&order.completion_status !=='PickedUp'"
                      v-bind:class="order.completion_status=='processing'? 'active':'disabled'"
                    >
                      <ellipse
                        id="Ellipse_237_ed"
                        rx="6"
                        ry="6"
                        cx="6"
                        cy="6"
                      >
                      </ellipse>
                    </svg>
                    <svg
                      v-if="order.completion_status !=='Dispatched'&&order.completion_status !=='Delivered'&&order.completion_status !=='PickedUp'"
                      class="Ellipse_2 "
                      v-bind:class="order.completion_status=='Ready For Dispatch'? 'active':'disabled'"
                    >
                      <ellipse
                        id="Ellipse_237_ed"
                        rx="6"
                        ry="6"
                        cx="6"
                        cy="6"
                      >
                      </ellipse>
                    </svg>
                    <svg
                      v-if="order.completion_status !=='Delivered'&&order.completion_status !=='PickedUp'"
                      class="Ellipse_3 "
                      v-bind:class="order.completion_status=='Delivered'|| order.completion_status=='PickedUp'? 'active':'disabled'"
                    >
                      <ellipse
                        id="Ellipse_237_ed"
                        rx="6"
                        ry="6"
                        cx="6"
                        cy="6"
                      >
                      </ellipse>
                    </svg>

                  </div>
                  <div class="stat ">
                    <div class="status ">
                      <h5>Order confirmed</h5>
                      <span class="subtext">Your order has been confirmed</span>
                    </div>
                    <div
                      v-bind:class="order.completion_status =='processing' ? 'complete' :''"
                      class="status  mt-5"
                    >
                      <h5>Processing</h5>
                      <span class="subtext">Order is being processed for delivery</span>
                      <div id="market">
                        <span>{{order.name}}</span>
                        <br>
                        <span class="subtext"> {{order.address}}</span>
                      </div>
                    </div>
                    <div
                      v-bind:class="order.completion_status =='Dispatched' ? 'complete' :''"
                      class="status mt-5"
                    >
                      <h5>Dispatched</h5>
                    </div>
                    <div
                      v-bind:class="order.completion_status =='Delivered' ||order.completion_status =='Picked Up' ? 'active' :''"
                      class="status mt-5"
                    >
                      <h5>Delivered</h5>
                    </div>
                  </div>

                </div>
              </div>
              <div class="card order-items mt-3 p-4">
                <h5 class="title card-title text-left text-capitalize">Your order</h5>
                <table class="table table-responsive card-body bg-white">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col"></th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in order.itemdetails">

                      <td class="">

                        <img
                          v-if="row.old_productinfo.img_url.includes('https://cdn.marketsquareng.website')"
                          :src="row.old_productinfo.img_url"
                          alt=""
                          class="img-fluid"
                        >
                        <img
                          v-else
                          :src="'https://marketsquareng.com'+row.old_productinfo.img_url"
                          alt=""
                          class="img-fluid"
                        >

                      </td>
                      <td class="productname">{{row.old_productinfo.name}}</td>
                      <td>
                        <div class="qty">{{row.old_productinfo.quantity}}</div>
                      </td>
                      <td><span v-if="row.old_productinfo.unit_price">₦{{formatPrice(row.old_productinfo.unit_price)}}</span>
                        <span v-else>₦{{formatPrice(row.unit_price)}}</span>
                      </td>
                      <td>₦{{formatPrice(row.old_productinfo.price)}} </td>
                    </tr>

                  </tbody>
                </table>
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
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import StoreSelector from '@/components/StoreSelector.vue'
export default {
  name: 'Orderview',
  components: {
    StoreSelector, TopNav, Footer
  },
  data () {
    return {
      showSearch: false,
      order_id: '',
      order: {},
      loader: ''
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true);
    this.loader = this.$loading.show();
  },
  created () {
    this.order_id = this.$route.params.id;
    this.fetchOrders()
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
            this.$store.dispatch('orders', res.data.data)
            res.data.data.forEach(i => {
              if (i.id == this.order_id) {
                this.order = i;
                console.log(i.completion_status)
              }
            })
            this.loader.hide()
          }

        })
        .catch(error => {
          this.$swal.fire("Error", error.message, "error");
          console.log(error)
        });
    },
    reOrder () {
      let cart = [];
      this.order.itemdetails.forEach(i => {
        if (i.isavailable) {
          let cartitem = {
            price: i.old_productinfo.price,
            quantity: i.old_productinfo.quantity,
            unit_price: i.unit_price,
            product: {
              id: i.product_id,
              img_url: i.old_productinfo.img_url,
              name: i.old_productinfo.name,
              price: i.unit_price
            }
          }
          cart.push(cartitem)
        }
      });
      this.$store.dispatch('addToCart', cart)
        .then((r) => {
          this.$router.push({ name: 'Cart' })
        })
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
<style scoped>
#Order_Tracker {
  height: 350px;
  display: flex;
}
.status.complete h5,
.status.active h5 {
  text-align: left;
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 0;
}

.status h5 {
  text-align: left;
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: rgba(124, 124, 124, 1);
}

.subtext {
  text-align: left;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: rgba(152, 152, 152, 1);
}

#market {
  width: 200px;
  height: 34px;
  text-align: left;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 1);
}

.Rectangle_2828 {
  width: 2px;
  height: 350px;
  fill: rgba(229, 229, 229, 1);
}

.check_1 {
  position: absolute;
  width: 36px;
  height: 36px;
  left: 8px;
  top: 65px;
  overflow: visible;
}
.check_2 {
  position: absolute;
  width: 36px;
  height: 36px;
  left: 8px;
  top: 160px;
  overflow: visible;
}
.check_3 {
  position: absolute;
  width: 36px;
  height: 36px;
  left: 8px;
  top: 293px;
  overflow: visible;
}
.check_4 {
  position: absolute;
  width: 36px;
  height: 36px;
  left: 8px;
  top: 361px;
  overflow: visible;
}
.track .complete {
  fill: rgba(53, 49, 144, 1);
}
.track .active {
  fill: rgba(53, 49, 144, 1);
}
.Ellipse_1 {
  position: absolute;
  overflow: visible;
  width: 12px;
  height: 12px;
  left: 19px;
  top: 173px;
}
.Ellipse_2 {
  position: absolute;
  overflow: visible;
  width: 12px;
  height: 12px;
  left: 19px;
  top: 300px;
}
.Ellipse_3 {
  position: absolute;
  overflow: visible;
  width: 12px;
  height: 12px;
  left: 19px;
  top: 368px;
}
.disabled {
  fill: rgba(229, 229, 229, 1);
}
.Ellipse_238 {
  position: absolute;
  overflow: visible;
  width: 12px;
  height: 12px;
  left: 19px;
  top: 293px;
}
.Ellipse_239 {
  position: absolute;
  overflow: visible;
  width: 12px;
  height: 12px;
  left: 19px;
  top: 363px;
}
#order #check {
  overflow: visible;
  position: absolute;
  left: 11px;
  top: 5px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
</style>

