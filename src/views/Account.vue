<template>
  <div>
    <TopNav></TopNav>
    <div class="account page bg-white py-5">
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <div id="options">
              <div class="opt">
                <a href="/orders">My Orders</a>
              </div>
              <div class="opt active">
                <a href="/account">My Account</a>
              </div>
              <div class="opt ">
                <a href="/addressbook">Address Book</a>
              </div>
            </div>
          </div>
          <div class="col-sm-9">
            <div class="content">
              <h4 class="title text-left">My Account Settings</h4>
              <div class="col-sm-9 mt-3 p-0">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name"
                        v-model="user.firstname"
                      >
                    </div>
                    <div class="form-group col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                        v-model="user.lastname"
                      >
                    </div>
                  </div>
                  <div class="form-group">

                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email Address"
                      v-model="user.email"
                    >
                  </div>
                  <div class="form-group">
                    <!-- <input
                        type="text"
                        class="form-control"
                        placeholder="Phone Number"
                      > -->
                    <vue-tel-input v-model="user.phone"></vue-tel-input>
                  </div>
                  <button class="msq-button mt-4">Update Profile</button>
                  <div
                    id="changepsw"
                    data-toggle="modal"
                    data-target="#change"
                    class="text-center my-4"
                  > Change Password</div>

                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      v-model="user.subscription"
                    >
                    <label
                      class="form-check-label"
                      for="exampleCheck1"
                    >Receive Marketsquare promotional notification</label>
                  </div>
                </form>
              </div>
              <div class="avatar col-3"></div>
            </div>
          </div>
        </div>
      </div>
      <storeSelector></storeSelector>
      <!-- Change password Modal -->
      <div
        class="modal fade"
        id="change"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                style="font-size:15px;font-weignt:600;"
                class="modal-title text-left"
              >Change Password <br>
                <small style="font-size:11px;color:#859BBCF5;">Change your account password below</small>
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
                <div class="form-group">

                  <input
                    type="password"
                    class="form-control"
                    placeholder="Current Password"
                  >
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="New Password"
                  >
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Confirm New Password"
                  >
                </div>
                <button class="msq-button mt-4">Update Password</button>
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
import StoreSelector from '@/components/StoreSelector.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'AddressBook',
  components: {
    StoreSelector, TopNav, Footer
  },
  data () {
    return {
      showSearch: false,
      user: {}
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true)
  },
  mounted () {
    this.user = this.$store.getters.user
    console.log(this.user)
  }
}

</script>

