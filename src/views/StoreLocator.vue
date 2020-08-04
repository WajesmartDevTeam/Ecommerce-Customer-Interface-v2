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
          <div
            class="store"
            v-for="(row, index) in stores"
            v-bind:key="index"
          >
            <div class="row">
              <div class="col-md-4 pl-lg-4 pl-md-3">
                <div class="storename d-flex">
                  <img
                    src="../assets/img/store-icon.png"
                    alt=""
                    style="height:25px;"
                  >
                  <div class="ml-3">
                    <span>{{row.name}}</span>
                  </div>
                </div>
                <div class="store-address mt-3 d-flex">
                  <span class="material-icons">
                    location_on
                  </span>
                  <div class="ml-4">
                    <span>{{row.address}},{{row.city}}, {{row.state}}.</span>
                  </div>
                </div>
                <div class="mode mt-2">
                  <span class="badge">In-store</span>
                  <span
                    v-if="row.store_options.pickup ==1"
                    class="badge ml-2"
                  >Pickup</span>
                  <span
                    v-if="row.store_options.delivery ==1"
                    class="badge ml-2"
                  >Delivery</span>
                </div>
                <button class="btn text-white">Shop Here <i class="fa fa-long-arrow-right ml-2"></i></button>
              </div>
              <div class="col-md-8">
                <iframe
                  :src="row.iframe_src"
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
      stores: []
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', false)
  },
  mounted () {
    this.getAllStores()
  },
  methods: {
    getAllStores () {
      let req = {
        what: "allstores"
      }
      this.$request.makeGetRequest(req)
        .then(response => {
          console.log(response.data)
          this.stores = response.data.stores
        })
        .catch(error => {

          console.log(error)
        });
    },
  }
}

</script>

