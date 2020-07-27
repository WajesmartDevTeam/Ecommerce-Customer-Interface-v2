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
          <div class="modal-header">
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
                @click.prevent='toggleMode()'
                class="mode active"
              >Delivery</button>
              <button
                @click.prevent='toggleMode()'
                class="mode"
              >Pickup</button>
            </div>
            <div id="store-content">
              <div class="row">
                <div class="col-sm-6">
                  <v-select
                    :options="['Canada','United States'] "
                    placeholder='Select City'
                  />
                </div>
                <div class="col-sm-6">
                  <v-select
                    :options="['Canada','United States']"
                    placeholder='Select Area'
                  />
                </div>
              </div>
              <div class="d-md-flex justify-content-between mt-3">
                <h5 class="label">Select Store</h5>
                <div class="store-search">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search Store"
                  >
                  <i class="material-icons">search</i>
                </div>
              </div>
              <div class="row my-2">
                <div class="col-sm-6 store-box ">
                  <div
                    class="d-flex"
                    @click="router.view('home')"
                  >
                    <img
                      src="../assets/img/store-icon.png"
                      alt=""
                    >
                    <p class="storename">Marketsquare Adageorge</p>
                    <i class="fa fa-long-arrow-right mt-3 ml-lg-4"></i>
                  </div>
                </div>
                <div class="col-sm-6 store-box">
                  <div class="d-flex">
                    <img
                      src="../assets/img/store-icon.png"
                      alt=""
                    >
                    <p class="storename">Marketsquare Adageorge</p>
                    <i class="fa fa-long-arrow-right mt-3 ml-lg-4"></i>
                  </div>
                </div>
                <div class="col-sm-6 store-box ">
                  <div class="d-flex">
                    <img
                      src="../assets/img/store-icon.png"
                      alt=""
                    >
                    <p class="storename">Marketsquare Adageorge</p>
                    <i class="fa fa-long-arrow-right mt-3 ml-lg-4"></i>
                  </div>
                </div>
                <div class="col-sm-6 store-box">
                  <div class="d-flex">
                    <img
                      src="../assets/img/store-icon.png"
                      alt=""
                    >
                    <p class="storename">Marketsquare Adageorge</p>
                    <i class="fa fa-long-arrow-right mt-3 ml-lg-4"></i>
                  </div>
                </div>
                <div class="col-sm-6 store-box ">
                  <div class="d-flex">
                    <img
                      src="../assets/img/store-icon.png"
                      alt=""
                    >
                    <p class="storename">Marketsquare Adageorge</p>
                    <i class="fa fa-long-arrow-right mt-3 ml-lg-4"></i>
                  </div>
                </div>
                <div class="col-sm-6 store-box">
                  <div class="d-flex">
                    <img
                      src="../assets/img/store-icon.png"
                      alt=""
                    >
                    <p class="storename">Marketsquare Adageorge</p>
                    <i class="fa fa-long-arrow-right mt-3 ml-lg-4"></i>
                  </div>
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
export default {
  name: 'StoreSelector',
  props: {
    msg: String
  },
  methods: {
    toggleMode () {
      let mode = document.querySelectorAll('.mode');
      mode.forEach(el => {
        if (el.classList.contains('active')) {
          el.classList.remove('active')
        }
        else {
          el.classList.add('active')
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
