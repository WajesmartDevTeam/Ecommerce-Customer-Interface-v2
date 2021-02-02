<template>
  <div>
    <Disclaimer />
    <TopNav></TopNav>
    <div class="home page">
      <div class="">
        <div class="banner home-banner" style="text-align: center !important; ">
          <!-- <div class="container">
            <div class="banner-text">
              <h3 class="title">Let’s take the burden off you. <br> Shop & get it delivered to your doorstep</h3>
              <p class="subtitle">Food, drinks, groceries, and more available for delivery and pickup.</p>

            </div>
          </div> -->
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
              <img
                :src="image_url+i.img_url"
                width="100%"
                alt=""
                class="router"
                @click="$router.push(i.url.toLowerCase() != '' ? i.url.toLowerCase() :  '/home')"
              >
            </slider-item>
          </slider>
          <slider
            class="d-block d-md-none"
            :duration="10000"
            height="150px"
            :speed="8000"
            :control-btn="false"
            :indicators="false"
          >
            <slider-item
              v-for="(i, index) in banners"
              :key="index"
              :style="i"
            >
              <img
                :src="image_url+i.img_url"
                alt=""
                width="100%"
                class="router"
                @click="$router.push(i.url.toLowerCase() != '' ? i.url.toLowerCase() :  '/home')"
              >
            </slider-item>
          </slider>
        </div>
        <div class="content container">

          <div class="product-group container bg-white my-5 ">
            <div class="row">
              <h5 class="col-sm-12 title text-left mt-3">Top Product</h5>
            </div>

            <carousel
              class="row  mt-4 pb-2  px-md-2 pb-sm-2 "
              :interval="10000"
              :speed="300"
              :scrollPerPage="false"
              :loop="true"
              :autoplay="true"
              :rewind='true'
              :paginationEnabled='false'
              :perPageCustom="[[320, 2],[375, 2],[425, 2],[768, 4], [1024, 6]]"
            >
              <slide
                v-for="(product, index) in products.top"
                v-bind:key="index"
                class="col-6 col-md-3 col-lg-2 p-1"
              >
                <Product :product="product"
                v-bind:key="product.sku"  @viewProduct="viewProduct($event)" :index="index" />
              </slide>
            </carousel>
          </div>

          <div class="product-group container bg-white my-5 ">
            <div class="row">
              <h5 class="col-sm-12 title text-left mt-3">Beverages</h5>
            </div>

            <carousel
              class="row  mt-4 pb-2  px-md-2 pb-sm-2 "
              :interval="10000"
              :speed="300"
              :scrollPerPage="false"
              :loop="true"
              :autoplay="true"
              :rewind='true'
              :paginationEnabled='false'
              :perPageCustom="[[320, 2],[375, 2],[425, 2],[768, 4], [1024, 6]]"
            >
              <slide
                v-for="(product, index) in products.beverages"
                v-bind:key="index"
                class="col-xs-6 col-sm-3 col-lg-2 p-1"
              >
                <Product :product="product"
                v-bind:key="product.sku"  @viewProduct="viewProduct($event)" :index="product.id" />
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
              class="row  mt-4 pb-2  px-md-2 pb-sm-2"
              :interval="10000"
              :speed="300"
              :scrollPerPage="false"
              :loop="true"
              :autoplay="true"
              :rewind='true'
              :paginationEnabled='false'
              :perPageCustom="[[320, 2],[375, 2],[425, 2],[768, 4], [1024, 6]]"
            >
              <slide
                v-for="(product, index) in products.water"
                v-bind:key="index"
                class="col-xs-6 col-sm-3 col-lg-2 p-1"
              >
                <Product :product="product"
                v-bind:key="product.sku"  @viewProduct="viewProduct($event)" :index="product.id" />
              </slide>
            </carousel>

          </div>
          <div class="product-group container bg-white my-5">
            <div class="row">
              <h5 class="col-sm-12 title text-left mt-3">Commodities</h5>
            </div>
            <carousel
              class="row  mt-4 pb-2  px-md-2 pb-sm-2"
              :interval="10000"
              :speed="300"
              :scrollPerPage="false"
              :loop="true"
              :autoplay="true"
              :rewind='true'
              :paginationEnabled='false'
              :perPageCustom="[[320, 2],[375, 2],[425, 2],[768, 4], [1024, 6]]"
            >
              <slide
                v-for="(product, index) in products.commodities"
                v-bind:key="index"
                class="col-xs-6 col-sm-3 col-lg-2 p-1"
              >
                <Product :product="product"
                v-bind:key="product.sku"  @viewProduct="viewProduct($event)" :index="product.id" />
              </slide>
            </carousel>

          </div>
        </div>
      </div>
      <storeSelector></storeSelector>
      <Questionnaire></Questionnaire>

     <!-- Product Modal -->
      <ProductModal :viewproduct="viewproduct" :pro="pro" :products="products"/>
    </div>
    <Cart :home_products="products"></Cart>

    <Footer></Footer>
  </div>
</template>
<style scoped>
.router:hover {
  cursor: pointer;
  width: 100% !important;
}
</style>

<script>
import StoreSelector from '@/components/StoreSelector.vue'
import Cart from '@/components/CartComponent.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import Disclaimer from '@/components/Disclaimer.vue'
import Questionnaire from "@/components/Questionnaire";
import Product from '@/components/Product.vue'
import ProductModal from '@/components/ProductModal.vue'
export default {
  name: 'Home',
  components: {
    StoreSelector, Cart, TopNav, Footer, Disclaimer, Questionnaire, Product, ProductModal
  },
  data () {
    return {
      image_url: this.$request.url,
      showSearch: false,
      products: {},
      pro: '',
      viewproduct: false,
      loader: '',
      categories: [],
      promotions: [],
      banners: [],
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true);
    this.loader = this.$loading.show();
  },
  created () {
    this.banners = this.$store.getters.banners;
    // this.banners = this.banners != [] ? this.banners.reverse() : this.banners;
  },
  mounted () {
    this.fetchProducts();
    this.fetchBanners();
          this.fetchCategories();
      this.fetchPromotions();

  },
  methods: {
    goToCategory(name) {
      switch (name) {
        case "Black Friday": 
          return "/black-friday";
          break;
        case "First Image":
          return "/category/sda";
          break;
        case "Second Image":
          return "/category/medicare";
          break;
        case "Third Image":
          return "/category/spirits";
          break;
        case "landing page":
          return "/category/fresh produce";
          break;
        case "banner_5":
          return "/category/groceries";
          break;
        default:
          return null;
      }
    },
    goTo (name) {
      let result = this.goToCategory(name);
      
      if(result != null) {
        this.$router.push(result);
      } else if(name.toLowerCase().includes('xmas')) {
        
        this.$router.push('/category/hampers');
      }
    },
    fetchBanners () {
      let req = {
        what: "banners",
        showLoader: false,
      }
      this.$request.makeGetRequest(req)
          .then(response => {

            if (response.type == 'banners') {
              this.banners = response.data.data
              this.$store.dispatch('banners', response.data.data)

            }
          })
          .catch(error => {

            console.log(error)
          });
    },
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
              this.categories = response.data.data
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
              this.categories = response.data.data
              this.$store.dispatch('promotions', response.data.data.filter((val) => val != null))

            }
          })
          .catch(error => {

            console.log(error)
          });
    },
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
            console.log(res.data.data)
            let cart = this.$store.getters.cart;
            this.loader.hide()
            if (res.data.data.top.length > 0) {
              res.data.data.top.forEach(i => {
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
              res.data.data.beverages.forEach(i => {
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
              res.data.data.water.forEach(i => {
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
              res.data.data.commodities.forEach(i => {
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
    viewProduct (product) {
      
      this.pro = product;
      this.viewproduct = true
    },
  }
}

</script>

