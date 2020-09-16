<template>
  <div>
    <TopNav></TopNav>
    <div class="cart page">
      <div class="">
        <div class="banner cart-banner">
          <div class="container">
            <h3 class="title">Cart</h3>
          </div>
        </div>
        <div class="content container">
          <div class="row my-5">
            <div class="col-md-8">
              <table class="table table-responsive">
                <thead>
                  <tr>

                    <th scope="col">Product</th>
                    <th scope="col"></th>
                    <th scope="col">Qty</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Total</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, i) in cart"
                    v-bind:key="i"
                  >

                    <td class="">

                      <img
                        :src="'https://marketsquareng.com'+row.product.img_url"
                        alt=""
                        class="img"
                      >

                    </td>
                    <td class="productname">{{row.product.name}}</td>
                    <td>
                      <input
                        v-if="row.product.name.includes('/KG') || row.product.name.includes('/ KG')"
                        oninput="validity.valid||(value='');"
                        :id="i"
                        type="number"
                        min="0.001"
                        step="any"
                        class="number qty"
                        v-model=row.quantity
                        @keypress="restrictChars($event)"
                        @change="inputChange(i, row.product.id)"
                      >

                      <input
                        v-else
                        :id="i"
                        type="number"
                        min="1"
                        step="1"
                        class="number qty"
                        v-model=row.quantity
                        oninput="validity.valid||(value='');"
                        @keypress="restrictChars($event)"
                        @change="inputChange(i, row.product.id)"
                      />
                    </td>
                    <td>₦{{formatPrice(row.unit_price)}} </td>
                    <td>₦{{formatPrice(row.price)}} </td>
                    <td> <img
                        @click="removeItem(row)"
                        style="cursor:pointer;"
                        src="../assets/img/cancel.png"
                        alt=""
                        title="Remove item"
                      ></td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title text-bold">Cart Total</h5>
                  <table class="table table-sm">

                    <tbody>
                      <tr>
                        <td class="float-left">Cart Subtotal</td>
                        <td class="float-right">₦{{formatPrice(cart_subtotal)}}</td>
                      </tr>

                    </tbody>
                  </table>
                  <div class="mt-4 total d-flex  justify-content-between">
                    <p>Total</p>
                    <h5>₦{{formatPrice(cart_total)}}</h5>
                  </div>
                  <button
                    id="continue"
                    @click="$router.push('home')"
                  >Continue Shopping</button>
                  <button
                    v-bind:disabled="cart_total < 3000"
                    v-bind:class="cart_total < 3000? 'disabled': ''"
                    @click="handleCheckout"
                  >Proceed to checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Cart',
  components: {
    TopNav, Footer
  },
  data () {
    return {
      cart: [],
      cart_total: 0,
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true)
  },
  mounted () {
    // this.cart = this.$store.getters.cart;

    // this.cart.forEach(i => {
    //   this.cart_subtotal += Number(i.price);
    // })
    // this.cart_total = this.cart_subtotal
  },
  computed: {
    cart_subtotal () {
      this.cart = this.$store.getters.cart;
      let total = 0;
      this.cart.forEach(i => {
        total += Number(i.price);
      })
      this.cart_total = total;
      return total;
    }
  },
  methods: {
    removeItem (row) {
      let index;
      let cart = this.$store.getters.cart;
      cart.forEach((i, ind) => {
        if (i.product.id == row.product.id) {
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
    handleCheckout () {
      if (this.$store.getters.isLoggedIn) {
        let cart = this.$store.getters.cart;
        let cartitems = [];
        cart.forEach(i => {
          let x = {
            product_id: i.product.id,
            quantity: i.quantity,
            unit_price: i.unit_price,
            price: i.price
          }
          cartitems.push(x)
        })

        let data = {
          user_id: this.$store.getters.user.id,
          totalquantity: cart.length,
          total_price: this.cart_total,
          checkout: "0",
          storeid: this.$store.getters.store.id,
          checkoutitems: cartitems
        }
        console.log(data);
        var req = {
          what: "createcart",
          data: data,
          showLoader: true
        };
        this.$request
          .makePostRequest(req)
          .then(response => {
            this.$router.push({ name: 'Checkout' })

          })
          .catch(error => {
            console.log(error)
            this.$swal.fire("Error", error.message, "error");
          });
      }
      else {
        this.$router.push({ name: 'Checkout' })
      }
    },
    restrictChars: function ($event) {
      if ($event.key !== '-') {
        return true
      }
      else {
        $event.preventDefault();
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
#continue {
  background: #e8e8e8;
  color: #000066;
}
.cart .card {
  position: sticky;
  top: 25%;
}
</style>