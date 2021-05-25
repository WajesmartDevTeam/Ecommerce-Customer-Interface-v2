<template>
    <div id="header">
    
      <FreeDelivery />

      <div id="topnav"  class="">
        <div class=" container">
          <div class="d-flex justify-content-between">

            <ul class="row float-left">
              <li class="navlink  d-sm-block d-md-none">
                <a
                  id="openbtn"
                  href=""
                  class=""
                  @click.prevent="openNav()"
                >☰</a>
              </li>
              <li
                v-if="$store.getters.isLoggedIn"
                id="user"
                class="menu-link dropdown d-sm-block d-md-none"
                style="position: relative;left: 36%;"
              >
                <a
                  id="username"
                  href=""
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <span class="text-uppercase">{{user.fullname}}</span>
                  <span id="userpoint">0 points</span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a href="/account">
                      <span class="material-icons mr-2 ml-1">
                        person
                      </span>
                      <span class="text ml-4">My Account</span>
                    </a>
                  </li>
                  <li>
                    <a href="/wallet">
                      <span class="material-icons mr-2 ml-1">
                        person
                      </span>
                      <span class="text ml-4">My Wallet</span>
                    </a>
                  </li>
                  <li class="divider"></li>
                  <li>
                    <a href="/orders">
                      <span class="material-icons mr-2 ml-1">
                        shopping_basket
                      </span>
                      <span class="text ml-4">My Orders</span>
                    </a>
                  </li>
                  <li class="divider"></li>
                  <li @click.prevent='logOut()'>
                    <a
                      href=""
                      class="text-danger"
                    >
                      <span class="material-icons mr-2 ml-1">
                        exit_to_app
                      </span><span class="text ml-4">Logout</span></a>
                  </li>
                  <li class="divider"></li>

                </ul>
              </li>
              <li class=" navlink text-capitalize mt-md-0 mt-3">
                <!-- store not selected -->
                <a
                  v-if='$store.getters.isStoreSet==false'
                  href=""
                  data-toggle="modal"
                  data-target="#store"
                >
                  <img
                    src="../assets/img/store-icon-sm.png"
                    alt=""
                  >
                  Select Store

                </a>
                <!-- store selected -->
                <a
                  v-else
                  href=""
                  data-toggle="modal"
                  data-target="#store"
                >
                  <img
                    src="../assets/img/store-icon-sm.png"
                    alt=""
                    class="mr-1"
                  >
                  <span v-if="this.$store.getters.store.mode =='Delivery'">Delivering to <b>{{this.$store.getters.area}}</b> from <b>{{this.$store.getters.store.name}}</b> Store</span>
                  <span v-else>Pickup from <b>{{this.$store.getters.store.name}}</b> Store</span>

                  <a
                    v-if="$route.name !==('Checkout') && $route.name !==('StoreLocator')"
                    href=""
                    class="badge badge-pill badge-light ml-1"
                    data-toggle="modal"
                    data-target="#store"
                  >Change</a>
                </a>
              </li>

            </ul>
            <ul class="d-md-flex d-none ">
              <li class=" navlink"><a href="/storelocator">
                  <span class="material-icons mr-md-2">
                    location_on
                  </span>

                  Store Locator </a></li>
              <!-- <li class=" navlink"><a href="/giftcard">
                  <img
                    src="../assets/img/giftcard-icon.png"
                    alt=""
                  >
                  Gift cards </a></li> -->
              <li class=" navlink">
                <a href="/contact"> Contact Us </a>
              </li>

            </ul>
            <ul
              v-if="$store.getters.isLoggedIn ==false"
              class="d-md-flex d-none "
            >
              <li class=" navlink ">
                <a href="/login"> Sign in </a>
              </li>
              <li class=" navlink mr-0"><a
                  id="register"
                  href="/register"
                > Register </a>
              </li>
            </ul>
            <ul
              class="d-md-flex d-none "
              v-else
              id="user"
            >
              <li class="menu-link dropdown ">
                <a
                  id="username"
                  href=""
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <span class="text-uppercase">{{user.fullname}}</span>
                  <span id="userpoint">0 points</span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a href="/account">
                      <span class="material-icons mr-2 ml-1">
                        person
                      </span>
                      <span class="text ml-4">My Account</span>
                    </a>
                  </li>
                  <li>
                    <a href="/wallet">
                      <span class="material-icons mr-2 ml-1">
                        person
                      </span>
                      <span class="text ml-4">My Wallet</span>
                    </a>
                  </li>
                  <li class="divider"></li>
                  <li>
                    <a href="/orders">
                      <span class="material-icons mr-2 ml-1">
                        shopping_basket
                      </span>
                      <span class="text ml-4">My Orders</span>
                    </a>
                  </li>
                  <li class="divider"></li>
                  <li @click.prevent='logOut()'>
                    <a
                      href=""
                      class="text-danger"
                    >
                      <span class="material-icons mr-2 ml-1">
                        exit_to_app
                      </span><span class="text ml-4">Logout</span></a>
                  </li>
                  <li class="divider"></li>

                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="middlenav">
        <div class="container d-flex justify-content-between">
          <div id="logo">
            <a href="/home">
              <img
                class="d-none d-lg-block"
                src="../assets/img/logo-m.png"
                alt="Marketsquare Logo"
              > <img
                class=" d-md-block d-lg-none"
                src="../assets/img/logo_mobile.png"
                alt="Marketsquare Logo"
              >
            </a>
          </div>
          <div
            v-if="$store.getters.showSearch==true"
            id="search"
            class="d-none d-md-block"
          >
            <Search/>

            <!-- </Search> -->
            <!-- <input
              @keyup.enter="search()"
              type="text"
              v-model="searchQuery"
              placeholder="Search your products from here"
            >
            <i
              @click="search()"
              style="cursor:pointer"
              class="material-icons"
            >search</i> -->
          </div>
          <!-- <div
            v-if="$store.getters.isLoggedIn"
            id="cart-icon"
            class="d-flex dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div id="cart-circle">
              <span class="material-icons">
                local_mall
              </span>
              <span id="cart-count">{{cart.length}}</span>

            </div>
            <span
              id="cart-price"
              class="ml-2"
            >₦{{formatPrice(cart_total)}}</span>
          </div> -->
          <div class="dropdown-menu cart-dropdown">
            <div v-for="row in cart" class="dropdown-item">
              <div class="row">
                <div class="col-3 icon">
                  <img
                    src="../assets/img/store-icon.png"
                    alt=""
                  >
                </div>
                <div class="col-9">
                  <h5 class="storename">{{getStore(row.storeid)}}</h5>
                  <p class="cart-info">{{row.quantity}} item(s) in Cart</p>
                  <p class="price">₦{{formatPrice(row.total_price)}}</p>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <button
                  data-backdrop="false"
                  @click.prevent='store=row;closeModal()'
                  data-toggle='modal'
                  data-target="#fulfillmentmode"
                  id="placeorder-btn"
                >Place Order</button>
                <!-- <button id="view-btn">View Store</button> -->
              </div>

            </div>
            <div class="dropdown-divider"></div>

          </div>
        </div>
      </div>
      <div

        v-if="$route.name !== 'LandingPage'"
        id="menu-bar"
        class="d-none  d-md-block"
      >
        <div class="container">
          <ul
            id="menu"
            class="d-flex justify-content-between"
          >
          <!-- <li class="menu-link"><a href="/valentine/story">Valentine Story</a></li> -->
            <li class="menu-link dropdown">
              <a
                v-if="promotions.length > 0"
                href=""
                class="dropdown-toggle"
                data-toggle="dropdown"
              >Specials</a>
              <ul class="dropdown-menu">
                <li class="divider"><a href="/promotions/Specials"> All </a></li>
                <li v-for="(promo, index) in promotions" :key="index" ><a :href="'/category/'+promo">{{promo.charAt(0).toUpperCase() + promo.slice(1) }}</a></li>
                <li class="divider"></li>
              </ul>
            </li>

            <li v-if="showCategory('bakery')" class="menu-link"><a href="/category/combos"> Combos</a></li>

            <li v-if="showCategory('bakery')" class="menu-link"><a href="/category/bakery"> Bakery</a></li>


            <li class="menu-link dropdown" v-if="showCategory('groceries') || showCategory('confectioneries') || showCategory('beverages') || showCategory('breakfast cereal')">
              <a
                href=""
                class="dropdown-toggle"
                data-toggle="dropdown"
              >Groceries</a>
              <ul class="dropdown-menu">
                <li v-if="showCategory('groceries')" ><a href="/category/groceries" >Groceries</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('confectioneries')"><a href="/category/confectioneries" >Confectioneries</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('beverages')" ><a href="/category/beverages">Beverages</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('breakfast cereal')"><a href="/category/breakfast cereal" >Breakfast Cereal</a></li>

              </ul>
            </li>

            <li class="menu-link dropdown" v-if="showCategory('fresh produce') || showCategory('commodities') || showCategory('perishables') || showCategory('butchery')">
              <a
                href="/category/food"
                class="dropdown-toggle"
                data-toggle="dropdown"
              >Food</a>
              <ul class="dropdown-menu">
                <li v-if="showCategory('fresh produce')"><a href="/category/fresh produce">Fresh Produce</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('commodities')"><a href="/category/commodities">Commodities</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('perishables')"><a href="/category/perishables">Perishables</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('butchery')"><a href="/category/butchery" >Butchery</a></li>
              </ul>
            </li>
            <li class="menu-link dropdown" v-if="showCategory('spirits') || showCategory('water')">
              <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
              >Drinks</a>
              <ul class="dropdown-menu">
                <li v-if="showCategory('spirits')"><a href="/category/spirits">Spirits</a></li>
                <li class="divider"></li> 
                <li v-if="showCategory('water')"><a href="/category/water">Water</a></li>
              </ul>
            </li>
            <li class="menu-link dropdown" v-if="showCategory('medicare') || showCategory('toiletries')">
              <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
              >Health & Beauty</a>
              <ul class="dropdown-menu">
                <li v-if="showCategory('medicare')"><a href="/category/medicare" >Medicare</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('toiletries')"><a href="/category/toiletries" >Toiletries</a></li>
                <li class="divider"></li>

              </ul>
            </li>
            <li class="menu-link dropdown" v-if="showCategory('household') || showCategory('accessories') ||  showCategory('sda')">
              <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
              >Appliances & Accessories</a>
              <ul class="dropdown-menu">
                <li v-if="showCategory('household')"><a href="/category/household" >Household Items</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('accessories')"><a href="/category/accessories" >Accessories</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('sda')"><a href="/category/sda" >SmallDomestiic Appliances</a></li>
              </ul>
            </li>
            <li class="menu-link dropdown" v-if="showCategory('automobile') || showCategory('baby products') || showCategory('pet products') || showCategory('bms') || showCategory('general')">
              <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
              >Others</a>
              <ul class="dropdown-menu">
                <li v-if="showCategory('automobile')"><a href="/category/automobile" >Automobile</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('baby products')"><a href="/category/baby products" >Baby Products</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('pet products')"><a href="/category/pet products" >Pet Products</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('bms')"><a href="/category/bms" >BMS</a></li>
                <li class="divider"></li>
                <li v-if="showCategory('general')"><a href="/category/general" >General</a></li>
              </ul>
            </li>
            
          </ul>
        </div>
      </div>

      <!-- mobile -->

      <!-- <button
              class="openbtn d-sm-block d-md-none"
              @click="openNav()"
            >☰</button> -->

      <div
        id="mySidepanel"
        class="sidepanel d-sm-block d-md-none"
      >
        <a
          href="javascript:void(0)"
          class="closebtn"
          @click.prevent="closeNav()"
        >×</a>
        <a
          href="/home"
          class="sidemenu"
        >Home</a>
  <!--      <a-->
  <!--        v-if="hamper_status == 1"-->
  <!--        href="/category/hampers"-->
  <!--        class="sidemenu"-->
  <!--      >Hampers </a>-->
        <!-- <a href="/valentine/story" class="sidemenu">Valentine Story</a> -->
        <a
          @click.prevent='toggleDropdown'
          class="dropdown-btn sidemenu">
          Specials
        </a>
          <div class="dropdown-container">
            <a href="/promotions/Specials" class="sidemenu"> All </a>
            <a v-for="(promo, index) in promotions" :key="index"  :href="'/category/'+promo" class="sidemenu">{{promo.charAt(0).toUpperCase() + promo.slice(1) }}</a>
          </div>


        <a
          href="/category/combos"
          class="sidemenu"
        >Combos </a>
        
        <a
          href="/category/bakery"
          class="sidemenu"
        >Bakery </a>

        <a v-if="showCategory('groceries') || showCategory('confectioneries') || showCategory('beverages') || showCategory('breakfast cereal')"
          href="/category/groceries"
          @click.prevent='toggleDropdown'
          class="dropdown-btn sidemenu"
        >Groceries </a>
        <div class="dropdown-container">
          <a href="/category/groceries" v-if="showCategory('groceries')">Groceries</a>
          <a href="/category/confectioneries" v-if="showCategory('confectioneries')">Confectioneries</a>
          <a href="/category/beverages" v-if="showCategory('beverages')">Beverages</a>
          <a href="/category/breakfast cereals" v-if="showCategory('breakfast cereals')">Breakfast Cereal</a>

        </div>
        <a v-if="showCategory('fresh produce') || showCategory('commodities') || showCategory('perishables') || showCategory('butchery')"
          href="#"
          @click.prevent='toggleDropdown'
          class="dropdown-btn sidemenu"
        >Food</a>
        <div class="dropdown-container">
          <a href="/category/fresh produce" v-if="showCategory('fresh produce')"> Fresh Produce</a>
          <a href="/category/commodities" v-if="showCategory('commodities')">Commodities</a>
          <a href="/category/perishables" v-if="showCategory('perishables')">Perishables</a>
          <a href="/category/butchery" v-if="showCategory('butchery')">Butchery</a>
          <a href="/category/condiments" v-if="showCategory('condiments')">Condiments</a>

        </div>
        <a
          v-if="showCategory('spirits') || showCategory('water')"
          href="#"
          @click.prevent='toggleDropdown'
          class="dropdown-btn sidemenu"
        >Drinks</a>
        <div class="dropdown-container">
          <a href="/category/spirits" v-if="showCategory('spirits')">Spirits</a>
          <a href="/category/water" v-if="showCategory('water')">Water</a>

        </div>
        <a
          v-if="showCategory('medicare') || showCategory('toiletries')"
          href="#"
          @click.prevent='toggleDropdown'
          class="dropdown-btn sidemenu"
        >Health & Beauty </a>
        <div class="dropdown-container">
          <a href="/category/medicare" v-if="showCategory('medicare')">Medicare</a>
          <a href="/category/toiletries" v-if="showCategory('toiletries')">Toiletries</a>

        </div>
        <a
          v-if="showCategory('household') || showCategory('accessories') ||  showCategory('sda')"
          href="#"
          @click.prevent='toggleDropdown'
          class="dropdown-btn sidemenu"
        >Appliances & Accessories </a>
        <div class="dropdown-container">
          <a href="/category/household" v-if="showCategory('household')">Household Items</a>
          <a href="/category/accessories" v-if="showCategory('accessories')">Accessories</a>
          <a href="/category/sda" v-if="showCategory('sda')">Small Doestic Appliances</a>

        </div>
        <a
          v-if="showCategory('automobile') || showCategory('baby products') || showCategory('pet products') || showCategory('bms') || showCategory('general')"
          href="#"
          @click.prevent='toggleDropdown'
          class="dropdown-btn sidemenu"
        >Others </a>
        <div class="dropdown-container">
          <a href="/category/automobile" v-if="showCategory('automobile')">Automobile</a>
          <a href="/category/baby products" v-if="showCategory('baby products')">Baby Products</a>
          <a href="/category/pet products" v-if="showCategory('pet products')">Pet Products</a>
          <a href="/category/bms" v-if="showCategory('bms')">BMS</a>
          <a href="/category/general" v-if="showCategory('general')">General</a>

        </div>
        
        <a
          href="/storelocator"
          class="sidemenu"
        >Store Locator </a>
        <!-- <a
          href="/giftcard"
          class="sidemenu"
        >Gift Card</a> -->
        <a
          href="/contact"
          class="sidemenu"
        >Contact Us</a>
        <a
          v-if="!$store.getters.isLoggedIn"
          href="/login"
          class="sidemenu"
        >Sign in </a>
        <a
          v-if="!$store.getters.isLoggedIn"
          href="/Register"
          class="register sidemenu"
        ><button>Register</button></a>
      </div>
      <div class="mobile d-sm-block d-md-none">
        <div
          v-if="$store.getters.showSearch==true"
          id="search"
          class=""
    >
    

<Search :searchQuery="$route.params.search != undefined ? $route.params.search : ''"/>


          <!-- </Search> -->
          <!-- <input
            @keyup.enter="search()"
            type="text"
            v-model="searchQuery"
            placeholder="Search your products from here"
          >
          <i
            @click="search()"
            style="cursor:pointer"
            class="material-icons"
          >search</i> -->
        </div>
      </div>
      <!-- mobile end -->

      <!-- Product Modal -->
      <div
        class="modal fade"
        data-backdrop="false"
        id="fulfillmentmode"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5>Fulfillment Mode</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="placeOrder()">

                <v-select
                  required
                  :options="['Pickup', 'Delivery']"
                  v-model="method"
                  placeholder="Select fulfillment mode"
                  class="form-group"
                >
                </v-select>
                <v-select
                  v-if="method== 'Delivery'"
                  required
                  :options="areas"
                  v-model="area"
                  placeholder="Select Delivery Area"
                  class="form-group"
                >
                  <template #no-options="{ searching, loading }">
                    Please wait...
                  </template>
                  <span slot="no-options">Sorry, no matching options</span>
                </v-select>

                <button class="btn mx-auto text-center">Submit</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import * as $ from "jquery";
import Search from "@/components/Search.vue";
import FreeDelivery from '@/components/FreeDelivery.vue'
export default {
  name: 'TopNav',
  props: {
    msg: String
  },
  components: {Search, FreeDelivery},
  data () {
    return {
      searchQuery: '',
      hamper_status: 0,
      cats : {
        food : ['commodities', 'perishable', 'butchery', 'fresh produce', 'condiments'],
        appliances_acessories : ['sda', 'accessories', 'household'],
        drinks : ['water', 'spirits'],
        health_beauty : ['medicare', 'toiletries'],
        others : ['pet products', 'baby products', 'automobile', 'bms', 'general'],
        groceries : ['beverage', 'confectioneries', 'breakfast cereal', 'groceries']
      },
      
      user: {},
      cart: [],
      store: {},
      method: '',
      areas: [],
      area: '',
      promotion: [],
      category: [],
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    if (this.$route.name == 'Search') {
      this.searchQuery = this.$route.params.search
    }
    this.user = this.$store.getters.user;
    if (this.$store.getters.storesCart.length > 0) {
      this.cart = this.$store.getters.storesCart;
      // console.log(this.cart)
    }
    // this.getHamperStatus();
    // if(this.$store.getters.isStoreSet !=false) {
    //   this.fetchCategories();
    //   this.fetchPromotions();
    // }
  },
  watch: {
    method (val) {
      if (val == 'Delivery') {

        let req = {
          what: "areas",
          showLoader: false
        }
        this.$request.makeGetRequest(req)
          .then(response => {
            if (response.type == 'areas') {
              let zones = response.data.data
              let vm = this;
              zones.forEach(i => {
                i.areas.forEach(j => {
                  j.store.forEach(k => {
                    if (k == vm.store.storeid) {
                      vm.areas.push(j.area)
                    }
                  })
                })
              })
            }
          })
          .catch(error => {

            console.log(error)
          });


      }
    }

  },
  computed: {
    cart_total () {
      let total = 0;
      this.cart.forEach(i => {
        total += Number(i.total_price);
      })
      return total
    },
    categories () {
      if(this.$store.getters.categories != [] ) {
        return this.$store.getters.categories;
      } else if(this.category != []) {
        return this.category;
      } else {
        this.fetchCategories();
      }
    },
    promotions() {
      if(this.$store.getters.promotions != [] ) {
        return this.$store.getters.promotions.filter((val) => val != null  && val != "null" && val != "NULL");
      } else if(this.promotion != []) {
        return this.promotion.filter((val) => val != null  && val != "null" && val != "NULL");
      } else {
        this.fetchPromotions();
      }
    },
  },
  methods: {
    fetchCategories () {
      let req = {
        what: "getCategories",
        showLoader: false,
        params: {
          store_id: this.$store.getters.store.id
        }
      }
      this.$request.makeGetRequest(req)
          .then(response => {

            if (response.type == 'getCategories') {
              this.category = response.data.data
              this.$store.dispatch('categories', response.data.data)

            }
          })
          .catch(error => {

            console.log(error)
          });
    },
    fetchPromotions () {
      let req = {
        what: "getPromotions",
        showLoader: false,
        params: {
          store_id: this.$store.getters.store.id
        }
      }
      this.$request.makeGetRequest(req)
          .then(response => {

            if (response.type == 'getPromotions') {
              this.promotion = response.data.data.filter((val) => val != null  && val != "Null" && val != "NULL")
              this.$store.dispatch('promotions', this.promotion);
            }
          })
          .catch(error => {

            console.log(error)
          });
    },
    showCategory(name){
      return this.categories.includes(name);
    },
    getSubCategories(name) {
      return this.$store.getters.categories.filter( (val) => this.cats[name].includes(val))
    },
     setCategoryRoute (route) {
      this.$store.dispatch('setCategoryRoute', route);
    },
    getHamperStatus() {
      let req = {
          what: "hamperStatus",
          showLoader: false
        }
        this.$request.makeGetRequest(req)
          .then(response => {
            if (response.type == 'hamperStatus') {
              this.hamper_status = response.data;
              // this.$store.dispatch('hamper_status', response.data.data);
            }
          })
          .catch(error => {

            console.log(error)
          });

    },
    openNav () {
      document.getElementById("mySidepanel").style.width = "80%";
    },
    closeNav () {
      document.getElementById("mySidepanel").style.width = "0";
    },
    toggleDropdown (e) {
      document.querySelectorAll('.dropdown-btn').forEach(el => {

        if ((el.nextElementSibling.style.display === "block") && (el != e.target)) {
          el.classList.remove('active');
          el.nextElementSibling.style.display = "none";
        }
      })
      e.target.classList.toggle("active");
      var dropdownContent = e.target.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    },
    search () {
      if (this.$route.name !== 'Search') {
        this.$router.push(`/search/${this.searchQuery}`)
      }
      else {
        this.$router.push({ name: 'Search', params: { search: this.searchQuery } })
        // this.$parent.fetchProducts()
        this.$router.go();
      }


    },
    logOut () {
      this.$store.dispatch('setLoggedIn', false)
      this.$store.dispatch('user', {})
      this.$router.push('home');
    },
    placeOrder () {
      console.log(this.store);
      let cart_array = [];
      this.store.cartitem.forEach(i => {
        let x = {
          quantity: i.quantity,
          unit_price: i.unit_price,
          price: i.price,
          product: {
            id: i.product_id,
            name: i.name,
            img_url: i.img_url,
            price: i.sellingprice
          }
        }
        cart_array.push(x)
      })
      if (this.method == 'Delivery') {
        this.$store.dispatch("area", this.area);
      }
      let store;
      let allstores = this.$store.getters.allstores;
      allstores.forEach(i => {
        if (i.id == this.store.storeid) {
          store = i;
        }
      })
      store.mode = this.method;

      this.$store.dispatch("setStoreStatus", true);
      this.$store.dispatch("setStore", store).then(res => {
        this.$store.dispatch('addToCart', cart_array)
        $(".modal").modal("hide")
        this.$router.push({ name: 'Cart' })
      })

    },
    closeModal () {
      $(".modal").modal("hide")
    },
    getStore (id) {
      let stores = this.$store.getters.allstores;
      let name;
      stores.forEach(i => {
        if (i.id == id) {
          name = i.name;
        }
      })
      return name;
    },
    formatPrice (price) {
      var str = price.toString().split(".");
      if (str[0].length >= 3) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      }
      if (!str[1]) {
        str[1] = "00";
      }
      return str[0];
    },
  }
}
</script>


<style scoped>
#user li,
li#user {
  list-style: none;
  position: relative;
}
#user .dropdown-menu li a,
li#user .dropdown-menu li a {
  color: #000066;
  font-size: 12px;
  font-weight: bold;
  position: relative;
}
#user .dropdown-menu li:hover,
#user .dropdown-menu li:hover a,
li#user .dropdown-menu li:hover,
li#user .dropdown-menu li:hover a {
  background: #000066;
  color: #fff;
}
#user .dropdown-menu li a .material-icons,
li#user .dropdown-menu li a .material-icons {
  font-size: 15px;
  position: absolute;
  top: -2px;
}
#username {
  margin: 0;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
}
#userpoint {
  margin: 0;
  font-size: 11px;
  color: #ff0000;
  font-weight: bold;
  position: absolute;
  bottom: -11px;
  /* right: 5%; */
  left: 0;
}
.mobile {
  background: #f7f7f7;
  padding: 10px 0;
}

</style>
