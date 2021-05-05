<template>
  <div>
    <Disclaimer />
    <TopNav></TopNav>
    <div class="home page">
      <div class="">
        <div class="banner home-banner" style="text-align: center !important; ">
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
          <div v-for="(promotion, promo) in productsList" class="product-group container bg-white my-3 " :key="promo">
            <div class="row header" >
              <h5 class="col-6 title text-left mt-3"><a :href="'/category/'+promo" style="color: white; " >{{promo.charAt(0).toUpperCase() + promo.slice(1)}}</a></h5>
              <h5 class="col-6 title view-more text-right mt-3"><a :href="'/category/'+promo" style="color: #ff0000;">View More ></a></h5>
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
                v-for="(product, index) in promotion"
                v-bind:key="index"
                class="col-6 col-md-3 col-lg-2 p-1"
              >
                <Product :product="product"
                v-bind:key="product.sku"  @viewProduct="viewProduct($event)" :index="index" />
              </slide>


            </carousel>
          </div>
        </div>
      </div>
      <storeSelector></storeSelector>

     <!-- Product Modal -->
      <ProductModal :viewproduct="viewproduct" :pro="pro" :products="products"/>
    </div>
    <Cart :products="products"></Cart>

    <Footer></Footer>
  </div>
</template>
<style scoped>
.router:hover {
  cursor: pointer;
  width: 100% !important;
}
.product-group .product{
  border: unset !important;
}

.view-more{
  margin: auto;
  text-decoration-line: underline; 
  font-size: 15px !important;
}

.header{
  background-color: #000066;
  /* border-radius: 25% 25% 0 0; */
  border-radius: 8px 8px 0 0;
}

/* .product-group{
  border-radius: 25% 25% 0 0;
} */

</style>

<script>
import StoreSelector from '@/components/StoreSelector.vue'
import Cart from '@/components/CartComponent.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import Disclaimer from '@/components/Disclaimer.vue'
import Product from '@/components/Product.vue'
import ProductModal from '@/components/ProductModal.vue'
export default {
  name: 'Promotions',
  components: {
    StoreSelector, Cart, TopNav, Footer, Disclaimer, Product, ProductModal
  },
  data () {
    return {
      image_url: this.$request.url,
      showSearch: false,
      products: [],
      pro: '',
      viewproduct: false,
      loader: '',
      categories: [],
      promotions: [],
      productsList: [],
      bannerList: [],
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true);
    this.loader = this.$loading.show();
  },
  created () {
    this.bannerList = this.$store.getters.banners;
    // this.banners = this.banners != [] ? this.banners.reverse() : this.banners;
  },
  mounted () {
    this.fetchProducts();
    this.fetchBanners();
      this.fetchPromotions();
      this.fetchCategories();


  },
  computed : {
    banners () {
      // console.log('category/valentine'.includes(this.promotions[1]))
      // console.

       return this.bannerList.filter(b => this.promotions.filter(p => {
        // console.log( b.url.substring(b.url.lastIndexOf('/')))
        return b.url.substring(b.url.lastIndexOf('/') + 1) == p
        }
          //  b.url.toLowerCase().includes(p)
       ).length > 0);
    }
  },
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = 'Promotions Page';
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
              this.categories = response.data.data
              this.$store.dispatch('categories', response.data.data)

            }
          })
          .catch(error => {

            console.log(error)
          });
    },
    fetchBanners () {
      let req = {
        what: "banners",
        showLoader: false,
      }
      this.$request.makeGetRequest(req)
          .then(response => {

            if (response.type == 'banners') {
              this.bannerList = response.data.data
              this.$store.dispatch('banners', response.data.data)

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
              this.promotions = response.data.data.filter((val) => val != null)
              this.$store.dispatch('promotions', this.promotions);

            }
          })
          .catch(error => {

            console.log(error)
          });
    },
    fetchProducts () {
      let req = {
        what: "getAllPromotions",
        showLoader: false,
        params: {
          storeid: this.$store.getters.store.id
        }
      }
      this.$request.makeGetRequest(req)
        .then(res => {
          if (res.type == 'getAllPromotions') {
            let cart = this.$store.getters.cart;
            this.loader.hide()
            if (Object.entries(res.data.data).length > 0) {
              this.productsList = res.data.data;
              this.products = Object.values(res.data.data)
                  .reduce((acc, crr) => {
                    acc.push(...crr);
                    return acc;
                  }, []);
              // console.log(this.products);
              let pro = this.products;
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
            } else {
              this.$swal(
                "Empty Promotions",
                `This store currently has no promotions. Please choose another store`,
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

