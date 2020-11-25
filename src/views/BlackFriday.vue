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

            <div v-if="$store.getters.isStoreSet" class="row title-container"><router-link to="/category/groceries"><div class="col-sm-4 title-space"><div class=" col-sm-12 title"><h4>Groceries</h4></div></div></router-link></div>
            <div v-else class="row" 
                    data-toggle="modal"
                    data-target="#store" @click="setCategoryRoute('/category/groceries')"><div class="col-sm-4 title-space"><div class=" col-sm-12 title"><h4>Groceries</h4></div></div></div>
            <div class=" row column">
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1">
                  <div
                    class="product-image row"
                  >
                  <span style="position: absolute; top: 9vh; right: 0.5vw; width: 2vw; height: 3vh" class="multi">x40</span>
                    <img
                      src="../assets/img/blackFriday/indomie.jpg"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    class="product-text row"
                  >
                    <p class="description">Indomie Chicken 70g</p>
                  </div>
                  <div class="price row">
                      <div class="col-md-6 promo">
                        <div class="row">
                          <div class="col-sm-6">₦2,200</div><div class="side-text text-right col-sm-5"> For a Carton</div>
                        </div>
                      </div>
                      <div class="col-md-6 default">RSP  <del><div class="scratched text-right">₦2,400</div></del></div>
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1">
                  <div
                    class="product-image row"
                  >
                    <img
                      src="../assets/img/blackFriday/oil.jpg"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    class="product-text row"
                  >
                    <p class="description">Power Vegetable Oil 3ltrs</p>
                  </div>
                  <div class="price row">
                      <div class="col-md-6 promo">
                        <div class="row">
                          <span class="col-sm-6">₦2,450</span><span class="side-text col-sm-5">Each</span>
                        </div>
                      </div>
                      <div class="col-md-6 default">RSP  <del><span class="scratched text-right">₦2,945</span></del></div>
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1">
                  <div
                    class="product-image row"
                  >
                    <img
                      src="../assets/img/blackFriday/milo.jpg"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    class="product-text row"
                  >
                    <p class="description">Nestle Milo 1kg</p>
                  </div>
                  <div class="price row">
                      <div class="col-md-6 promo">
                        <div class="row">
                          <span class="col-sm-6">₦1,750</span><span class="side-text col-sm-5">For a Carton</span>
                        </div>
                      </div>
                      <div class="col-md-6 default">RSP  <del><span class="scratched text-right">₦1,945</span></del></div>
                  </div>
              </div>
            </div>
            <div v-if="$store.getters.isStoreSet" class="row title-container mt-4"><router-link to="/category/spirits"><div class="col-sm-4 title-space"><div class=" col-sm-12 title"><h4>Drinks</h4></div></div></router-link></div>
            <div v-else class="row mt-4" 
                    data-toggle="modal"
                    data-target="#store" @click="setCategoryRoute('/category/spirits')"><div class="col-sm-4 title-space"><div class=" col-sm-12 title"><h4>Drinks</h4></div></div></div>
            <div class=" row column">
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1">
                  <div
                    class="product-image row"
                  >
                    <img
                      src="../assets/img/blackFriday/bailey.jpg"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    class="product-text row"
                  >
                    <p class="description">Baileys Delight 75cl</p>
                  </div>
                  <div class="price row mb-2">
                      <div class="col-md-6 promo">
                        <div class="row">
                          <span class="multi">x1</span>
                          <span class="col-sm-5">₦1,200</span>
                          <span class="side-text col-sm-4">Each</span>
                        </div>
                      </div>
                      <div class="col-md-6 default">RSP  <del><span class="scratched text-right">₦1,315</span></del></div>
                  </div>
                  <div class="price row">
                      <div class="col-md-6 promo">
                        <div class="row">
                          <span class="multi">x6</span>
                          <span class="col-sm-5">₦7,200</span><span class="side-text col-sm-4">Each</span>
                        </div>
                      </div>
                      <div class="col-md-6 default">RSP  <del><span class="scratched text-right">₦7,890</span></del></div>
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1">
                  <div
                    class="product-image row"
                  >
                    <img
                      src="../assets/img/blackFriday/johnnie.jpg"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    class="product-text row"
                  >
                    <p class="description">Johnnie Walker Red Label 70cl</p>
                  </div>
                  <div class="price row mb-2">
                      <div class="col-md-6 promo">
                        <div class="row">
                          <span class="multi">x1</span>
                          <span class="col-sm-5">₦3,000</span><span class="side-text col-sm-4">Each</span>
                        </div>
                      </div>
                      <div class="col-md-6 default">RSP  <del><span class="scratched text-right">₦4,285</span></del></div>
                  </div>
                  <div class="price row">
                      <div class="col-md-6 promo">
                        <div class="row">
                          <span class="multi">x12</span>
                          <span class="col-sm-5">₦36,000</span><span class="side-text col-sm-4">Each</span>
                        </div>
                      </div>
                      <div class="col-md-6 default">RSP  <del><span class="scratched text-right">₦51,420</span></del></div>
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1">
                  <div
                    class="product-image row"
                  >
                    <img
                      src="../assets/img/blackFriday/malt.jpg"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    class="product-text row"
                  >
                   <span style="position: absolute; top: 7vh; right: 6vw; width: 2vw; height: 3vh" class="multi">x24</span>
                    <p class="description">Amstel Malta 33cl</p>
                  </div>
                  <div class="price row">
                      <div class="col-md-6 promo">
                        <div class="row">
                          <span class="col-sm-6">₦2,880</span><span class="side-text col-sm-5">For a Carton</span>
                        </div>
                      </div>
                      <div class="col-md-6 default">RSP  <del><span class="scratched text-right">₦3,480</span></del></div>
                  </div>
              </div>
            </div>
            <div v-if="$store.getters.isStoreSet" class="row title-container mt-4"><router-link to="/category/sda"><div class="col-sm-4 title-space"><div class=" col-sm-12 title"><h4>Home Appliances</h4></div></div></router-link></div>
            <div v-else class="row mt-4" 
                    data-toggle="modal"
                    data-target="#store" @click="setCategoryRoute('/category/sda')"><div class="col-sm-4 title-space"><div class=" col-sm-12 title"><h4>Home Appliances</h4></div></div></div>
            <div class=" row column">
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1">
                  <div
                    class="product-image row"
                  >
                    <img
                      src="../assets/img/blackFriday/fan.png"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    class="product-text row"
                  >
                    <p class="description">Binatone Standing Fan</p>
                  </div>
                  <div class="price row">
                      <div class="col-md-6 promo">
                        <div class="row">
                          <span class="col-sm-12">₦17,000</span>
                        </div>
                      </div>
                      <!-- <div class="col-md-6 default">RSP  <del><span class="scratched text-right">₦2,400</span></del></div> -->
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1">
                  <div
                    class="product-image row"
                  >
                    <img
                      src="../assets/img/blackFriday/iron.png"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    class="product-text row"
                  >
                    <p class="description">Binatone Dry Iron</p>
                  </div>
                  <div class="price row">
                      <div class="col-md-6 promo">
                        <div class="row">
                          <span class="col-sm-6">₦4,000</span><span class="side-text col-sm-5">Each</span>
                        </div>
                      </div>
                      <div class="col-md-6 default">RSP  <del><span class="scratched text-right">₦5,405</span></del></div>
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1">
                  <div
                    class="product-image row"
                  >
                    <img
                      src="../assets/img/blackFriday/blender.png"
                      alt=""
                      class="img-fluid"
                    >
                  </div>
                  <div
                    class="product-text row"
                  >
                    <p class="description">Binatone Big-452 Blender/grinder</p>
                  </div>
                  <div class="price row">
                      <div class="col-md-6 promo">
                        <div class="row">
                          <span class="col-sm-12">₦12,000</span>
                        </div>
                      </div>
                      <div class="col-md-6 default">RSP  <del><span class="scratched text-right">₦14,905</span></del></div>
                  </div>
              </div>
            </div>
            <div class="row column mt-5 justify-content-end no-gutters">
              <div class=" offset-sm-5 col-sm-4 download mr-auto btn" style="color: white; font-weight:0">
                Download discounted product list
              </div>
              <div v-if='$store.getters.isStoreSet==false' class="col-sm-2 promo get-started btn" data-toggle="modal"
                data-target="#store">
                Shop Now
              </div>
              <div v-else class="col-sm-2 promo get-started btn" @click="$router.push('home')">
                Shop Now
              </div>
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
  .title-space:hover{ 
    cursor : pointer;
  }
  .title-space{
    background: #ff0000;
    padding-right: 0;
    margin: 0;
  }
  .download{
    background: #000066;
    color: #fff;
  }
  .title{
    background: #000066;
    color: #fff;
    padding-top: 4px;
    padding-bottom: 4px;
    font-weight: bold;
  }
  h4{
    margin-bottom: 0;
    margin-right: 0;
    color: #fff;
  }
  .promo{
    color: #fff;
    background: #ff0000;
  }
  .promo .row{
    font-size: 1.5vw;
  }
  .default  {
    color: #000066;
    padding-right: 0;
    margin-right: 0;
    font-size: 1.5vw;
  }
  .description {
    font-style: italic;
    color: #000066;
  }
  .scratched{
    color: #000066;
    padding-right: 0;
    margin-right: 0;
    display: inline;
    text-align: right !important;
  }
  del{
    color: #ff0000;
  }
  .multi{
    font-size: 12px;
    background: #000066;
    color: #fff;
    min-width: 2vw;
    height: auto;
    text-align: center;
    border-radius: 50%;
  }
  .side-text{
    font-size: 6px;
    padding-bottom: 0;
    padding-right: 0;
    margin-right: 0;
    text-align: right !important;
    padding-top: 1vh;
  }
  .product-image{
    background: #fff;
    text-align: center;
  }
  .img-fluid{
    margin: auto;
    display: block;
  }
  @media screen and (max-width:320px) {
  }
  @media screen and (max-width:375px) and (min-width:321px) {
  }
  @media screen and (max-width:425px) and (min-width:375px) {
  }
  @media screen and (min-width:1025px) {
  }
  @media screen and (max-width:1024px) and (min-width:993px) {
  }
</style>

<script>
import StoreSelector from '@/components/StoreSelector.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'BlackFriday',
  components: {
    StoreSelector, TopNav, Footer
  },
  data () {
    return {
      loader: '',
      // MSQNowOpenHomePage
      banners: ['Homepage']
    }
  },
  
  beforeMount () {
    this.$store.dispatch("setBlackFriday", true);
    this.$store.dispatch('ToggleShowSearch', false);
    this.loader = this.$loading.show();
  },
  mounted () {
    setTimeout(() => {
      this.loader.hide()
    }, 500);
  },

  created () {
    // this.banners = this.$store.getters.banners
  },
  
  methods: {
    setCategoryRoute (route) {
      this.$store.dispatch('setCategoryRoute', route);
    }
  }
}

</script>
