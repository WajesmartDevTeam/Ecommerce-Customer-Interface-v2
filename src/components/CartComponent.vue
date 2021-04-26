<template>
  <div class="cartcomponent">
    <div
      id="cart-icon"
      data-toggle="modal"
      data-target="#sidecart"
      @click="hideChat"
    >
      <p id="cart-count">
        <span class="material-icons">
          local_mall
        </span>
        <span> {{cart.length}} Item<span v-if="cart.length >1">s</span></span>
      </p>
      <button id="cart-price">₦{{formatPrice(cart_total)}}</button>
    </div>

    <!-- Sidecart Modal -->
    <div
      class="modal fade"
      id="sidecart"
      tabindex="-1"
      role="dialog"
      ref="cartm"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="count modal-title">
              <span class="material-icons ">
                local_mall
              </span>
              <span> {{cart.length}} Item<span v-if="cart.length >1">s</span></span>
            </p>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="showChat"
              title="Continue shopping"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-0">
            <div v-if="getCart.length >0">
              <div
                v-for="(row, index) in getCart"
                class="cart-item row"
                v-bind:key="index"
              >
                <div class="col-3 p-0">

                  <img
                    v-if="row.product.img_url.includes('https://cdn.marketsquareng.website')"
                    :src="row.product.img_url"
                    alt=""
                    class="img-fluid"
                  >
                  <img
                    v-else
                    :src="url+row.product.img_url"
                    alt=""
                    class="img-fluid"
                  >
                </div>
                <div class="col-7">
                  <p class="name">{{row.product.name}}</p>
                  <p class="price">₦ {{formatPrice(row.product.price)}}</p>
                  <div class="addq">
                    <div
                      style="cursor:pointer;"
                      class="value-button decrease"
                      @click="decreaseQuantity(index, row.product.id)"
                    >-</div>
                    <input
                      v-if="row.product.name.includes('/KG') || row.product.name.includes('/ KG')"
                      oninput="validity.valid||(value='');"
                      :id="index"
                      type="number"
                      min="0.001"
                      step="any"
                      class="number"
                      v-model=row.quantity
                      @keypress="restrictChars($event)"
                      @change="inputChange(index, row.product.id)"
                    >

                    <input
                      v-else
                      :id="index"
                      type="number"
                      min="1"
                      step="1"
                      class="number"
                      v-model=row.quantity
                      oninput="validity.valid||(value='');"
                      @keypress="restrictChars($event)"
                      @change="inputChange(index, row.product.id)"
                    />

                    <div
                      @click="increaseQuantity(index, row.product.id)"
                      class="value-button increase"
                      style="cursor:pointer;"
                    >+</div>

                  </div>

                </div>
                <div class="col-2">
                  <span
                    @click="removeItem(row.product.id)"
                    style="color: #F44336;cursor:pointer;"
                    class="material-icons"
                  >
                    clear
                  </span>
                </div>
              </div>

            </div>

            <div
              v-else
              class="my-3 text-center"
            >
              <img
                src="../assets/img/shop-icon.png"
                alt=""
              >
              <h5 class="title">Your cart is empty</h5>
              <button
                class="btn empty_btn"
                data-dismiss='modal'
              >Shop Now</button>
            </div>
          </div>

          <div v-if="getCart.length > 0" class="modal-footer">
            <p  v-if="$store.getters.cart_total < 10000" class="small-red-focus blinking"><b>Add &#x20A6;{{(10000 - $store.getters.cart_total).toLocaleString()}} for free delivery</b></p>
            <p  v-if="$store.getters.cart_total >= 10000" class="text-center"><b>You qualify for free delivery</b></p>

            <p v-if="$store.getters.cart_total < 1500" class="minimum text-bold" style="font-size:17px">₦1,500 Minimum</p>

            <div class="checkout">
              <button v-bind:disabled="$store.getters.cart_total < 1500" v-bind:class="$store.getters.cart_total < 1500? 'disabled': ''" @click="handleCheckout">
                <span>Checkout</span>
                <span class="total">₦ {{formatPrice($store.getters.cart_total)}}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as $ from "jquery";
export default {
  name: 'Cart',
  props: {
    products: Array,
    home_products: Object
  },
  data () {
    return {
      cart_total: 0,
      cart: [],
      url: this.$request.url,
    }
  },
  mounted () {

    $(this.$refs.cartm).on("hidden.bs.modal", (e) => {
      let cart = this.$store.getters.cart;
      if (this.$props.products) {
        this.$props.products.forEach(i => {
          i.hidebtn = false;
          i.hideqty = true;
          i.cart_qty = i.description.includes('/KG') || i.description.includes('/ KG') ? 1.0 : 1;
          cart.forEach(j => {
            if (i.id == j.product.id) {
              i.hidebtn = true;
              i.hideqty = false;
              i.cart_qty = j.quantity;
            }

          })
        })
      }
      else {
        this.$props.home_products.top.forEach(i => {
          i.hidebtn = false;
          i.hideqty = true;
          i.cart_qty = i.description.includes('/KG') || i.description.includes('/ KG') ? 1.0 : 1;
          cart.forEach(j => {
            if (i.id == j.product.id) {
              i.hidebtn = true;
              i.hideqty = false;
              i.cart_qty = j.quantity;
            }

          })
        })
        this.$props.home_products.beverages.forEach(i => {
          i.hidebtn = false;
          i.hideqty = true;
          i.cart_qty = i.description.includes('/KG') || i.description.includes('/ KG') ? 1.0 : 1;
          cart.forEach(j => {
            if (i.id == j.product.id) {
              i.hidebtn = true;
              i.hideqty = false;
              i.cart_qty = j.quantity;
            }

          })
        })
        this.$props.home_products.water.forEach(i => {
          i.hidebtn = false;
          i.hideqty = true;
          i.cart_qty = i.description.includes('/KG') || i.description.includes('/ KG') ? 1.0 : 1;
          cart.forEach(j => {
            if (i.id == j.product.id) {
              i.hidebtn = true;
              i.hideqty = false;
              i.cart_qty = j.quantity;
            }

          })
        })
        this.$props.home_products.commodities.forEach(i => {
          i.hidebtn = false;
          i.hideqty = true;
          i.cart_qty = i.description.includes('/KG') || i.description.includes('/ KG') ? 1.0 : 1;
          cart.forEach(j => {
            if (i.id == j.product.id) {
              i.hidebtn = true;
              i.hideqty = false;
              i.cart_qty = j.quantity;
            }

          })
        })
      }

      // var add = document.querySelectorAll('.addquantity');
      // [].forEach.call(add, function (el) {
      //   el.classList.add("hideqty");
      // });
      // var btn = document.querySelectorAll('.addtocart');
      // [].forEach.call(btn, function (el) {
      //   el.classList.remove("hideqty");
      // });
    })
  },
  computed: {
    getCart () {
      let c = this.$store.getters.cart;
      this.cart = c;
      let total = 0
      c.forEach(i => {
        total += Number(i.price);
      });
      this.cart_total = total;
      return c;
    }
  },
  methods: {
    showChat() {
      Tawk_API.showWidget();
    },
    hideChat() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        Tawk_API.hideWidget();
      }
    },
    removeItem (id) {
      let index;
      let cart = this.$store.getters.cart;
      cart.forEach((i, ind) => {
        if (i.product.id == id) {
          index = ind
        }
      })
      cart.splice(index, 1);
      this.$store.dispatch('addToCart', cart)
    },
    inputChange (id, product_id) {
      var value = document.getElementById(id).value;
      if (value == '') {
        document.getElementById(id).value = 1;
        value = 1;
      }
      this.updateCartQuantity(value, product_id, "input");
    },
    increaseQuantity (id, product_id) {
      var value = document.getElementById(id).value
      var v = Number(value) + 1;
      document.getElementById(id).value = v;
      this.updateCartQuantity(v, product_id, "+");
    },
    decreaseQuantity (id, product_id) {
      var value = document.getElementById(id).value;
      if (Number(value) > 1) {
        this.updateCartQuantity(value, product_id, "-");
      }


    },
    updateCartQuantity (value, product_id, action) {
      let cart_array = this.$store.getters.cart;
      cart_array.forEach(i => {
        if (product_id == i.product.id) {
          if (action == '+') {
            i.quantity = parseInt(i.quantity) + 1;
            i.price += parseInt(i.unit_price);
          }
          else if (action == '-') {
            i.quantity = parseInt(i.quantity) - 1;
            i.price -= parseInt(i.unit_price);
          }
          else {
            i.quantity = value;
            i.price = parseInt(i.unit_price) * value;

          }
        }
      })
      this.$store.dispatch('addToCart', cart_array)
    },
    restrictChars: function ($event) {
      if ($event.key !== '-') {
        return true
      }
      else {
        $event.preventDefault();
      }
    },
    handleCheckout () {

      if (this.cart_total >= 1500) {
        this.showChat()
        $(".modal").modal("hide");
        this.$router.push({ name: 'Cart' })
      }
      else {
        this.$toasted.show('The minimum order amount is N1500.')

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
.empty_btn {
  height: 40px;
  background: #000066 0% 0% no-repeat padding-box;
  border-radius: 2px;
  border: 0;
  color: #fff;
  font-size: 12px;
  width: 100%;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 30px;
}
.empty_btn:hover {
  background: #ffffff 0% 0% no-repeat padding-box;
  color: #000066;
  border: 1px solid #000066;
}
.small-red-focus{
  color:red;
  font-size:14px;
  text-align:center;
}
#sidecart .checkout {
    margin-top: 2mm !important;
}

.blinking{
    animation:blinkingText 1.5s infinite;
}
@keyframes blinkingText{
    0%{     color: red; }
    49%{    color: red; }
    60%{    color: red; }
    65%{    color: red; }
    99%{    color:red;  }
    100%{   color: red;    }
}
</style>
