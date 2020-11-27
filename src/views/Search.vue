<style scoped>
.btn {
  background: #000066 !important;
  color: #fff !important;
  box-shadow: 2px 3px #ccc; 
  /* margin-bottom: 10px; */
}
.text {
  font-size: 15px;
}
.searchError{
  font-size: 16px;
  font-weight: bold;
}
.rounded {
  width: 30vh;
  /* height: */
}
</style>
<template>
  <div>
    <Disclaimer />
    <TopNav></TopNav>
    <div class="search page">
      <div class="container">

        <div class="content">

          <div class="product-group container bg-white my-5 py-2">

            <div v-if="products.length < 1 && !this.loader.isActive" class="text-center" style="width: inherit;">
              <img class="rounded mx-auto mb-2" src="../assets/img/app/failed_search.jpg"/>
              <p class="searchError">We didn't find the results for <i>"{{searchQuery}}".</i></p>
              <p class="text"> - Kindly double-check the spelling or use simple or related words.</p>
              <p class="text"> - The product you are looking for might be in our store but not yet online.</p>
              <p><div class="btn mr-auto" @click="chat()">Chat To Find Offline Products</div>
              <div class="btn ml-2" @click="$router.push('/home#menu')">Continue Shopping</div></p>
            </div>
            <div class="row  mt-4 pb-2  px-md-2 pb-sm-2">
              <div
                v-for="(product, index) in products"
                v-bind:key="product.sku"
                class="col-6 col-md-3 col-lg-2 p-1"
              >
                <div class="product p-md-2 p-sm-1">
                  <div
                    @click="viewProduct(product)"
                    class="product-image"
                    data-target="#product"
                    data-toggle="modal"
                  >
                    <img
                      v-if="product.img_url.includes('https://cdn.marketsquareng.website')"
                      v-lazy="product.img_url"
                      alt=""
                      class="img-fluid"
                    >
                    <img
                      v-else
                      v-lazy="'https://admin.sundrymarkets.com'+product.img_url"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    @click="viewProduct(product)"
                    class="product-text"
                    data-target="#product"
                    data-toggle="modal"
                  >
                    <p class="description">{{product.name}}</p>
                    <p
                      v-if="product.description.includes('/KG') || product.description.includes('/ KG')"
                      class="weight"
                    >(Per Kg)</p>
                  </div>
                  <div class="product-footer">
                    <p class="price">
                      <span v-if="product.promo">
                        <span style="color:#ccc;font-size:12px;"><s>₦{{ formatPrice(product.sellingprice) }}</s></span> <br>
                        <span>₦{{ formatPrice(Math.round((product.promo.value_percent/100)*product.sellingprice)) }}</span>
                      </span>
                      <span
                        v-else
                        class="price"
                      > ₦{{ formatPrice(product.sellingprice) }}</span>

                    </p>

                    <button
                      :id="'btntp'+index"
                      class="addtocart"
                      v-bind:class="product.hidebtn? 'hideqty':''"
                      @click="addToCart(product, 'addtp'+index ,'btntp'+index ,'tp'+index)"
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
                      :id="'addtp'+index"
                      class="addquantity"
                      v-bind:class="product.hideqty? 'hideqty':''"
                    >
                      <div
                        @click="decreaseQuantity('tp'+index, product.id)"
                        class=" decrease"
                      >-</div>
                      <input
                        v-if="product.description.includes('/KG') || product.description.includes('/ KG')"
                        oninput="validity.valid||(value='');"
                        :id="'tp'+index"
                        type="number"
                        min="0.001"
                        step="any"
                        class="number"
                        :value=product.cart_qty
                        @keypress="restrictChars($event)"
                        @change="inputChange('tp'+index, product.id)"
                      >

                      <input
                        oninput="validity.valid||(value='');"
                        v-else
                        :id="'tp'+index"
                        type="number"
                        min="0"
                        step="1"
                        class="number"
                        :value=product.cart_qty
                        @keypress="restrictChars($event)"
                        @change="inputChange('tp'+index, product.id)"
                      />

                      <div
                        @click="increaseQuantity('tp'+index, product.id)"
                        class=" increase"
                      >+</div>
                    </button>
                  </div>

                </div>
              </div>
              
              <infinite-loading
                @distance="1"
                :onInfinite="fetchProducts"
                ref="infiniteLoading"
                spinner="bubbles"
              >
                <span
                  slot="no-results"
                  class="text-center"
                > 
                <!-- <img
                    src="../assets/img/app/nodata.png"
                    alt=""
                  >  -->
                  
                  </span>
              </infinite-loading>
            </div>
          </div>

        </div>
      </div>
      <storeSelector></storeSelector>
      <Cart :products="products" />
      <!-- Product Modal -->
      <div
        v-if='viewproduct'
        class="modal fade"
        id="product"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">

              <button
                @click.prevent='doSomethingOnHidden($event)'
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-5">
                  <img
                    v-if="pro.img_url.includes('https://cdn.marketsquareng.website')"
                    :src="pro.img_url"
                    alt=""
                    class="img-fluid"
                  >
                  <img
                    v-else
                    :src="'https://admin.sundrymarkets.com'+pro.img_url"
                    alt=""
                    class="img-fluid"
                  >
                </div>
                <div class="col-7">
                  <div class="product-text">
                    <p class="name">{{pro.name}}</p>
                    <p
                      v-if="pro.description && (pro.description.includes('/KG') || pro.description.includes('/ KG'))"
                      class="weight"
                    >(Per Kg)</p>
                  </div>
                  <div class="product-cat d-flex">
                    <span class="badge text-lowercase">{{pro.category}}</span>
                  </div>
                  <div class="description">
                    {{pro.description}}
                  </div>
                  <div class="product-footer">
                    <p class="price">
                      <span v-if="pro.promo">
                        <span style="color:#ccc;font-size:13px;"><s>₦{{ formatPrice(pro.sellingprice) }}</s></span> <br>
                        <span>₦{{ formatPrice(Math.round((pro.promo.value_percent/100)*pro.sellingprice)) }}</span>
                      </span>
                      <span
                        v-else
                        class="price"
                      > ₦{{ formatPrice(pro.sellingprice) }}</span>

                    </p>
                    <button
                      :id="'btntp_modal'"
                      class="addtocart"
                      v-bind:class="pro.hidebtn? 'hideqty':''"
                      @click="addToCart(pro, 'addtp_modal' ,'btntp_modal' ,'tp_modal')"
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
                      :id="'addtp_modal'"
                      class="addquantity"
                      v-bind:class="pro.hideqty? 'hideqty':''"
                    >
                      <div
                        @click="decreaseQuantity('tp_modal', pro.id)"
                        class=" decrease"
                      >-</div>
                      <input
                        v-if="pro.description.includes('/KG') || pro.description.includes('/ KG')"
                        oninput="validity.valid||(value='');"
                        id='tp_modal'
                        type="number"
                        min="0.001"
                        step="any"
                        class="number"
                        :value=pro.cart_qty
                        @keypress="restrictChars($event)"
                        @change="inputChange('tp_modal', pro.id)"
                      >

                      <input
                        v-else
                        id='tp_modal'
                        type="number"
                        min="0"
                        step="1"
                        class="number"
                        :value=pro.cart_qty
                        @keypress="restrictChars($event)"
                        @change="inputChange('tp_modal', pro.id)"
                      />

                      <div
                        @click="increaseQuantity('tp_modal', pro.id)"
                        class=" increase"
                      >+</div>
                    </button>
                  </div>

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
import StoreSelector from '@/components/StoreSelector.vue'
import Cart from '@/components/CartComponent.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import Disclaimer from '@/components/Disclaimer.vue'
export default {
  name: 'Search',
  components: {
    StoreSelector, Cart, TopNav, Footer, Disclaimer
  },
  data () {
    return {
      showSearch: false,
      viewproduct: false,
      searchQuery: "",
      storeid: '',
      page: 0,
      products: [],
      pro: '',
      loader: ''
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true);
    this.loader = this.$loading.show();
  },
  mounted () {

    this.storeid = this.$store.getters.store.id
    this.searchQuery = this.$route.params.search
    this.fetchProducts();
  },
  methods: {
    chat() {
      Tawk_API.toggle();
    },
    fetchProducts ($state) {
      this.page += 1;
      let req = {
        what: "search",
        showLoader: false,
        params: {
          storeid: this.storeid,
          search_query: this.searchQuery,
          page: this.page
        }
      }
      this.$request.makeGetRequest(req)
        .then(res => {

          if (res.type == 'search') {
            // console.log(res.data.data.data)
            let pro = res.data.data.data;
            let cart = this.$store.getters.cart;
            pro.forEach(i => {
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
            console.log(pro)
            if (pro.length > 0) {
              pro.forEach($product => this.products.push($product));
              if ($state) $state.loaded();
            } else {
              if ($state) $state.complete();
            }
            this.loader.hide()
          }

        })
        .catch(error => {

          console.log(error)
        });
    },
    viewProduct (product) {
      history.pushState({}, null, `/product/${product.store_id}/${product.category}/${product.name}`);
      let cart = this.$store.getters.cart;
      cart.forEach(j => {
        if (product.id == j.product.id) {
          product.hidebtn = true;
          product.hideqty = false;
          product.cart_qty = j.quantity;
        }

      })
      this.pro = product;
      this.viewproduct = true
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
      // cart_array.push(cart)
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
          console.log('no')
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
        document.getElementById('btn' + id).classList.remove('hideqty')
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
    doSomethingOnHidden ($event) {
      history.back()
      let cart = this.$store.getters.cart;
      this.products.forEach(i => {
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
      //  addtocart
      // console.log($event)
      // var add = document.querySelectorAll('.addquantity');
      // [].forEach.call(add, function (el) {
      //   el.classList.add("hideqty");
      // });
      // var btn = document.querySelectorAll('.addtocart');
      // [].forEach.call(btn, function (el) {
      //   el.classList.remove("hideqty");
      // });
    },
  }
}

</script>

