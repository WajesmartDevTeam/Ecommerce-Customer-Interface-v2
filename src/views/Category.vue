<template>
  <div>
    <Disclaimer />
    <TopNav></TopNav>
    <div class="category page">
      <div class="container">
        <div
          class="banner category-banner mt-5"
          v-bind:class='category.replace(/\s+/g, "")'
        >
          <div
            class="banner-text"
            style="width:100%"
          >
            <!-- <h3 class="title text-center text-capitalize">{{category}}</h3> -->

          </div>
        </div>
        <div class="content">

          <div class="product-group container bg-white my-5 py-2">

            <div v-if="category.toLowerCase().includes('hamper')" class="row mt-4 pb-2  px-md-2 pb-sm-2">
              <div
                v-for="(product, index) in products"
                v-bind:key="product.sku"
                class="col-sm-12 col-md-3 col-lg-3 p-1"
              >
                <div class="product p-md-2 p-sm-1" style="height: auto !important">
                  <div
                    @click="viewProduct(product)"
                    class="hamper"
                    style="height: auto !important"
                    data-target="#product"
                    data-toggle="modal"
                  >
                    <img
                      style=""
                      v-lazy="image_url+product.img_url"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    @click="viewProduct(product)"
                    class="product-text"
                    style="margin: auto !important; height: auto !important"
                    data-target="#product"
                    data-toggle="modal"
                  >
                    <p class="description">{{product.name}}</p>
                    <p class="description desc"><b>Content: </b>{{product.description}}</p>
                    <p class="description"><a @click.prevent="" style="text-decoration: underline !important; color: #000066;">View Full Content</a></p>
                  </div>
                  
                  <div class="product-footer" style="height: auto !important">
                    <p class="price">
                      <span v-if="product.promo">
                        <span style="color:#ccc;font-size:12px;"><s>₦{{ formatPrice(product.sellingprice) }}</s></span> <br>
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
                        v-else
                        oninput="validity.valid||(value='');"
                        :id="'tp' +index"
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
                @infinite="fetchProducts"
              >
                <div slot="no-more">
                  <!-- <i class="material-icons text-center">info_outline</i> -->
                  <!-- <i>No more items</i> -->

                </div>
                <div slot="no-results">
                  <!-- <i class="material-icons text-center">not_interested</i>
                  <i>No item</i> -->

                </div>
              </infinite-loading>

            </div>
            <div v-else class="row mt-4 pb-2 px-md-2 pb-sm-2">
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
                      v-lazy="image_url+product.img_url"
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
                        v-else
                        oninput="validity.valid||(value='');"
                        :id="'tp' +index"
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
                @infinite="fetchProducts"
              >
                <div slot="no-more">
                  <!-- <i class="material-icons text-center">info_outline</i> -->
                  <!-- <i>No more items</i> -->

                </div>
                <div slot="no-results">
                  <!-- <i class="material-icons text-center">not_interested</i>
                  <i>No item</i> -->

                </div>
              </infinite-loading>

            </div>
          </div>

        </div>
      </div>
      <storeSelector></storeSelector>
      <Cart :products="products" />
      <!-- Product Modal -->
      <div
        ref='pro'
        v-if='viewproduct'
        class="modal fade"
        id="product"
        tabindex="-1"
        role="dialog"
        data-keyboard="false"
        data-backdrop="static"
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
                <div class="col-4">

                  <img
                    v-if="pro.img_url.includes('https://cdn.marketsquareng.website')"
                    :src="pro.img_url"
                    alt=""
                    class="img-fluid"
                  >
                  <img
                    v-else
                    :src="image_url+pro.img_url"
                    alt=""
                    class="img-fluid"
                  >
                </div>
                <div  :class="category.toLowerCase().includes('hamper') ? 'col-2' : 'col-7'">
                  <div class="product-text" >
                    <p class="name mb-2" style="height: auto !important">{{pro.name}}</p>
                    <p
                      v-if="pro.description && (pro.description.includes('/KG') || pro.description.includes('/ KG'))"
                      class="weight"
                    >(Per Kg)</p>
                  </div>
                  <div class="product-cat d-flex">
                    <span class="badge text-lowercase">{{pro.category}}</span>
                  </div>
                  <div class="product-footer">
                    <p class="price">
                      <span v-if="pro.promo">
                        <span style="color:#ccc;font-size:13px;"><s>₦{{ formatPrice(pro.sellingprice) }}</s></span> <br>
                        <span>₦{{ formatPrice(Math.round((pro.promo.value_percent/100)*pro.sellingprice)) }}</span>
                      </span>
                      <span v-else-if="pro.old_price">
                        <span style="color:#ccc;font-size:12px;"><s>₦{{ formatPrice(pro.old_price) }}</s></span> <br>
                        <span>₦{{ formatPrice(pro.sellingprice) }}</span>
                      </span>
                      <span
                        v-else
                        class="price"
                      > ₦{{ formatPrice(pro.sellingprice) }}</span>

                    </p>

                    <button
                      :id="'btntp_modal'"
                      class="addtocart"
                      :style="{'text-align: left !important' : pro.category.toLowerCase().includes('hampers')}"
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
                      :style="{'text-align: left !important' : pro.category.toLowerCase().includes('hampers')}"
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
                <div class="col-md-6 col-sm-12" v-if="category.toLowerCase().includes('hamper')">
                  <div class="description p-0 m-0">
                    {{pro.description}}
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

<style scoped>
/* html {
  --lh: 1.4rem;
  line-height: var(--lh);
} */

.truncate-overflow {
  /* --max-lines: 2; */
  position: relative;
  /* max-height: calc(var(--lh) * var(--max-lines)); */
  max-height: 2.3rem;
  overflow: hidden;
  padding-right: 1rem; /* space for ellipsis */
}
.truncate-overflow::before {
  position: absolute;
  content: "...";
  inset-block-end: 0; /* "bottom" */
  inset-inline-end: 0; /* "right" */
}
.truncate-overflow::after {
  content: "";
  position: absolute;
  inset-inline-end: 0; /* "right" */
  width: 1rem;
  height: 1rem;
  background: white;
}
.desc{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script>
import * as $ from "jquery";
import StoreSelector from '@/components/StoreSelector.vue'
import Cart from '@/components/CartComponent.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import Disclaimer from '@/components/Disclaimer.vue'
export default {
  name: 'Category',
  components: {
    StoreSelector, Cart, TopNav, Footer, Disclaimer
  },
  data () {
    return {
        banners: [
          {
            name: 'xmas',
            img_url: window.location.origin+'/xmas.jpg'
          }
        ],
      loader: '',
      showSearch: false,
      viewproduct: false,
      category: '',
      image_url: this.$request.url,
      page: 0,
      products: [],
      pro: '',
      cart: {
        quantity: "",
        unit_price: "",
        price: "",
        product: {
          id: "",
          name: "",
          price: "",
          img_url: ""
        }
      },
    }
  },

  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true);
    this.loader = this.$loading.show();
  },
  mounted () {

    this.category = this.$route.params.cat
    if(this.$store.getters.isStoreSet) {
      this.fetchProducts()
    } else {
      this.loader.hide();
    }
    // this.fetchBanners();
  },
  methods: {
    fetchBanners () {
      let req = {
        what: "banners",
        showLoader: false,
      }
      this.$request.makeGetRequest(req)
          .then(response => {

            if (response.type == 'banners') {
              this.banners = response.data.data.filter((banner) => banner.name.toLowerCase().includes('xmas'))
            //   this.$store.dispatch('banners', response.data.data)
            }
          })
          .catch(error => {

            console.log(error)
          });
    },
    fetchProducts ($state) {
      this.page += 1; ``
      let req = {
        what: "categories",
        showLoader: false,
        params: {
          storeid: this.$store.getters.store.id,
          category: this.category,
          page: this.page
        }
      }
      this.$request.makeGetRequest(req)
        .then(res => {
          if (res.type == 'categories') {
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
            // console.log(this.$store.getters.cart)
            if (pro.length > 0) {
              pro.forEach($product => this.products.push($product));
              if ($state) $state.loaded();
            } else {
              if ($state) $state.complete();
            }

            // let path = '..'
            // i.img_url = path.concat(i.img_url)
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

