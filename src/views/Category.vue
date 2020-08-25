<template>
  <div>
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

          <div class="product-group container bg-white my-5">

            <div class="row  mt-4 py-4 px-4">
              <div
                v-for="(product, index) in products"
                v-bind:key="product.sku"
                class="col-sm-6 col-md-4 col-lg-3 p-1"
              >
                <div class="product p-3">
                  <div
                    @click="pro=product; viewproduct=true"
                    class="product-image"
                    data-target="#product"
                    data-toggle="modal"
                  >
                    <img
                      :src="'http://localhost:8080'+product.img_url"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    @click="pro=product"
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
                  <div class="product-footer d-flex">
                    <p class="price">₦{{ formatPrice(product.sellingprice) }}</p>
                    <button
                      :id="'btntp'+index"
                      class="addtocart"
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

                      <span>cart</span>
                    </button>
                    <button
                      :id="'addtp'+index"
                      class="addquantity hideqty"
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
                        value=1.0
                        @keypress="restrictChars($event)"
                        @change="inputChange('tp'+index, product.id)"
                      >

                      <input
                        v-else
                        :id="'tp'+index"
                        type="number"
                        min="0"
                        step="1"
                        class="number"
                        value=1
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
                  <i class="material-icons text-center">not_interested</i>
                  <i>No item</i>
                  <img
                    src="../assets/img/app/nodata.png"
                    alt=""
                  >
                </div>
              </infinite-loading>

            </div>
          </div>

        </div>
      </div>
      <storeSelector></storeSelector>
      <Cart />
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
                type="button"
                @click.prevent='doSomethingOnHidden($event)'
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
                    :src="'http://localhost:8080'+pro.img_url"
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
                    <p class="price">₦{{formatPrice(pro.sellingprice)}}</p>
                  </div>
                  <div class="product-cat d-flex">
                    <span class="badge text-lowercase">{{pro.category}}</span>
                  </div>
                  <div class="description">
                    {{pro.description}}
                  </div>
                  <div class="product-footer">
                    <p class="price">₦{{ formatPrice(pro.sellingprice) }}</p>
                    <button
                      :id="'btntp_modal'"
                      class="addtocart"
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

                      <span>cart</span>
                    </button>
                    <button
                      :id="'addtp_modal'"
                      class="addquantity hideqty"
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
                        value=1.0
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
                        value=1
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
import * as $ from "jquery";
import StoreSelector from '@/components/StoreSelector.vue'
import Cart from '@/components/CartComponent.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Category',
  components: {
    StoreSelector, Cart, TopNav, Footer
  },
  data () {
    return {
      loader: '',
      showSearch: false,
      viewproduct: false,
      category: '',
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
    $(this.$refs.pro).on("show.modal", (e) => {
      console.log(e)
      // var add = document.querySelectorAll('.addquantity');
      // [].forEach.call(add, function (el) {
      //   el.classList.add("hideqty");
      // });
      // var btn = document.querySelectorAll('.addtocart');
      // [].forEach.call(btn, function (el) {
      //   el.classList.remove("hideqty");
      // });
    })
    this.category = this.$route.params.cat
    this.fetchProducts()
  },
  methods: {
    fetchProducts ($state) {
      this.page += 1;
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
            // console.log(res)
            let pro = res.data.data.data;
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
      //  addtocart
      console.log($event)
      var add = document.querySelectorAll('.addquantity');
      [].forEach.call(add, function (el) {
        el.classList.add("hideqty");
      });
      var btn = document.querySelectorAll('.addtocart');
      [].forEach.call(btn, function (el) {
        el.classList.remove("hideqty");
      });
    },
  }
}

</script>

