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

            <div v-if="$store.getters.isStoreSet" class="row title-container"><router-link to="/category/groceries"><div class="col-sm-4 title-space"><div class="title h4">Groceries</div></div></router-link></div>
            <div v-else class="row" 
                    data-toggle="modal"
                    data-target="#store" @click="setCategoryRoute('/category/groceries')"><div class="col-sm-4 title-space"><div class="title h4">Groceries</div></div></div>
            <div class=" row column">
              <div class="product offset-sm-1 col-sm-3 col-xs-4 p-md-2 p-sm-1 mb-4">
                  <div
                    class="product-image row"
                  >
                  <div class="append indomie text-center"><p class="text-center">x40</p></div>
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
                      <div class="col-6 promo">
                        <div class="row">
                          <div class="col-11">₦2,200<sub class="side-text">For a Carton</sub> </div>
                        </div>
                      </div>
                      <div class="col-6 default text-right">RSP  <del><div class="scratched text-right">₦2,400</div></del></div>
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 col-xs-4 p-md-2 p-sm-1 mb-4">
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
                      <div class="col-6 promo">
                        <div class="row">
                          <span class="col-11">₦2,450 <sub class="side-text">Each</sub></span>
                        </div>
                      </div>
                      <div class="col-6 default text-right">RSP  <del><span class="scratched text-right">₦2,945</span></del></div>
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 col-xs-4 p-md-2 p-sm-1 mb-4">
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
                      <div class="col-6 promo">
                        <div class="row">
                          <span class="col-11">₦1,750 <sub class="side-text">For a Carton</sub></span>
                        </div>
                      </div>
                      <div class="col-6 default text-right">RSP  <del><span class="scratched text-right">₦1,945</span></del></div>
                  </div>
              </div>
            </div>
            <div v-if="$store.getters.isStoreSet" class="row title-container mt-4"><router-link to="/category/spirits"><div class="col-sm-4 title-space"><div class="h4 title">Drinks</div></div></router-link></div>
            <div v-else class="row mt-4" 
                    data-toggle="modal"
                    data-target="#store" @click="setCategoryRoute('/category/spirits')"><div class="col-sm-4 title-space"><div class="h4 title">Drinks</div></div></div>
            <div class=" row column">
              <div class="product offset-sm-1 col-sm-3 col-xs-4 p-md-2 p-sm-1 mb-4">
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
                      <div class="col-6 promo">
                        <div class="row">
                          <span class="multi mr-2"><p class="one">x1</p></span>
                          <span class="cost">₦1,200 <sub class="side-text">Each</sub></span>
                          
                        </div>
                      </div>
                      <div class="col-6 default text-right">RSP  <del><span class="scratched text-right">₦1,315</span></del></div>
                  </div>
                  <div class="price row">
                      <div class="col-6 promo">
                        <div class="row">
                          <span class="multi mr-2"><p class="six">x6</p></span>
                          <span class="cost">₦7,200 <sub class="side-text">Each</sub></span>
                        </div>
                      </div>
                      <div class="col-6 default text-right">RSP  <del><span class="scratched text-right">₦7,890</span></del></div>
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 p-md-2 col-xs-4 mb-4 p-sm-1">
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
                      <div class="col-6 promo">
                        <div class="row">
                          <span class="multi mr-2"><p class="one">x1</p></span>
                          <span class="cost">₦3,000 <sub class="side-text">Each</sub></span>
                        </div>
                      </div>
                      <div class="col-6 default text-right">RSP  <del><span class="scratched text-right">₦4,285</span></del></div>
                  </div>
                  <div class="price row">
                      <div class="col-6 promo">
                        <div class="row">
                          <span class="multi mr-2"><p class="twelve">x12</p></span>
                          <span class="cost">₦36,000 <sub class="side-text">Each</sub></span>
                        </div>
                      </div>
                      <div class="col-6 default text-right">RSP  <del><span class="scratched text-right">₦51,420</span></del></div>
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1 col-xs-4 mb-4">
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
                   <div class="append malt text-center"><p class="text-center">x24</p></div>
                    <p class="description">Amstel Malta 33cl</p>
                  </div>
                  <div class="price row">
                      <div class="col-6 promo">
                        <div class="row">
                          <span class="col-11">₦2,880<sub class="side-text">For a Carton</sub></span>
                        </div>
                      </div>
                      <div class="col-6 default text-right">RSP  <del><span class="scratched text-right">₦3,480</span></del></div>
                  </div>
              </div>
            </div>
            <div v-if="$store.getters.isStoreSet" class="row title-container mt-4"><router-link to="/category/sda"><div class="col-sm-4 title-space"><div class="h4 title">Home Appliances</div></div></router-link></div>
            <div v-else class="row mt-4" 
                    data-toggle="modal"
                    data-target="#store" @click="setCategoryRoute('/category/sda')"><div class="col-sm-4 title-space"><div class="h4 title">Home Appliances</div></div></div>
            <div class=" row column">
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1 col-xs-4 mb-4">
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
                      <div class="col-6 promo">
                        <div class="row">
                          <span class="col-11">₦17,000</span>
                        </div>
                      </div>
                      <!-- <div class="col-md-6 default">RSP  <del><span class="scratched text-right">₦2,400</span></del></div> -->
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1 col-xs-4 mb-4">
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
                      <div class="col-6 promo">
                        <div class="row">
                          <span class="col-11">₦4,000 <sub class="side-text">Each</sub></span>
                        </div>
                      </div>
                      <div class="col-6 default text-right">RSP  <del><span class="scratched text-right">₦5,405</span></del></div>
                  </div>
              </div>
              <div class="product offset-sm-1 col-sm-3 p-md-2 p-sm-1 col-xs-4 mb-4">
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
                      <div class="col-6 promo">
                        <div class="row">
                          <span class="col-11">₦12,000</span>
                        </div>
                      </div>
                      <div class="col-6 default text-right">RSP  <del><span class="scratched text-right">₦14,905</span></del></div>
                  </div>
              </div>
            </div>
            <div class="row column mt-5 justify-content-end no-gutters">
              <div class=" offset-sm-5 col-sm-4 mb-3 download mr-auto btn discount" style="color: white; font-weight:0">
                Download discounted product flyer
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
    font-size: 26px !important;
    font-family: harabara;
    font-weight: normal !important;
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
  .default  {
    color: #000066;
    padding-right: 0;
    margin-right: 0;
    font-size: 2.5vh;
  }
  .description {
    /* font-style: italic; */
    font-family: hughs;
    font-size: 3vh;
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
    display: inline;
    text-align: center !important;
    border-radius: 50%;
  }
  .six{
    margin-left: 0.9vh;
    margin-right: 0.9vh;
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
  }
  .twelve{
    margin-left: 0.8vh;
    margin-right: 0.8vh;
    margin-top: 0.75vh;
    font-size: 10px;
    margin-bottom: 0.75vh;
  }
  .one{
    margin-left: 1.05vh;
    margin-right: 1.05vh;
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
  }
  .side-text{
    font-size: 1.5vh;
  }
  .product-image{
    background: #fff;
    text-align: center;
    border-radius: 5%;
  }
  .img-fluid{
    margin: auto;
    display: block;
  }
  .malt{
    right: 6vw; 
  }
  .indomie{
    right: 0vw;
  }
  .append p{
    margin: 1vh;
  }
  .append{
    position: absolute;
    top: 7vh;
    font-size: 12px;
    background: #000066;
    color: #fff;
    height: auto;
    display: inline;
    margin: 0;
    text-align: center;
    border-radius: 50%;
  }
  @media screen and (max-width:320px) {
    .malt{
    right: 26vw;
  }
  .indomie{
    right: 1vw;
  }
  }
  @media screen and (max-width:424px) and (min-width:321px) {
    .malt{
    right: 26vw; 
  }
  .indomie{
    right: 11vw;
  }
  }
  @media screen and (max-width:579px) and (min-width:425px) {
    /* .malt{
      right: 20vw; 
    }
    .indomie{
      right: 6vh;
    } */
  }
  @media screen and (max-width:580px) and (min-width:425px) {
    .malt{
      right: 30vw; 
      top: 8vh;
    }
    .indomie{
      right: 20vw;
    }
  }
  @media screen and (max-width:1024px) and (min-width:580px) {
    .promo .row .col-11{
    font-size: 1.5vw;
    padding-right: 0;
  }
  .description {
    /* font-style: italic; */
    font-family: hughs;
    font-size: 1.5vh;
    color: #000066;
  }
   .malt{
    top: 3vh; 
  }
  .indomie{
    top:4vh;
  }
  .append p{
    margin: 0.5vh;
  }
  .one{
    margin-left: 0.65vh;
    margin-right: 0.65vh;
    margin-top: 0.4vh;
    margin-bottom: 0.4vh;
  }
  .six{
    margin-left: 0.55vh;
    margin-right: 0.55vh;
    margin-top: 0.4vh;
    margin-bottom: 0.4vh;
  }
  .twelve{
    margin-left: 0.5vh;
    margin-right: 0.5vh;
    margin-top: 0.5vh;
    font-size: 10px;
    margin-bottom: 0.5vh;
  }
  .discount {
    font-size: 1.5vw;
    padding-right: 0;
  }
  .cost{
    font-size: 1.5vw;
    padding-right: 0;
  }
  .side-text{
    font-size: 0.7vw;
  }
  .default  {
    color: #000066;
    padding-right: 0;
    margin-right: 0;
    font-size: 1.5vw;
  }
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
