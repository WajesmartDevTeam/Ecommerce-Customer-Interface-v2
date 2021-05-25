<template>
  <div>
    <TopNav></TopNav>
    <div class="account page bg-white py-5">
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
                class="opt active"
                @click="$router.push('/account')"
              >
                <a href="/account">My Account</a>
              </div>
              <div
                class="opt "
                @click="$router.push('/addressbook')"
              >
                <a href="/addressbook">Address Book</a>
              </div>
            </div>
          </div>
          <div class="col-sm-9">
            <div class="content">
              <h4 class="title text-left">My Account Settings</h4>
              <div class="col-sm-9 mt-3 p-0">
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent='handleSubmit(updateUser)'>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <validation-provider
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <input
                            type="text"
                            class="form-control"
                            placeholder=" "
                            v-model="user.firstname"
                          >
                          <label class="anim">First Name</label>
                          <span class="err_msg">{{ errors[0] }}</span>
                        </validation-provider>
                      </div>
                      <div class="form-group col-md-6">
                        <validation-provider
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <input
                            type="text"
                            class="form-control"
                            placeholder=" "
                            v-model="user.lastname"
                          >
                          <label class="anim">Last Name</label>
                          <span class="err_msg">{{ errors[0] }}</span>
                        </validation-provider>
                      </div>
                    </div>
                    <div class="form-group">
                      <validation-provider
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <input
                          disabled
                          type="email"
                          class="form-control"
                          placeholder=" "
                          v-model="user.email"
                        >
                        <label class="anim">Email Address</label>
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="form-group">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <vue-tel-input
                          disabled
                          v-model="user.phone"
                        ></vue-tel-input>
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <button class="msq-button mt-4">Update Profile</button>
                    <!-- <div
                      id="changepsw"
                      data-toggle="modal"
                      data-target="#change"
                      class="text-center my-4"
                    > Change Password</div> -->

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
                </ValidationObserver>
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
                    placeholder=" "
                  >
                  <label class="anim">Current Password</label>
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder=" "
                  >
                  <label class="anim">New Password</label>
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder=" "
                  >
                  <label class="anim">Confirm New Password</label>
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
  },
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = 'Account Page';
        }
    },
  },
  methods: {
    updateUser () {
      let req = {
        what: "updatecustomer",
        showLoader: true,
        data: {
          firstname: this.user.firstname,
          id: this.user.id,
          lastname: this.user.lastname
        }
      }
      this.$request
        .makePostRequest(req)
        .then(res => {
          this.$swal.fire("Success", res.data.message, "success");
          this.user.fullname = this.user.title + ' ' + this.user.firstname + ' ' + this.user.lastname
          this.$store.dispatch('user', this.user)
        })
        .catch(error => {
          console.log(error);
          this.$swal.fire("Error", error.message, "error");
        });
    },

  }
}

</script>

