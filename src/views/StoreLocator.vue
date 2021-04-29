<template>
  <div>
    <TopNav></TopNav>
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
                  <button
                    @click.prevent='store=row'
                    data-toggle='modal'
                    data-target="#mode"
                    class="btn text-white"
                  >Shop Here <i class="fa fa-long-arrow-right ml-2"></i></button>
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
    <!-- Product Modal -->
    <div
      class="modal fade"
      id="mode"
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
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent='handleSubmit(saveStore)'>

                <v-select
                  required
                  :options="['Pickup', 'Delivery']"
                  v-model="method"
                  placeholder="Select fulfillment mode"
                  class="form-group"
                >
                </v-select>
                <validation-provider
                  rules="required"
                  v-if="method== 'Delivery'"
                  v-slot="{ errors }"
                >
                  <v-select
                    v-if="method== 'Delivery'"
                    required
                    :options="areas"
                    v-model="area"
                    placeholder="Select Delivery Area"
                    class="form-group"
                  >
                  </v-select>
                  <span class="err_msg">{{ errors[0] }}</span>
                </validation-provider>
                <button
                  type="submit"
                  class="btn mx-auto text-center"
                >Submit</button>
              </form>
            </ValidationObserver>

          </div>

        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import * as $ from "jquery";
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'StoreLocator',
  components: {
    TopNav, Footer
  },
  data () {
    return {
      showSearch: false,
      stores: [],
      store: {},
      method: '',
      zones: [],
      areas: [],
      area: '',
      loader: ''
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', false);
    this.loader = this.$loading.show();
  },
  mounted () {
    this.getAllStores();

  },
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = 'Market Square NG | Store Locator Page';
        }
    },
    method (val) {
      if (val == 'Delivery') {
        let vm = this;
        this.zones.forEach(i => {
          i.areas.forEach(j => {
            j.store.forEach(k => {
              if (k == vm.store.id) {
                vm.areas.push(j.area)
              }
            })
          })
        })
      }
    }
  },

  methods: {
    getAllStores () {
      let req = {
        what: "allstores",
        showLoader: false
      }
      this.$request.makeGetRequest(req)
        .then(response => {
          this.fetchAreas()
          if (response.type == 'allstores') {
            this.stores = response.data.stores
          }
          this.loader.hide()
        })
        .catch(error => {

          console.log(error)
        });
    },
    fetchAreas () {

      let req = {
        what: "areas",
        showLoader: false
      }
      this.$request.makeGetRequest(req)
        .then(response => {
          if (response.type == 'areas') {
            this.zones = response.data.data
          }
        })
        .catch(error => {

          console.log(error)
        });

    },
    saveStore () {
      if (this.method == 'Delivery') {
        this.$store.dispatch("area", this.area);
      }

      let oldstore = this.$store.getters.store.name;
      this.store.mode = this.method;

      this.$store.dispatch("setStoreStatus", true);
      this.$store.dispatch("setBlackFiday", false);
      this.$store.dispatch("setStore", this.store).then(res => {
        if (oldstore !== this.store.name) {
          this.$store.dispatch('addToCart', [])
        }
        $(".modal").modal("hide")
        this.$router.push('home')
      })



    }
  }
}

</script>

