<template>
  <div>
    <TopNav></TopNav>
    <div class="address page bg-white py-5">
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <div id="options">
              <div
                class="opt"
                @click="$router.push('/orders')"
              >
                <a href="/orders">My Orders</a>
              </div>
              <div
                class="opt"
                @click="$router.push('/account')"
              >
                <a href="/account">My Account</a>
              </div>
              <div
                class="opt active"
                @click="$router.push('/addressbook')"
              >
                <a href="/addressbook">Address Book</a>
              </div>
            </div>
          </div>
          <div class="col-sm-9">
            <div class="content">
              <h4 class="title text-left">Address Book</h4>
              <div class="row">
                <div class="col-md-4 col-sm-6">
                  <div
                    id="addnew"
                    @click="edit=false;address={}"
                    data-toggle="modal"
                    data-target="#addressform"
                  >
                    <a
                      @click.prevent="edit=false; address={}"
                      data-toggle="modal"
                      data-target="#addressform"
                    >
                      <img
                        src="../assets/img/addnew.png"
                        alt=""
                      >
                    </a>
                    <p>Add new address</p>
                  </div>
                </div>
                <div
                  v-for="(row, index) in addresses"
                  v-bind:key="index"
                  class="col-md-4 col-sm-6"
                >
                  <div
                    class="address-box"
                    style="cursor:pointer;"
                    v-bind:class="row.address_default==1? 'active':''"
                  >
                    <div style="height:23px">
                      <span
                        class="material-icons float-right dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        type="button"
                        aria-expanded="false"
                      >
                        more_horiz
                      </span>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a
                          @click.prevent="editAd(row)"
                          class="dropdown-item"
                          href=""
                          data-toggle="modal"
                          data-target="#addressform"
                        >Edit Address</a>
                        <a
                          class="dropdown-item"
                          href=""
                          @click.prevent="handleDelete(row.id)"
                        >Remove Address</a>

                      </div>
                      <img
                        src="../assets/img/checked.png"
                        alt=""
                        class="check float-right"
                      >

                    </div>
                    <div @click="setDefault(row)">
                      <h5>{{row.label}}</h5>
                      <p>{{row.address}}, {{row.area}}, {{row.city}}, {{row.state}}.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <storeSelector></storeSelector>

      <!-- Address Modal -->
      <div
        class="modal fade"
        id="addressform"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                style="font-size:15px;font-weignt:600;"
                class="modal-title text-left"
              >{{edit ? 'Edit':'Add'}} Delivery address <br>
                <small
                  v-if="edit"
                  style="font-size:11px;color:#859BBCF5;"
                >Edit address.</small>
                <small
                  v-else
                  style="font-size:11px;color:#859BBCF5;"
                >Add where you will like to make your deliveries.</small>
              </h5>

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
                <form @submit.prevent='handleSubmit(createAddress)'>
                  <div class="form-row">
                    <div class="form-group col-sm-6">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          type="text"
                          class="form-control"
                          required
                          placeholder=" "
                          v-model="address.label"
                        >
                        <label class="anim">Label e.g Home, Office</label>
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="form-group col-sm-6">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          type="text"
                          required
                          class="form-control"
                          placeholder=" "
                          v-model="address.address"
                        >
                        <label class="anim">Street Address</label>
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-sm-6">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          type="text"
                          required
                          class="form-control"
                          placeholder=" "
                          v-model="address.area"
                        >
                        <label class="anim">Area</label>
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="form-group col-sm-6">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          type="text"
                          required
                          class="form-control"
                          placeholder=" "
                          v-model="address.landmark"
                        > <label class="anim">Closest landmark</label>
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-row ">
                    <div class="form-group col-sm-6">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors }"
                      >

                        <select
                          v-if="edit==false"
                          name=""
                          id=""
                          required
                          class="form-control "
                          v-model="selected"
                        >
                          <option
                            value=""
                            selected
                            hidden
                          >Select State</option>
                          <option
                            v-for="(row, index) in states"
                            v-bind:key='index'
                            :value="row.state.name"
                          >{{row.state.name}}</option>
                        </select>
                        <input
                          v-else
                          type="text"
                          required
                          class="form-control"
                          placeholder=" "
                          v-model="address.state"
                        >

                        <label
                          v-if="edit"
                          class="anim"
                        >Enter State</label>
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="form-group col-sm-6">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors }"
                      >

                        <select
                          v-if="edit==false"
                          name=""
                          id=""
                          required
                          class="form-control "
                          v-model="address.city"
                        >
                          <option
                            value=""
                            selected
                            hidden
                          >Select City</option>
                          <option
                            v-for="(row, index) in cities"
                            v-bind:key='index'
                            :value="row"
                          >{{row}}</option>
                        </select>
                        <input
                          v-else
                          type="text"
                          required
                          class="form-control"
                          placeholder=" "
                          v-model="address.city"
                        >
                        <label
                          v-if="edit"
                          class="anim"
                        >Enter City</label>
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="form-group form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        v-model="address.address_default"
                      >
                      <label
                        class="form-check-label"
                        for="exampleCheck1"
                      >Set as default</label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="msq-button mt-4"
                  >{{edit? 'Update':'Add'}} Address</button>
                </form>
              </ValidationObserver>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import * as $ from "jquery";
import States from "../states";
import StoreSelector from '@/components/StoreSelector.vue'
export default {
  name: 'AddressBook',
  components: {
    StoreSelector, TopNav, Footer
  },
  data () {
    return {
      edit: false,
      showSearch: false,
      addressid: '',
      states: States.states,
      selected: '',
      cities: [],
      areas: [],
      loader: '',
      addresses: [],
      address: {
        user_id: this.$store.getters.user.id,
        label: '',
        area: '',
        state: '',
        address: '',
        city: '',
        landmark: '',
        default: 0
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true);
    this.loader = this.$loading.show();
  },
  mounted () {
    this.fetchAddress();

  },
  watch: {
  
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = 'Address | Market Square';
        }
    },

    selected: function (val) {
      let vm = this;
      vm.address.state = val
      this.states.forEach(i => {
        if (i.state.name == val) {
          // vm.cities = i.state.locals
          vm.cities = i.state.cities;
        }
      })
    },
  },
  methods: {
    fetchAddress () {
      let req = {
        what: "listaddress",
        showLoader: false,
        params: {
          user_id: this.$store.getters.user.id
        }
      }
      this.$request.makeGetRequest(req)
        .then(response => {
          console.log(response.data.data);
          this.addresses = response.data.data;
          this.loader.hide()
        })
        .catch(error => {

          console.log(error)
        });
    },
    createAddress () {

      this.address.user_id = this.$store.getters.user.id
      if (!this.address.hasOwnProperty("address_default")) {
        this.address.address_default = 0
      }
      if (this.edit) {
        let req = {
          what: "editaddress",
          showLoader: true,
          id: this.addressid,
          data: this.address
        }

        this.$request
          .makePostRequest(req)
          .then(res => {
            console.log(res)
            this.$swal.fire("Success", res.data.message, "success");
            this.address = {}
            $(".modal").modal("hide")
            this.fetchAddress();
            this.edit = false;
          })
          .catch(error => {
            console.log(error);
            this.$swal.fire("Error", error.message, "error");
            this.address = {}
            $(".modal").modal("hide")
            this.edit = false;
          });
      }
      else {

        this.address.state = this.selected;
        let req = {
          what: "createaddress",
          showLoader: true,
          data: this.address
        }
        this.$request
          .makePostRequest(req)
          .then(res => {
            console.log(res)
            this.$swal.fire("Success", res.data.message, "success");
            this.address = {}
            $(".modal").modal("hide")
            this.fetchAddress();
          })
          .catch(error => {
            console.log(error);
            this.$swal.fire("Error", error.message, "error");
          });
      }

    },
    editAd (row) {
      this.edit = true;
      this.addressid = row.id;
      this.address = {
        label: row.label,
        area: row.area,
        state: row.state,
        address: row.address,
        city: row.city,
        landmark: row.landmark,
        address_default: Number(row.address_default)
      }

    },
    setDefault (row) {
      this.addressid = row.id;
      this.address = {
        label: row.label,
        area: row.area,
        state: row.state,
        address: row.address,
        city: row.city,
        landmark: row.landmark,
        address_default: true
      }
      let req = {
        what: "editaddress",
        showLoader: false,
        id: this.addressid,
        data: this.address
      }
      this.$request
        .makePostRequest(req)
        .then(res => {
          this.address = {}
          this.fetchAddress();
        })
        .catch(error => {
          console.log(error);
          this.$swal.fire("Error", error.message, "error");
        });
    },
    handleDelete (id) {
      let req = {
        what: "deleteaddress",
        showLoader: true,
        id: id
      }
      this.$request
        .deleteItem(req)
        .then(res => {
          this.$swal.fire("Success", res.data.message, "success");
          this.fetchAddress();
        })
        .catch(error => {
          console.log(error);
          this.$swal.fire("Error", error.message, "error");
        });
    }
  }
}

</script>

