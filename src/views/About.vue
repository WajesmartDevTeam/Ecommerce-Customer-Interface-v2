<template>
  <div>
    <TopNav></TopNav>
    <div class="about page">
      <div>
        <div class="banner">
          <div
            class="banner-text"
            style="width:100%"
          >
            <h3 class="title text-center">About Us</h3>

          </div>
        </div>
        <div class="content bg-white ">
          <div class="container block-1">
            <div class="row py-5">
              <div class="col-sm-6 ">
                <img
                  src="../assets/img/MaskGroup7.png"
                  alt=""
                  class="img-fluid"
                >
              </div>
              <div
                class="col-sm-6 mx-auto"
                style="margin:auto"
              >
                <h3 class="title">Find More, Pay Less</h3>
                <p>Marketsquare is Nigeria’s emerging grocery retail chain – a place where Nigerians can go to find their trusted brands of groceries at the best prices. Marketsquare was conceived from a burning sensation to create a modern and relevant retail shopping experience for Nigerians and a more convenient way for people to get their everyday needs.</p>
              </div>
            </div>
          </div>

          <div class="block-2 p-5">
            <div class="container">
              <div class="row ">
                <div class="col-sm-6">
                  <div id="mission">
                    <div class="img-box">
                      <img
                        src="../assets/img/noun_Mission_2191332.png"
                        alt=""
                      >
                    </div>
                    <h5 class="title">Our mission</h5>
                    <p>To be the foremost indigenous grocery retail company using available local resources to bring products and customers together in a modern marketplace for the benefit of all stakeholders.</p>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div id="vision">
                    <div class="img-box">
                      <img
                        src="../assets/img/noun_Binoculars_1236068.png"
                        alt=""
                      >
                    </div>
                    <h5 class="title">Our vision</h5>
                    <p>To create a one-stop destination source for home cooking, home and personal care.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="block-3 my-5 pb-5">
            <h5 class="title mb-5">Our Core Values</h5>
            <div
              class="d-flex "
              style="justify-content: space-evenly; flex-flow: wrap;"
            >
              <div class="value-box">
                <div
                  id="trust"
                  class="value"
                ></div>
                <h5 class="value-text">Trust</h5>
              </div>
              <div class="value-box">
                <div
                  id="service"
                  class="value"
                ></div>
                <h5 class="value-text">Service</h5>
              </div>
              <div class="value-box">
                <div
                  id="integrity"
                  class="value"
                ></div>
                <h5 class="value-text">Integrity</h5>
              </div>
              <div class="value-box">
                <div
                  id="initiative"
                  class="value"
                ></div>
                <h5 class="value-text">Initiative</h5>
              </div>
              <div class="value-box">
                <div
                  id="teamwork"
                  class="value"
                ></div>
                <h5 class="value-text">Teamwork</h5>
              </div>
              <div class="value-box">
                <div
                  id="leadership"
                  class="value"
                ></div>
                <h5 class="value-text">Leadership</h5>
              </div>
              <div class="value-box">
                <div
                  id="accountability"
                  class="value"
                ></div>
                <h5 class="value-text">Accountability</h5>
              </div>
            </div>
          </div>
          <div class="container block-1">
            <div class="row py-5">

              <div
                class="col-sm-6 mx-auto"
                style="margin:auto"
              >
                <p>We provide a wide variety of prepared and packed food, fresh bakes, fresh produce, groceries,
                  wines & spirits, toiletries, baby products and small domestic appliances, to serve the daily needs
                  of individuals, households and corporate organisations. In support of the federal government’s “buy
                  local” initiative and in an affirmative pursuit of local content, we aim to stock and promote
                  ‘Made in Nigeria’ products and support indigenous manufacturers.
                  <br><br>
                  We are proudly Nigerian.
                  <br><br>
                  Marketsquare commenced trading in December 2015.
                  <br><br>
                  The tagline – find more, pay less –
                  is a promise of our unwavering desire to get the best quality products to the customer
                  at the lowest prices we can find.</p>

              </div>
              <div class="col-sm-6 ">
                <img
                  src="../assets/img/MaskGroup3.png"
                  alt=""
                  class="img-fluid"
                >
              </div>
            </div>
          </div>

        </div>
      </div>
      <storeSelector></storeSelector>

    </div>
    <Footer></Footer>
  </div>
</template>


<script>
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
      showSearch: false,
      loader: ''
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', false);
    this.loader = this.$loading.show();
  },
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = 'About Page';
        }
    },
  },
  mounted () {
    setTimeout(() => {
      this.loader.hide()
    }, 2000)
  }
}

</script>

