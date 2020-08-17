<template>
  <div class="cartcomponent">
    <div
      id="cart-icon"
      data-toggle="modal"
      data-target="#sidecart"
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
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-0">
            <div>
              <div
                v-for="(row, index) in getCart"
                class="cart-item row"
                v-bind:key="index"
              >
                <div class="col-4 p-0">
                  <img
                    :src="'http://localhost:8080'+row.product.img_url"
                    alt=""
                    class="img-fluid"
                  >
                </div>
                <div class="col-8">
                  <p class="name">{{row.product.name}}</p>
                  <p class="price">₦ {{formatPrice(row.product.price)}}</p>
                  <div class="addquantity">
                    <div class="value-button decrease">-</div>
                    <input
                      oninput="validity.valid||(value='');"
                      id="0"
                      type="number"
                      min="1"
                      :value="row.quantity"
                      class="number"
                    >
                    <div class="value-button increase">+</div>
                  </div>
                </div>
              </div>
            </div>
            <p
              v-if="cart_total < 3000"
              class="minimum text-bold"
            >₦3,000 Minimum</p>
            <div class="checkout">
              <button @click="handleCheckout">
                <span>Checkout</span>
                <span class="total">₦ {{formatPrice(cart_total)}}</span>
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
    msg: String
  },
  data () {
    return {
      cart_total: 0,
      cart: []
    }
  },
  mounted () {
    // this.cart = this.$store.getters.cart;
    $(this.$refs.cartm).on("show.bs.modal", (e) => {
      var add = document.querySelectorAll('.addquantity');
      [].forEach.call(add, function (el) {
        el.classList.add("hideqty");
      });
      var btn = document.querySelectorAll('.addtocart');
      [].forEach.call(btn, function (el) {
        el.classList.remove("hideqty");
      });
    })
  },
  computed: {
    getCart () {
      let c = this.$store.getters.cart;
      this.cart = c;
      let total = 0
      c.forEach(i => {
        total += i.price;
      });
      this.cart_total = total;
      return c;
    }
  },
  // watch: {
  //   cart () {
  //     this.cart.forEach(i => {
  //       this.cart_total += i.price
  //     })
  //   }
  // },
  methods: {
    handleCheckout () {
      $(".modal").modal("hide");
      this.$router.push({ name: 'Cart' })
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
</style>
