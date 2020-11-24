<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="store"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header d-flex">
            <div
              class=""
              style=""
            >
              <h5 class=" title">Select Your Location</h5>
              <p class="subtitle">Please note that your cart will be cleared when you change store.</p>
            </div>
            <button
              type="button"
              class="close float-right"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="store-tab">
              <button
                id="Delivery"
                @click.prevent="toggleMode('Delivery')"
                class="mode  active"
              >Delivery</button>
              <button
                id="Pickup"
                @click.prevent="toggleMode('Pickup')"
                class="mode"
              >Pickup</button>
            </div>
            <div id="store-content">
              <div class="row">
                <div class="col-sm-6">
                  <v-select
                    :options="cities"
                    v-model="city"
                    placeholder="Kindly select city"
                    class="form-group"
                  >
                    <span slot="no-options">{{city_note}}</span>
                  </v-select>
                </div>
                <div class="col-sm-6">
                  <v-select
                    :options="areas"
                    v-model="area"
                    class="form-group"
                    placeholder="Kindly select area"
                  >
                    <span slot="no-options">{{area_note}}</span>
                  </v-select>
                </div>
              </div>
              <div
                class="d-md-flex justify-content-between mt-3"
                v-if="stores.length>0"
              >
                <h5 class="label">Select Store</h5>
                <div class="store-search">
                  <input
                    v-model="search"
                    type="text"
                    name=""
                    id=""
                    placeholder="Search for stores"
                  >
                  <i class="material-icons">search</i>
                </div>
              </div>
              <div
                class="row my-2"
                v-if="stores.length>0"
              >
                <div
                  v-for="store in filteredList"
                  v-bind:key="store.name"
                  class="col-sm-6 store-box "
                >
                  <div
                    class="d-flex"
                    @click.prevent="saveStore(store)"
                  >
                    <img
                      src="../assets/img/store-icon.png"
                      alt=""
                    >
                    <p class="storename">{{camelCase(store.name)}}</p>
                    <i class="fa fa-long-arrow-right mt-3 ml-lg-4"></i>
                  </div>
                </div>

              </div>
              <div v-if="area !== '' && stores.length == 0 ">
                <div class="text-center my-2">

                  We are currently not processing orders in your area. Kindly view other areas to see the areas that we serve.
                </div>
              </div>
              <div
                v-if="nooption"
                class="my-2"
              >
                <div class="text-center">

                  Our online stores are currently unavailable
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as $ from "jquery";
export default {
  name: 'StoreSelector',
  props: {
    msg: String
  },
  data () {
    return {
      method: "",
      city: "",
      area: "",
      store: null,
      search: "",
      nooption: false,
      city_note: "Loading, please wait...",
      area_note: "Loading, please wait...",
      all_stores: [],
      stores: [],
      stores_id: [],
      zones: [],
      areas: [],
      cities: [],
      choosestore: false,
      storename: "",
    }
  },
  mounted () {
    this.fetchStores();
    // console.log(this.$store.getters.isStoreSet)
    if (this.$store.getters.stat_stores == false) {
      this.fetchStores();
    }
    else {
      this.all_stores = this.$store.getters.allstores
    }

    $('#store').on("show.bs.modal", this.doSomething)


  },

  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },

  computed: {
    filteredList () {


      return this.stores.filter(store => {
        if (store.name.toLowerCase().includes(this.search.toLowerCase())) {
          return store.name.toLowerCase().includes(this.search.toLowerCase());
        } else {
          return store.city.toLowerCase().includes(this.search.toLowerCase());
        }
      });
    }
  },
  watch: {


    method: function (val) {

      let vm = this;
      vm.city = '';
      vm.cities = [];
      vm.area = '';
      vm.stores_id = [];
      if (val == 'Pickup') {
        vm.all_stores.forEach(i => {
          if (i.store_options != null && i.store_options.pickup == 1) {
            vm.zones.forEach(x => {
              x.areas.forEach(j => {
                j.store.forEach(k => {
                  if (i.id == k) {
                    if (!vm.cities.includes(x.city)) {
                      vm.cities.push(x.city);
                    }

                  }
                })
              })

            })
          }
        })
        if (vm.cities.length === 0) {
          vm.city_note = "No matching options";
        }
      }
      else if (val == 'Delivery') {

        vm.all_stores.forEach(i => {
          if (i.store_options != null && i.store_options.delivery == 1) {
            vm.zones.forEach(x => {
              x.areas.forEach(j => {
                j.store.forEach(k => {

                  if (i.id == k) {

                    if (!vm.cities.includes(x.city)) {
                      vm.cities.push(x.city);
                    }

                  }
                })
              })

            })

          }
        })
        if (vm.cities.length === 0) {
          vm.city_note = "No matching options";
        }
      }
      vm.cities.sort();
    },
    city: function (val) {
      let vm = this;
      vm.areas = [];
      vm.stores_id = []
      vm.area = '';
      vm.zones.forEach(i => {
        if (i.city == val) {
          i.areas.forEach(j => {
            if (j.store.length > 0) {
              j.store.forEach(k => {
                vm.all_stores.forEach(l => {
                  if (k == l.id) {

                    if (vm.method == 'Pickup' && l.store_options.pickup == 1) {
                      if (!vm.areas.includes(j.area)) {
                        vm.areas.push(j.area)
                      }

                    }
                    else if (vm.method == 'Delivery' && l.store_options.delivery == 1) {
                      if (!vm.areas.includes(j.area)) {
                        vm.areas.push(j.area)
                      }
                    }
                    else { }
                  }
                })
              })

            }
          })

        }
      });
      vm.areas.sort();
      if (vm.areas.length === 0) {
        vm.area_note = "No matching options";
      }
      // console.log(vm.areas)
    },
    area: function (val) {
      // console.log(val)
      this.$store.dispatch("area", val);
      let vm = this;
      vm.stores_id = []
      let stores = [];
      vm.zones.forEach(i => {
        i.areas.forEach(j => {
          if (j.area == val) {
            j.store.forEach(k => {
              if (!stores.includes(k)) {
                stores.push(k)
              }
            })
            vm.stores_id = stores;

          }
        })
      })

    },

    stores_id: function (val) {
      this.stores = [];
      let vm = this;
      this.all_stores.forEach(i => {
        val.forEach(j => {
          if (i.id == j) {
            if (vm.method == 'Pickup' && i.store_options.pickup == 1) {
              this.stores.push(i)
            }
            else if (vm.method == 'Delivery' && i.store_options.delivery == 1) {
              this.stores.push(i)
            }
            else {

            }

          }
        })
      })
    },

  },
  methods: {
    doSomething ($event) {
      this.fetchAreas();
      let stat = [];
      this.all_stores.forEach(i => {
        if (i.store_options == null || (i.store_options.pickup != '1' && i.store_options.delivery != '1')) {
          stat.push(false)
        }
        else {
          stat.push(true)
        }

      });

      if (!stat.includes(true)) {
        this.nooption = true;
      }

    },
    fetchAreas () {

      let req = {
        what: "areas",
        showLoader: false
      }
      this.$request.makeGetRequest(req)
        .then(response => {
          console.log(response.data)
          this.zones = response.data.data
          this.method = "Delivery";
        })
        .catch(error => {

          console.log(error)
        });

    },
    fetchStores () {

      let req = {
        what: "stores"
      }
      this.$request.makeGetRequest(req)
        .then(response => {

          this.$store.dispatch('setAllStores', response.data.stores)
            .then(re => {
              this.$store.dispatch('setStatStore', true)
              this.all_stores = response.data.stores;
            })

        })
        .catch(error => {

          console.log(error)
        });
    },
    camelCase (str) {
      var arr = new Array();
      let xstr;
      str.split(" ").map(function (word, index) {
        arr[index] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        str = str.replace(word, arr[index]);
      });
      return str;
    },
    toggleMode (method) {
      this.method = method;
      let mode = document.querySelectorAll('.mode');
      let meth = document.getElementById(method);
      mode.forEach(el => {
        el.classList.remove('active')
      })
      if (!meth.classList.contains('active')) {
        meth.classList.add('active')
      }


    },
    saveStore (store) {
      let oldstore = this.$store.getters.store.name;
      store.mode = this.method;

      this.$store.dispatch("setStoreStatus", true);
      this.$store.dispatch("setBlackFriday", false);
      this.$store.dispatch("setStore", store).then(res => {
        if (oldstore !== store.name) {
          this.$store.dispatch('addToCart', []);
          location.reload()
        }
        if (window.location.pathname == "/" || window.location.pathname == "/storeslist") {
          $(".modal").modal("hide")
          this.$router.push('home')
          // location.reload()
        } else if(window.location.pathname == '/black-friday') {
          $(".modal").modal("hide")
          console.log('redirecting')
          this.$router.push(this.$store.getters.categoryRoute);
          this.$router.go();
        } else {
          $(".modal").modal("hide")
          // this.$router.go()
        }
      })



    }

  },
}
</script>


<style scoped>
.vs--searchable .vs__dropdown-toggle {
  cursor: text;
  padding: 10px;
  border: 1px solid lightgrey;
}
</style>
