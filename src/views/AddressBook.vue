<template>
  <div>
    <TopNav></TopNav>
    <div class="address page bg-white py-5">
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <div id="options">
              <div class="opt">
                <a href="/orders">My Orders</a>
              </div>
              <div class="opt">
                <a href="/account">My Account</a>
              </div>
              <div class="opt active">
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
                    data-toggle="modal"
                    data-target="#addressform"
                  >
                    <a
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
                  v-for="row in addresses"
                  class="col-md-4 col-sm-6"
                >

                  <div
                    class="address-box "
                    style="cursor:pointer;"
                    v-bind:class="row.default==1? 'active':''"
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
              <form @submit.prevent='createAddress()'>
                <div class="form-row">
                  <div class="form-group col-sm-6">

                    <input
                      type="text"
                      class="form-control"
                      required
                      placeholder="Label e.g Home, Office"
                      v-model="address.label"
                    >
                  </div>
                  <div class="form-group col-sm-6">

                    <input
                      type="text"
                      required
                      class="form-control"
                      placeholder="Street Address"
                      v-model="address.address"
                    >
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-sm-6">

                    <input
                      type="text"
                      required
                      class="form-control"
                      placeholder="Area"
                      v-model="address.area"
                    >
                  </div>
                  <div class="form-group col-sm-6">

                    <input
                      type="text"
                      required
                      class="form-control"
                      placeholder="Closest Landmark"
                      v-model="address.landmark"
                    >
                  </div>
                </div>
                <div class="form-row ">
                  <div class="form-group col-sm-6">
                    <input
                      v-if="edit"
                      type="text"
                      required
                      class="form-control"
                      placeholder="Closest Landmark"
                      v-model="address.state"
                    >
                    <select
                      v-else
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

                  </div>
                  <div class="form-group col-sm-6">
                    <input
                      v-if="edit"
                      type="text"
                      required
                      class="form-control"
                      placeholder="Closest Landmark"
                      v-model="address.city"
                    >

                    <select
                      v-else
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
                        :value="row.name"
                      >{{row.name}}</option>
                    </select>
                  </div>
                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      v-model="address.default"
                    >
                    <label
                      class="form-check-label"
                      for="exampleCheck1"
                    >Set as default</label>
                  </div>
                </div>
                <button class="msq-button mt-4">{{edit? 'Update':'Add'}} Address</button>
              </form>
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
      addresses: [],
      address: {
        user_id: this.$store.getters.user.id,
        label: '',
        area: '',
        state: '',
        address: '',
        city: '',
        landmark: '',
        default: ''
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true)
  },
  mounted () {
    this.fetchAddress()
  },
  watch: {
    selected: function (val) {
      let vm = this;
      vm.address.state = val
      this.states.forEach(i => {
        if (i.state.name == val) {
          vm.cities = i.state.locals
        }
      })
    },
  },
  methods: {
    fetchAddress () {
      let req = {
        what: "listaddress",
        showLoader: true,
        params: {
          user_id: this.$store.getters.user.id
        }
      }
      this.$request.makeGetRequest(req)
        .then(response => {
          console.log(response.data.data);
          this.addresses = response.data.data;
        })
        .catch(error => {

          console.log(error)
        });
    },
    createAddress () {
      if (this.edit) {
        let req = {
          what: "editaddress",
          showLoader: true,
          id: this.addressid,
          data: this.address
        }
        this.$request
          .editItem(req)
          .then(res => {
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
      else {
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
        default: row.default
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
        default: 1
      }
      let req = {
        what: "editaddress",
        showLoader: false,
        id: this.addressid,
        data: this.address
      }
      this.$request
        .editItem(req)
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

