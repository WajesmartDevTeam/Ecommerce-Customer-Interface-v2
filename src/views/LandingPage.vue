<template>
  <div>
    <TopNav></TopNav>
    <div class="landingpage">
      <div class="">
        <div class="landing-header get-started"
             >
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

              <div v-if="i.url.toLowerCase() != '/home' && i.url.toLowerCase() != '' && i.url.toLowerCase() != null" class="container-fluid get-started"  :style="{'background-image': `url('` + url + i.img_url+`')`, 'height': '400px',
            'background-position': 'center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'position': 'relative'}" data-toggle="modal"
                   data-target="#store" @click="setCategoryRoute(i.url.toLowerCase())">
              </div>
              <div v-else class="container-fluid get-started"  :style="{'background-image': `url('` + url + i.img_url+`')`, 'height': '400px',
            'background-position': 'center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'position': 'relative'}"  data-toggle="modal"
                   data-target="#store" @click="setCategoryRoute('/home')">
                <div class="banner-text">
                  <!-- <h3 class="title">Let’s take the burden off you. <br> Shop & get it delivered to your doorstep</h3> -->
                  <!-- <p class="subtitle">Drinks, groceries, and more are available for delivery and pickup.</p> -->
                  <button
                      data-toggle="modal"
                      data-target="#store"
                      class="start-button margin"
                  >Get Started
                    <i class="fa fa-long-arrow-right ml-2"></i></button>
                </div>
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

              <div v-if="i.url.toLowerCase() != '/home' && i.url.toLowerCase() != '' && i.url.toLowerCase() != null" class="container-fluid get-started"  :style="{'background-image': 'url(' + url + i.img_url +')', 'height': '100px',
            'background-position': 'center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'position': 'relative'}" data-toggle="modal"
                   data-target="#store" @click="setCategoryRoute(i.url.toLowerCase())">
              </div>
              <div v-else class="container-fluid get-started"  :style="{'background-image': 'url(' + url + i.img_url +')', 'height': '100px',
            'background-position': 'center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'position': 'relative'}"  data-toggle="modal"
                   data-target="#store" @click="setCategoryRoute('/home')">
                <div class="banner-text">
                  <!-- <h3 class="title">Let’s take the burden off you. <br> Shop & get it delivered to your doorstep</h3> -->
                  <!-- <p class="subtitle">Drinks, groceries, and more are available for delivery and pickup.</p> -->
                  <button
                      data-toggle="modal"
                      data-target="#store"
                      class="start-button margin"
                  >Get Started
                    <i class="fa fa-long-arrow-right ml-2"></i></button>
                </div>
              </div>
            </slider-item>
          </slider>
        </div>
        <div class="content container">
          <div
            id="how"
            class="container my-5"
          >
            <h4 class="title">How It Works</h4>
            <!-- <p class="subtitle">Your favourite brands straight from the store to your doorstep</p> -->

            <div class="row mt-5 px-5">
              <div class="col-sm-4 get-started" 
                  data-toggle="modal"
                  data-target="#store">
                <div class="icon-box">
                  <img
                    src="../assets/img/shopping-cart.svg"
                    alt=""
                  >
                </div>
                <div class="description">
                  <h5>Shop For Products</h5>
                  <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p> -->
                </div>
              </div>
              <div class="col-sm-4 get-started" 
                  data-toggle="modal"
                  data-target="#store">
                <div class="icon-box">
                  <img
                    src="../assets/img/payment.svg"
                    alt=""
                  >
                </div>
                <div class="description">
                  <h5>Pay With Ease</h5>
                  <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> -->
                </div>
              </div>
              <div class="col-sm-4 get-started"
                data-toggle="modal"
                data-target="#store">
                <div class="icon-box">
                  <img
                    src="../assets/img/Delivery.svg"
                    alt=""
                  >
                </div>
                <div class="description">
                  <h5>Delivery At Your Doorstep</h5>
                  <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p> -->
                </div>
              </div>
            </div>
          </div>

          <div
            id="categories"
            class="container my-5"
          >

            <div class=" row hover01 column">
              <div class=" col-md-3 col-sm-6 p-0 pr-3 mb-2">
                <div
                  class="inner"
                  data-toggle="modal"
                  data-target="#store"
                >
                  <figure><img src="../assets/img/homepage/fruitsvegie.jpg" /></figure>
                  <span class="text">Fruits & Vegetables</span>

                </div>
              </div>
              <!-- <div class=" col-md-3 col-sm-6 p-0 pr-3 mb-2">
                <div
                  class="inner"
                  data-toggle="modal"
                  data-target="#store"
                >
                  <figure><img src="../assets/img/homepage/meals.jpg" /></figure>
                  <span class="text">Meals</span>

                </div>
              </div> -->

              <div class=" col-md-3 col-sm-6 p-0 pr-3 mb-2">
                <div
                  class="inner"
                  data-toggle="modal"
                  data-target="#store"
                >
                  <figure><img src="../assets/img/homepage/groceries.jpg" /></figure>
                  <span class="text">Groceries</span>

                </div>
              </div>
              <div class=" col-md-3 col-sm-6 p-0 ">
                <div
                  class="inner"
                  data-toggle="modal"
                  data-target="#store"
                >
                  <figure><img src="../assets/img/homepage/winesand-spirits.jpg" /></figure>
                  <span class="text">Wines & Spirits</span>

                </div>
              </div>
              <div class=" col-md-3 col-sm-6 p-0 pr-3 mb-2">
                <div
                  class="inner"
                  data-toggle="modal"
                  data-target="#store"
                >
                  <figure><img src="../assets/img/homepage/cosmetics.jpg" /></figure>
                  <span class="text">Cosmetics</span>

                </div>
              </div>
            </div>
            <div class=" row hover01 column">
              <div class=" col-md-3 col-sm-6 p-0 pr-3 mb-2">
                <div
                  class="inner"
                  data-toggle="modal"
                  data-target="#store"
                >
                  <figure><img src="../assets/img/homepage/homewares-1.jpg" /></figure>
                  <span class="text">Homewares</span>

                </div>
              </div>
              <div class=" col-md-3 col-sm-6 p-0 pr-3 mb-2">
                <div
                  class="inner"
                  data-toggle="modal"
                  data-target="#store"
                >
                  <figure><img src="../assets/img/homepage/pastries.jpg" /></figure>
                  <span class="text">Pastries</span>

                </div>
              </div>

              <div class=" col-md-3 col-sm-6 p-0 ">
                <div
                  class="inner"
                  data-toggle="modal"
                  data-target="#store"
                >
                  <figure><img src="../assets/img/homepage/homeapps1.jpg" /></figure>
                  <span class="text">Home Appliances</span>

                </div>
              </div>
            </div>
          </div>

          <div class="sub-banner container my-3 get-started" 
                  data-toggle="modal"
                  data-target="#store">
            <div class="banner-text">
              <h3 class="title">Find Products from the <br> Stores you already shop at</h3>
              <button
                data-toggle="modal"
                data-target="#store"
                class="start-button"
              >Start Shopping
                <i class="fa fa-long-arrow-right ml-2"></i></button>
            </div>
          </div>

          <!-- <div
            id="featured"
            class="container mt-5 px-4"
          >
            <div class="row">
              <div class="col-sm-12 title mt-3 text-left">Featured Products</div>

            </div>
            <div class="row mt-3">
              <div class="col-sm-6 col-md-3 featured-box">
                <div>
                  <img
                    src="../assets/img/featured1.png"
                    alt=""
                  >

                </div>
              </div>
              <div class="col-sm-6 col-md-3 featured-box">
                <div>
                  <img
                    src="../assets/img/featured2.png"
                    alt=""
                  >

                </div>
              </div>
              <div class="col-sm-6 col-md-3 featured-box">
                <div>
                  <img
                    src="../assets/img/featured3.png"
                    alt=""
                  >

                </div>
              </div>
              <div class="col-sm-6 col-md-3 featured-box">
                <div>
                  <img
                    src="../assets/img/featured4.png"
                    alt=""
                  >

                </div>
              </div>
            </div>
          </div> -->

        </div>
        <div
          id="sub-banner2"
          class="mt-5 d-none d-md-block get-started" 
                  data-toggle="modal"
                  data-target="#store"
        >
          <div class="row container-fluid">
            <div class="col-4 ">
              <img
                src="../assets/img/basket.png"
                alt=""
                class="img-fluid"
              >
            </div>
            <div
              id="text"
              class="col-5"
            >
              <h3 class="title">Get Started</h3>
              <p>Select your store, browse categories and get it delivered quick</p>
              <button
                data-toggle="modal"
                data-target="#store"
                class="start-button"
              >Shop Now
                <i class="fa fa-long-arrow-right ml-2"></i></button>
            </div>
            <div class="col-3 mt-4">
              <img
                src="../assets/img/burger.png"
                alt=""
                class="img-fluid"
              >
            </div>
          </div>
        </div>
      </div>
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
</style>

<script>
import StoreSelector from '@/components/StoreSelector.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'LandingPage',
  components: {
    StoreSelector, TopNav, Footer
  },
  data () {
    return {
      loader: '',
      url: this.$request.url,
      banners: []
    }
  },
  
  beforeMount () {
    this.$store.dispatch("setStoreStatus", false);
    this.$store.dispatch('ToggleShowSearch', false);
    this.loader = this.$loading.show();
  },
  mounted () {
    setTimeout(() => {
      this.loader.hide()
    }, 2000);
    this.fetchBanners()

  },

  created () {
    // this.banners = this.$store.getters.banners
    // console.log(this.banners)
  },
  
  methods: {
    setCategoryRoute (route) {
      this.$store.dispatch('setCategoryRoute', route);
    },
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
      // let result = this.goToCategory(name);
      // if(result != null) {
      //   this.$router.push(result);
      if(name.toLowerCase().includes('xmas')) {
        this.$router.push('/hampers');
      }
    },
    fetchBanners () {
      let req = {
        what: "landingPageThumbnails",
        showLoader: false,
      }
      this.$request.makeGetRequest(req)
        .then(response => {

          if (response.type == 'landingPageThumbnails') {
            this.banners = response.data.data
            // this.$store.dispatch('banners', response.data.data)

          }
        })
        .catch(error => {

          console.log(error)
        });
    }
  }
}

</script>
