<template>
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
              <div class="col-md-4 col-sm-6">

                <div class="address-box active">
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
                        class="dropdown-item"
                        href="#"
                      >Edit Address</a>
                      <a
                        class="dropdown-item"
                        href="#"
                      >Remove Address</a>

                    </div>
                    <img
                      src="../assets/img/checked.png"
                      alt=""
                      class="check float-right"
                    >

                  </div>
                  <h5>Home</h5>
                  <p>Muritala Mohammed Airport Terminal 2, Airport Road, Ikeja, Lagos.</p>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="address-box">
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
                        class="dropdown-item"
                        href="#"
                      >Edit Address</a>
                      <a
                        class="dropdown-item"
                        href="#"
                      >Remove Address</a>

                    </div>

                    <img
                      src="../assets/img/checked.png"
                      alt=""
                      class="check float-right"
                    >

                  </div>
                  <h5>Home</h5>
                  <p>Muritala Mohammed Airport Terminal 2, Airport Road, Ikeja, Lagos.</p>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="address-box">
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
                        class="dropdown-item"
                        href="#"
                      >Edit Address</a>
                      <a
                        class="dropdown-item"
                        href="#"
                      >Remove Address</a>

                    </div>
                    <img
                      src="../assets/img/checked.png"
                      alt=""
                      class="check float-right"
                    >

                  </div>
                  <h5>Home</h5>
                  <p>Muritala Mohammed Airport Terminal 2, Airport Road, Ikeja, Lagos.</p>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="address-box">
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
                        class="dropdown-item"
                        href="#"
                      >Edit Address</a>
                      <a
                        class="dropdown-item"
                        href="#"
                      >Remove Address</a>

                    </div>
                    <img
                      src="../assets/img/checked.png"
                      alt=""
                      class="check float-right"
                    >

                  </div>
                  <h5>Home</h5>
                  <p>Muritala Mohammed Airport Terminal 2, Airport Road, Ikeja, Lagos.</p>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="address-box">
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
                        class="dropdown-item"
                        href="#"
                      >Edit Address</a>
                      <a
                        class="dropdown-item"
                        href="#"
                      >Remove Address</a>

                    </div>
                    <img
                      src="../assets/img/checked.png"
                      alt=""
                      class="check float-right"
                    >

                  </div>
                  <h5>Home</h5>
                  <p>Muritala Mohammed Airport Terminal 2, Airport Road, Ikeja, Lagos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <storeSelector></storeSelector>

    <!-- Change password Modal -->
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
            >Add Delivery address <br>
              <small style="font-size:11px;color:#859BBCF5;">Add where you will like to make your deliveries.</small>
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
            <form action="">
              <div class="form-row">
                <div class="form-group col-sm-6">

                  <input
                    type="text"
                    class="form-control"
                    placeholder="Lable e.g Home, Office"
                  >
                </div>
                <div class="form-group col-sm-6">

                  <input
                    type="text"
                    class="form-control"
                    placeholder="House Number"
                  >
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-sm-6">

                  <input
                    type="text"
                    class="form-control"
                    placeholder="Street Address"
                  >
                </div>
                <div class="form-group col-sm-6">

                  <input
                    type="text"
                    class="form-control"
                    placeholder="Closest Landmark"
                  >
                </div>
              </div>
              <div class="form-row ">
                <div class="form-group col-sm-6">

                  <!-- <input
                    type="text"
                    class="form-control"
                    placeholder="State"
                  > -->
                  <v-select placeholder="State"></v-select>

                </div>
                <div class="form-group col-sm-6">

                  <!-- <input
                    type="text"
                    class="form-control"
                    placeholder="City"
                  > -->
                  <v-select placeholder="City"></v-select>
                </div>
              </div>
              <button class="msq-button mt-4">Add Address</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import StoreSelector from '@/components/StoreSelector.vue'
export default {
  name: 'AddressBook',
  components: {
    StoreSelector
  },
  data () {
    return {
      showSearch: false,
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true)
  },
  mounted () {
    // console.log(this.$store.getters.showSearch)
  }
}

</script>

