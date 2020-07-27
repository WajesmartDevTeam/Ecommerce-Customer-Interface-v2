<template>
  <div class="storelocator page">
    <div class="">
      <div class="banner store-banner ">
        <div
          class="banner-text"
          style="width:100%"
        >
          <h3 class="title text-center">Stores List</h3>
          <p class="subtitle text-center text-capitalize">Select where to shop</p>
        </div>
      </div>
      <div class="content">
        <div class="container">
          <div class="store">
            <div class="row">
              <div class="col-md-4 pl-lg-4 pl-md-3">
                <div class="storename d-flex">
                  <img
                    src="../assets/img/store-icon.png"
                    alt=""
                    style="height:25px;"
                  >
                  <div class="ml-3">
                    <span>Marketsquare Adageorge</span>
                  </div>
                </div>
                <div class="store-address mt-3 d-flex">
                  <span class="material-icons">
                    location_on
                  </span>
                  <div class="ml-4">
                    <span># 9 Ada George,Port Harcourt, Rivers.</span>
                  </div>
                </div>
                <div class="mode mt-2">
                  <span class="badge">In-store</span>
                  <span class="badge ml-2">Pickup</span>
                  <span class="badge ml-2">Delivery</span>
                </div>
                <button class="btn text-white">Shop Here <i class="fa fa-long-arrow-right ml-2"></i></button>
              </div>
              <div class="col-md-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63610.55858801709!2d6.976910470652012!3d4.828328430478684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cc5d0e61e05d%3A0x7cc06c2ec622c7dd!2sMarket%20Square!5e0!3m2!1sen!2sng!4v1594123492185!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  style="border:0;"
                  allowfullscreen=""
                  aria-hidden="false"
                  tabindex="0"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>


<script>

export default {
  name: 'StoreLocator',
  components: {
  },
  data () {
    return {
      showSearch: false,
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', false)
  },
  mounted () {
    // console.log(this.$store.getters.showSearch)
  }
}

</script>

