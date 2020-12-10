<template>
  <div>
    <TopNav></TopNav>
    <div class="landingpage">
      <div class="">
        <div class="landing-header ">
      <slider
            class="d-none d-md-block"
            height="400px"
            :ease="0.5"
            :interval="8000"
            :speed="1000"
            :control-btn="false"
            :indicators="false"
          >
            <slider-item
              v-for="(i, index) in banners"
              :key="index"
              :style="i"
            >

              <div class="container-fluid"  :style="{'background-image': `url(`+ require('@/assets/img/banners/'+ i +'.jpg')+`)`, 'height': '400px',
            'background-position': 'center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'position': 'relative'}">
                
              </div>
            </slider-item>
          </slider>
          <slider
              class="d-block d-md-none"
              :duration="10000"
              height="100px"
              :speed="8000"
              :control-btn="false"
              :indicators="false"
          >
            <slider-item
                v-for="(i, index) in banners"
                :key="index"
                :style="i"
            >

              <div class="container-fluid"   :style="{'background-image': `url(`+ require('@/assets/img/banners/'+ i +'.jpg')+`)`, 'height': '100px',
            'background-position': 'center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'position': 'relative'}">
              </div>
            </slider-item>
          </slider>
        </div>
        <div class="content">
          <div
            id="categories"
            class="container my-5"
          >

            
            <div v-if='true' class=" row column">
              <div class="product offset-sm-1 col-sm-6 col-xs-12 p-md-2 p-sm-1 mb-4">
                  <div
                    class="product-image row"
                  >
                    <img
                      src="../assets/img/blackFriday/indomie.jpg"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div class="product-text row justify-content-center">
                    <div class="text-center product_name col-12">Standard Hamper</div>
                    <div class="text-center product_subname col-12"> Alchoholic </div>
                    <p class="  text-justify col-12 description" >Indomie Chicken 70gfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
                  </div>
                  <div class="row title-container justify-content-center"><div class="col-sm-4 title-space"><div class="title cost">N25, 000</div></div></div>
              </div>
            </div>

            <div v-else >
            <div 
                    v-for="(product, index) in products"
                    v-bind:key="product.sku"
                    class="product-layout product-grid item  col-md-6 col-sm-6 col-xs-12"
                  >
                    <input
                      type="hidden"
                      v-model="product.product_id"
                    />
                    <div class="product-thumb col-item">
                      <div class="item-inner">
                        <div class="item-img">
                          <div class="item-img-info">
                            <a
                              class="product-image"
                              :href="'/category/'+product.category+'/'+product.name"
                              :title="product.name"
                            >
                              <ImageItem
                                mclass="img-container"
                                :source="product.img_url"
                                :alt="product.name"
                                :title="product.name"
                              />
                            </a>
                          </div>
                        </div>
                        <div class="item-info">
                          <div class="info-inner">
                            <div class="item-title">
                              <a
                                :title="product.name"
                                :href="'/category/'+product.category+'/'+product.name"
                              >{{ product.name }}
                                <span v-if="product.description.includes('/KG') || product.description.includes('/ KG')">(Per Kg)</span></a>
                            </div>

                            <div class="item-content">
                              <div class="desc std">
                                <p>{{ product.description }}</p>
                              </div>

                              <div class="item-price">
                                <div class="price-box">
                                  <p class="regular-price">
                                    <span v-if="product.promo">
                                      <span class="price cancel naira">{{ formatPrice(product.sellingprice) }}</span>
                                      <span class="price newprice naira">{{ formatPrice(Math.round((product.promo.value_percent/100)*product.sellingprice)) }}</span>
                                    </span>
                                    <span
                                      v-else
                                      class="price naira"
                                    >{{ formatPrice(product.sellingprice) }}</span>
                                  </p>
                                </div>
                              </div>

                              <div
                                :id="'addtp'+index"
                                class="addquantity hideqty addqt"
                              >
                                <div
                                  @click="decreaseQuantity('tp'+index, product.id)"
                                  class="value-button decrease"
                                  value="Decrease Value"
                                >-</div>
                                <div class="value-button input-wrapper">
                                  <input
                                    v-if="product.description.includes('/KG') || product.description.includes('/ KG')"
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
                                    class="number"
                                    value=1
                                    @keypress="restrictChars($event)"
                                    @change="inputChange('tp'+index, product.id)"
                                  />
                                </div>
                                <div
                                  class="value-button increase"
                                  value="Increase Value"
                                  @click="increaseQuantity('tp'+index, product.id)"
                                >+</div>
                              </div>
                              <div
                                class="action"
                                :id="'btntp'+index"
                              >
                                <button
                                  style=" margin: 10px auto;"
                                  type="button"
                                  title
                                  data-original-title="Add to Cart"
                                  class="button btn-cart link-cart"
                                  @click="addToCart(product, 'addtp'+index ,'btntp'+index ,'tp'+index)"
                                >
                                  <span>
                                    Add to
                                    Cart
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- End Item info -->
                      </div>
                      <!-- End  Item inner-->
                    </div>
                  </div>
            </div>

            <div class="row column mt-5 text-center no-gutters">
              <div class=" offset-sm-5 col-sm-4 mb-3 download mr-auto btn discount" style="color: white; font-weight:0">
                <a :href="url+'/MSQ%20Black%20Friday%202020.pdf'" style="color: white" download>
                Download discounted product flyer
                </a>
              </div>
              <div v-if='$store.getters.isStoreSet==false' class="discount col-sm-2 mb-3 promo get-started btn" data-toggle="modal"
                data-target="#store" @click="setCategoryRoute('/home')">
                Shop Now
              </div>
              <div v-else class="col-sm-2 promo mb-3 discount get-started btn" @click="$router.push('home')">
                Shop Now
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cart v-if='$store.getters.isStoreSet!=false' :products="products" />
      <storeSelector ref="store"></storeSelector>
    </div>
    <Footer></Footer>
  </div>

</template>

<style scoped>
  .get-started:hover{
    cursor : pointer;
  }
  .margin {
    margin-top: 150px;
  }
  .title-space:hover{ 
    cursor : pointer;
  }
  .title-space{
    background: #ff0000;
    padding-right: 0;
    color: white;
    margin: 0;
  }
  .download{
    background: #000066;
    color: #fff;
  }

  .title{
    background: #000066;
    color: white !important;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-bottom: 0;
    font-family: harabara;
    font-weight: normal !important;

  }
  .description {
    word-wrap: break-word !important; 
    font-size: 2vh;
  }
  .promo{
    color: #fff;
    background: #ff0000;
  }
  .promo .row .col-11{
    font-size: 2.5vh;
    padding-right: 0;
  }
  .cost{
    font-size: 2.5vh;
    padding-right: 0;
  }
  .product_name {
    font-size: 3vh;
    color: #000066;
    font-weight: bold;
  }
  .product_subname {
    font-size: 2.5vh;
    color: #ff0000;
  }
  .product-image{
    text-align: center;
    border-radius: 5%;
  }
  .img-fluid{
    margin: auto;
    display: block;
  }
  @media screen and (max-width:1024px) and (min-width:580px) {
    .promo .row .col-11{
    font-size: 1.5vw;
    padding-right: 0;
  }
  .description {
    word-wrap: break-word !important; 
    font-size: 1.5vh;
  }
  .cost{
    font-size: 1.5vw;
    padding-right: 0;
  }
  }
</style>

<script>
import StoreSelector from '@/components/StoreSelector.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import Cart from '@/components/CartComponent.vue'
import Disclaimer from '@/components/Disclaimer.vue'

export default {
  name: 'BlackFriday',
  components: {
    StoreSelector, TopNav, Footer, Cart, Disclaimer
  },
  data () {
    return {
      loader: '',
      url: window.location.origin,
      products: [],
      page: 1,
      // MSQNowOpenHomePage
      banners: ['Homepage']
    }
  },
  
  beforeMount () {
    // this.$store.dispatch("setBlackFriday", true);
    this.$store.dispatch('ToggleShowSearch', false);
    this.loader = this.$loading.show();
  },
  mounted () {
    setTimeout(() => {
      this.loader.hide()
    }, 500);
  },

  created () {
    this.fetchBanners();
    // this.banners = this.$store.getters.banners
  },

  mounted () {
    this.fetchProducts();
  },
  
  methods: {
    fetchProducts ($state) {
      this.page += 1; ``
      let req = {
        what: "categories",
        showLoader: false,
        params: {
          storeid: 1,
          category: 'HAMPERS',
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
    setCategoryRoute (route) {
      this.$store.dispatch('setCategoryRoute', route);
    },
    fetchBanners () {
      let req = {
        what: "banners",
        showLoader: false,
      }
      this.$request.makeGetRequest(req)
        .then(response => {

          if (response.type == 'banners') {
            this.$store.dispatch('banners', response.data.data)
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  }
}

</script>
