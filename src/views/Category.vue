<template>
  <div>
    <Disclaimer />
    <TopNav></TopNav>
    <div class="category page">
      <div class="banner home-banner" v-if="bannerCount > 0" style="text-align: center !important; ">
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
             <div v-else
         class="banner category-banner mt-5"
         v-bind:class='category.replace(/\s+/g, "")'
      
         >
       </div>
      <div class="container">


        <div class="content">

          <div class="product-group container bg-white my-5 py-2">

            <div  class="row mt-4 pb-2  px-md-2 pb-sm-2">

             <div :class="product.promotion.toLowerCase().includes('ramadan packs') ? 'col-6 col-md-3 col-lg-3 p-1 ':'col-6 col-md-3 col-lg-2 p-1 '" v-for="(product, index) in products" :key="index">
                <Product :product="product" 
                v-bind:key="product.sku"  @viewProduct="viewProduct($event)" :index="product.id" />
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
      <ProductModal :viewproduct="viewproduct" :pro="pro" :products="products"/>
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
import Product from '@/components/Product.vue'
import ProductModal from '@/components/ProductModal.vue'
export default {
  name: 'Category',
  components: {
    StoreSelector, Cart, TopNav, Footer, Disclaimer, Product, ProductModal
  },
  data () {
    return {    
      page_namer : decodeURIComponent(/[^/]*$/.exec(window.location.href)[0]).toUpperCase(),
      loader: '',
      showSearch: false,
      viewproduct: false,
      category: '',
      image_url: this.$request.url,
      page: 0,
      products: [],
      pro: '',
      bannerList: [],
      searchQuery: '',
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
    this.searchQuery = this.$route.params.searchQuery != undefined ? this.$route.params.searchQuery : null
    if(this.$store.getters.isStoreSet) {
      this.fetchProducts()
    } else {
      this.loader.hide();
    }
  },
  computed : {
    bannerCount () {
      return this.banners.length
    },
    banners () {
      return this.bannerList.filter(b => b.url.includes(this.category));
    }
  },
  created() {
    this.bannerList = this.$store.getters.banners;
    console.log(this.bannerList)
  },
  
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = this.page_namer;
        }
    },
  },

  methods: {
    fetchProducts ($state) {
      this.page += 1; ``
      let req = {
        what: "categories",
        showLoader: false,
        params: {
          storeid: this.$store.getters.store.id,
          category: this.category,
          search: this.searchQuery,
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
      
      this.pro = product;
      this.viewproduct = true
    },
  }
}

</script>

