<template>
  <div>
    <TopNav></TopNav>
    <div class=" page">
      <div class="">
        <div class="banner cart-banner">
          <div class="container">
            <h3 class="title">Product View</h3>
          </div>
        </div>
        <div class="content container">
          <div
            v-if="Object.keys(product).length !== 0"
            id="product"
            class="card mt-5 mb-3"
          >
            <div class="card-body">
              <div class="row mt-3">
                <div class="col-sm-5 p-0">

                  <img
                    v-if="product.img_url.includes('https://cdn.marketsquareng.website')"
                    :src="product.img_url"
                    alt=""
                    class="img-fluid img-responsive"
                  >
                  <img
                    v-else
                    :src="'https://admin.sundrymarkets.com'+product.img_url"
                    alt=""
                    class="img-fluid img-responsive"
                  >
                </div>

                <div class="col-sm-7">
                  <div class="product-text">
                    <p class="name">{{product.name}}</p>
                    <p class="sku">({{product.sku}})</p>
                    <p
                      v-if="product.name && (product.name.includes('/KG') || product.name.includes('/ KG'))"
                      class="weight"
                    >(Per Kg)</p>
                  </div>
                  <div class="product-cat d-flex">
                    <span class="badge text-lowercase">{{product.category}}</span>
                  </div>

                  <div class="product-footer">
                    <p
                      v-if="product.active=='1'"
                      class="availability in-stock"
                    ><span><i
                          class="fa fa-check-square-o"
                          style="font-size: 13px;"
                        ></i> &nbsp;In Stock</span>

                    </p>
                    <p
                        v-else
                        class="availability out-stock"
                    ><span><i
                        class="fa fa-check-square-o"
                        style="font-size: 13px;"
                    ></i> &nbsp;Out of Stock</span>

                    </p>
                    <p class="price">
                      <span v-if="product.promo">
                        <span style="color:#ccc;font-size:13px;"><s>₦{{ formatPrice(product.sellingprice) }}</s></span> <br>
                        <span>₦{{ formatPrice(Math.round((product.promo.value_percent/100)*product.sellingprice)) }}</span>
                      </span>
                      <span v-else-if="product.old_price">
                        <span style="color:#ccc;font-size:12px;"><s>₦{{ formatPrice(product.old_price) }}</s></span> <br>
                        <span>₦{{ formatPrice(product.sellingprice) }}</span>
                      </span>
                      <span
                        v-else
                        class="price"
                      > ₦{{ formatPrice(product.sellingprice) }}</span>

                    </p>

                    <button
                      :id="'btntp_modal'"
                      class="addtocart mt-4"
                      v-bind:class="product.hidebtn? 'hideqty':''"
                      v-if="$store.getters.isStoreSet!=false"
                      @click="addToCart(product, 'addtp_modal' ,'btntp_modal' ,'tp_modal')"
                    >
                      <img
                        src="../assets/img/cart.png"
                        class="img1"
                        alt=""
                      >
                      <img
                        class="d-none img2"
                        src="../assets/img/cart-white.png"
                        alt=""
                      >

                      <span>Add to cart</span>
                    </button>
                    <button
                        class="addtocart mt-4"
                        v-else
                        data-toggle="modal"
                        data-target="#store"
                    >
                      <img
                          src="../assets/img/cart.png"
                          class="img1"
                          alt=""
                      >
                      <img
                          class="d-none img2"
                          src="../assets/img/cart-white.png"
                          alt=""
                      >

                      <span>Select Store</span>
                    </button>
                    <button
                      :id="'addtp_modal'"
                      class="addquantity mt-4"
                      v-bind:class="product.hideqty? 'hideqty':''"
                    >
                      <div
                        @click="decreaseQuantity('tp_modal', product.id)"
                        class=" decrease"
                      >-</div>
                      <input
                        v-if="product.description.includes('/KG') || product.description.includes('/ KG')"
                        oninput="validity.valid||(value='');"
                        id='tp_modal'
                        type="number"
                        min="0.001"
                        step="any"
                        class="number"
                        :value=product.cart_qty
                        @keypress="restrictChars($event)"
                        @change="inputChange('tp_modal', product.id)"
                      >

                      <input
                        v-else
                        id='tp_modal'
                        type="number"
                        min="0"
                        step="1"
                        class="number"
                        :value=product.cart_qty
                        @keypress="restrictChars($event)"
                        @change="inputChange('tp_modal', product.id)"
                      />

                      <div
                        @click="increaseQuantity('tp_modal', product.id)"
                        class=" increase"
                      >+</div>
                    </button>

                  </div>
                  <button
                    @click.prevent="$router.push('/home')"
                    id="continue"
                    class="btn"
                  >Continue Shopping</button>

                </div>
              </div>
            </div>

          </div>
          <div v-if='!isEmpty' class="card mb-5">
            <div class="card-body">
              <div class="description">
                <h5><u>Product Description</u> </h5>
                <p> {{product.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Cart v-if='$store.getters.isStoreSet!=false' :products="[product]" />
    <storeSelector></storeSelector>
    <Footer></Footer>
  </div>
</template>


<script>
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import StoreSelector from '@/components/StoreSelector.vue'
import Cart from '@/components/CartComponent.vue'
import * as $ from "jquery";
export default {
  name: 'Product',
  components: {
    TopNav, Footer, StoreSelector, Cart
  },
  data () {
    return {
      product: {
        name: this.$route.params.name,
        description:'',
        cart_qty: 0,
        category: this.$route.params.category,
        hidebtn: true,
        hideqty: true,
        quantity: 0,
        sellingprice: 0,
        newprice: 0,
        img_url: '',
        active: 0,
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true);
    this.loader = this.$loading.show();
  },
  computed : {
    isEmpty() {
      return Object.values(this.product).length == 0
    }
  },
  mounted() {
    this.loader.hide()
    if(this.$store.getters.isStoreSet == false) {
      $("#store").modal('show');
      $(".close.float-right").hide();        
    } else {
        this.getProduct()
    }
  },
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = this.$route.params.name + " | Online Shopping | Market Square";
        }
    },
  },
  methods: {
    getProduct () {
      let req = {
        what: "getproduct",
        showLoader: false,
        params: {
          category: this.$route.params.category,
          storeid: this.$store.getters.store.id,
          name: this.$route.params.name
        }
      }
      this.$request.makeGetRequest(req)
        .then(res => {

          if (res.type == 'getproduct') {
            console.log(res.data.data)
            let pro = res.data.data;

            if(pro != null) {

                let cart = this.$store.getters.cart;

                pro.hidebtn = false;
                pro.hideqty = true;
                pro.cart_qty = pro.description.includes('/KG') || pro.description.includes('/ KG') ? 1.0 : 1;
                cart.forEach(j => {
                  if (pro.id == j.product.id) {
                    pro.hidebtn = true;
                    pro.hideqty = false;
                    pro.cart_qty = j.quantity;
                  }

                })
                this.product = pro;
            } else {
              this.$swal.fire('', `Product ${decodeURI(this.$route.params.name)} Was NoT Found under Category: ${this.$route.params.category} in ${this.$store.getters.store.name} Store`, "error" );
            }
            this.loader.hide()
          }

        })
        .catch(error => {
          this.$swal.fire('', `Product ${decodeURI(this.$route.params.name)} Was NoT Found under Category: ${this.$route.params.category} in ${this.$store.getters.store.name} Store`, "error" );
          console.log(error)
        });
    },
    addToCart (product, addid, addbtn, id) {
      document.getElementById(addid).classList.remove('hideqty');
      document.getElementById(addbtn).classList.add('hideqty')
      // this.loading = true;
      if (product.promo) {
        product["newprice"] = Math.round(
          (product.promo.value_percent / 100) * product.sellingprice
        );
      } else {
        product["newprice"] = product.sellingprice;
      }
      let cart = {
        product: {}
      }
      cart.quantity = document.getElementById(id).value;
      cart.unit_price = product.newprice;
      cart.price = product.newprice * cart.quantity;
      cart.product.id = product.id;
      cart.product.name = product.name;
      cart.product.price = product.newprice;
      cart.product.img_url = product.img_url;
      let cart_array = this.$store.getters.cart;
      let check = [];
      // cart_array.push(cart
      if (cart_array.length > 0) {
        cart_array.forEach(i => {
          if (i.product.id == cart.product.id) {
            check.push(1);
            i.quantity = parseInt(i.quantity) + 1;
            i.price += Number(i.unit_price);
            document.getElementById(id).value = i.quantity;
          }
          else {
            check.push(0)
          }
        })
        // console.log(check)
        if (!check.includes(1)) {
          cart_array.push(cart)
        }
      }
      else {
        cart_array.push(cart)
      }
      this.$store.dispatch('addToCart', cart_array)
    },
    removeFromCart (id) {
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
      if (value == 0) {
        document.getElementById('add' + id).classList.add('hideqty');
        document.getElementById('btn' + id).classList.remove('hideqty');
        this.removeFromCart(product_id);
      }
      else if (Math.sign(value) == '-1') {
        value = 1;
        document.getElementById(id).value = 1;
      }
      else {

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

      if (value != 0) {
        value = Number(value) - 1;
        if (value == 0) {
          document.getElementById('add' + id).classList.add('hideqty');
          document.getElementById('btn' + id).classList.remove('hideqty')
          // document.getElementById(id).value = 1;
          this.removeFromCart(product_id)
        }
        else {
          document.getElementById(id).value = value;
        }
      }
      else {
        value = 1;
        document.getElementById(id).value = value;
      }
      this.updateCartQuantity(value, product_id, "-");

    },
    updateCartQuantity (value, product_id, action) {
      // console.log(value)
      // console.log(action)
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
      if ($event.key !== '-' || $event.code !== 'Minus') {
        return true
      } else {
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
#product .product-text .name {
  font-size: 0.96rem;
}
#product .product-text .sku {
  font-size: 13px;
  color: #9e9e9e;
}
#product .price {
  font-size: 23px;
  color: #f44336;
}
.description p {
  font-size: 13px;
}
#product .product-footer {
  margin-top: 15px;
}
#product img {
  max-height: 344px;
  text-align: center;
}
.card {
  border: 5px solid #ebebeb;
  border-radius: 0;
}
.availability.in-stock {
  padding: 3px 0;
  width: 100px;
}
.availability.out-stock {
  padding: 3px 0;
  width: 100px;
}
.availability.in-stock span {
  color: #fff;
  font-size: 11px;
  line-height: 16px;
  display: block;
  background: #6dbe14;
  text-transform: uppercase;
  padding: 6px 8px;
  font-weight: 700;
  border-radius: 3px;
}

.availability.out-stock span {
  color: #fff;
  font-size: 11px;
  line-height: 16px;
  display: block;
  background: #ea1414;
  text-transform: uppercase;
  padding: 6px 8px;
  font-weight: 700;
  border-radius: 3px;
}
#continue {
  position: absolute;
  top: 0;
  right: 0;
  width: 162px;
}
</style>