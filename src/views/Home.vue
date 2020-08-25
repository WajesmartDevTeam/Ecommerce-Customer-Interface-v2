<template>
  <div>
    <TopNav></TopNav>
    <div class="home page">
      <div class="">
        <div class="banner home-banner">
          <div class="container">
            <div class="banner-text">
              <h3 class="title">Let’s take the burden off you. <br> Shop & get it delivered to your doorstep</h3>
              <p class="subtitle">Food, drinks, groceries, and more available for delivery and pickup.</p>

            </div>
          </div>
        </div>
        <div class="content container">

          <div class="product-group container bg-white my-5">
            <div class="row">
              <h5 class="col-sm-12 title text-left mt-3">Top Product</h5>
            </div>

            <carousel
              class="row  mt-4 pb-4 px-4"
              :interval="8000"
              :autoplay="true"
              :rewind='true'
              :paginationEnabled='false'
              :perPageCustom="[[320, 1],[375, 1],[425, 2],[768, 3], [1024, 4]]"
            >
              <slide
                v-for="(product, index) in products.top"
                v-bind:key="index"
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
              </slide>
            </carousel>
          </div>

          <div class="product-group container bg-white my-5">
            <div class="row">
              <h5 class="col-sm-12 title text-left mt-3">Beverages</h5>
            </div>

            <carousel
              class="row  mt-4 pb-4 px-4"
              :interval="8000"
              :autoplay="true"
              :rewind='true'
              :paginationEnabled='false'
              :perPageCustom="[[320, 1],[375, 1],[425, 2],[768, 3], [1024, 4]]"
            >
              <slide
                v-for="(product, index) in products.beverages"
                v-bind:key="index"
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
                      :id="'btnb'+index"
                      class="addtocart"
                      @click="addToCart(product, 'addb'+index ,'btnb'+index ,'b'+index)"
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
                      :id="'addb'+index"
                      class="addquantity hideqty"
                    >
                      <div
                        @click="decreaseQuantity('b'+index, product.id)"
                        class=" decrease"
                      >-</div>
                      <input
                        v-if="product.description.includes('/KG') || product.description.includes('/ KG')"
                        oninput="validity.valid||(value='');"
                        :id="'b'+index"
                        type="number"
                        min="0.001"
                        step="any"
                        class="number"
                        value=1.0
                        @keypress="restrictChars($event)"
                        @change="inputChange('b'+index, product.id)"
                      >

                      <input
                        v-else
                        :id="'b'+index"
                        type="number"
                        min="0"
                        step="1"
                        class="number"
                        value=1
                        @keypress="restrictChars($event)"
                        @change="inputChange('b'+index, product.id)"
                      />

                      <div
                        @click="increaseQuantity('b'+index, product.id)"
                        class=" increase"
                      >+</div>
                    </button>
                  </div>

                </div>
              </slide>
            </carousel>

          </div>
          <!-- sub banner -->
          <div class="sub-banner container my-3">
            <div class="banner-text">
              <h3 class="title">Find Products from the <br> Stores you already shop at</h3>

            </div>
          </div>

          <!-- sub banner end-->
          <div class="product-group container bg-white my-5">
            <div class="row">
              <h5 class="col-sm-12 title text-left mt-3">Water</h5>
            </div>

            <carousel
              class="row  mt-4 pb-4 px-4"
              :interval="8000"
              :autoplay="true"
              :rewind='true'
              :paginationEnabled='false'
              :perPageCustom="[[320, 1],[375, 1],[425, 2],[768, 3], [1024, 4]]"
            >
              <slide
                v-for="(product, index) in products.water"
                v-bind:key="index"
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
                      :id="'btnw'+index"
                      class="addtocart"
                      @click="addToCart(product, 'addw'+index ,'btnw'+index ,'w'+index)"
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
                      :id="'addw'+index"
                      class="addquantity hideqty"
                    >
                      <div
                        @click="decreaseQuantity('w'+index, product.id)"
                        class=" decrease"
                      >-</div>
                      <input
                        v-if="product.description.includes('/KG') || product.description.includes('/ KG')"
                        oninput="validity.valid||(value='');"
                        :id="'w'+index"
                        type="number"
                        min="0.001"
                        step="any"
                        class="number"
                        value=1.0
                        @keypress="restrictChars($event)"
                        @change="inputChange('w'+index, product.id)"
                      >

                      <input
                        v-else
                        :id="'w'+index"
                        type="number"
                        min="0"
                        step="1"
                        class="number"
                        value=1
                        @keypress="restrictChars($event)"
                        @change="inputChange('w'+index, product.id)"
                      />

                      <div
                        @click="increaseQuantity('w'+index, product.id)"
                        class=" increase"
                      >+</div>
                    </button>

                  </div>

                </div>
              </slide>
            </carousel>

          </div>
          <div class="product-group container bg-white my-5">
            <div class="row">
              <h5 class="col-sm-12 title text-left mt-3">Commodities</h5>
            </div>
            <carousel
              class="row  mt-4 pb-4 px-4"
              :interval="8000"
              :autoplay="true"
              :rewind='true'
              :paginationEnabled='false'
              :perPageCustom="[[320, 1],[375, 1],[425, 2],[768, 3], [1024, 4]]"
            >
              <slide
                v-for="(product, index) in products.commodities"
                v-bind:key="index"
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
                      :id="'btnc'+index"
                      class="addtocart"
                      @click="addToCart(product, 'addc'+index ,'btnc'+index ,'c'+index)"
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
                      :id="'addc'+index"
                      class="addquantity hideqty"
                    >
                      <div
                        @click="decreaseQuantity('c'+index, product.id)"
                        class=" decrease"
                      >-</div>
                      <input
                        v-if="product.description.includes('/KG') || product.description.includes('/ KG')"
                        oninput="validity.valid||(value='');"
                        :id="'c'+index"
                        type="number"
                        min="0.001"
                        step="any"
                        class="number"
                        value=1.0
                        @keypress="restrictChars($event)"
                        @change="inputChange('c'+index, product.id)"
                      >

                      <input
                        v-else
                        :id="'c'+index"
                        type="number"
                        min="0"
                        step="1"
                        class="number"
                        value=1
                        @keypress="restrictChars($event)"
                        @change="inputChange('c'+index, product.id)"
                      />

                      <div
                        @click="increaseQuantity('c'+index, product.id)"
                        class=" increase"
                      >+</div>
                    </button>
                  </div>

                </div>
              </slide>
            </carousel>

          </div>
        </div>
      </div>
      <storeSelector></storeSelector>

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
                type="button"
                class="close"
                @click.prevent='doSomethingOnHidden($event)'
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
    <Cart></Cart>
    <Footer></Footer>
  </div>
</template>


<script>
import StoreSelector from '@/components/StoreSelector.vue'
import Cart from '@/components/CartComponent.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Home',
  components: {
    StoreSelector, Cart, TopNav, Footer
  },
  data () {
    return {
      showSearch: false,
      products: {},
      pro: '',
      viewproduct: false,
      loader: ''
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true);
    this.loader = this.$loading.show();
  },
  mounted () {
    this.fetchProducts()
  },
  methods: {
    fetchProducts () {
      let req = {
        what: "products",
        showLoader: false,
        params: {
          storeid: this.$store.getters.store.id
        }
      }
      this.$request.makeGetRequest(req)
        .then(res => {
          if (res.type == 'products') {
            console.log(res)
            this.loader.hide()
            if (res.data.data.top.length > 0) {
              this.products = res.data.data;
            } else {
              this.$swal(
                "Empty store",
                `This store currently has no products. Please choose another store`,
                "error"
              );
            }
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
          document.getElementById(id).value = 1;
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

