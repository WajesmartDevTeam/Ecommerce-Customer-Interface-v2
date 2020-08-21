<template>
  <div class="row auth page">
    <div class="col-md-4 img-box p-3 pl-5 ">
      <a href="/home">
        <img
          src="../assets/img/logo_mobile.png"
          alt=""
        >
      </a>
    </div>
    <div class="col-md-8 field p-3">
      <div class="option text-right">
        <a href="/register">Don’t have an account? <span>Register</span></a>
      </div>
      <div class="auth-form">
        <h5 class="title mb-5">Sign in to continue to your account.</h5>
        <form @submit.prevent='handleLogin()'>
          <div class="form-group">
            <!-- <input
              type="text"
              class="form-control"
              placeholder="Phone Number"
            > -->
            <vue-tel-input
              v-model="user.phone"
              placeholder="Loyalty/Phone Number"
            ></vue-tel-input>
          </div>
          <div
            class="form-group"
            style="position:relative"
          >

            <input
              class="form-control"
              placeholder="Password"
              v-model="user.password"
              :type="passwordFieldType"
            >
            <span
              id="show_hide"
              @click="switchVisibility"
            >
              <i
                v-if="passwordFieldType == 'password'"
                class="fa fa-eye"
              ></i>
              <i
                v-if="passwordFieldType == 'text'"
                class="fa fa-eye-slash"
              ></i>
            </span>
          </div>
          <a
            class="forgot "
            style="cursor:pointer"
            data-toggle='modal'
            data-target="#forgot"
          >Forgot Password?</a>
          <button class="msq-button mt-3">sign in</button>
        </form>
      </div>
    </div>

    <!-- Forgot Modal -->
    <div
      class="modal fade"
      id="forgot"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Forgot Password</h5>
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
            <form @submit.prevent="handleForgotPassword">
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  v-model="forgot_email"
                  placeholder="Enter email address"
                />

              </div>
              <div class="form-group">
                <button
                  type="submit"
                  class="msq-button mt-3"
                >Submit</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import * as $ from "jquery";
export default {
  name: 'Login',
  components: {

  },
  data () {
    return {
      passwordFieldType: 'password',
      forgot_email: '',
      user: {
        phone: '',
        password: ''
      }
    }
  },

  mounted () {

  },
  methods: {
    handleLogin () {
      this.user.phone = this.user.phone.replace(/\s/g, '');
      var req = {
        what: "login",
        data: this.user,
      };
      this.$request
        .makePostRequest(req)
        .then(response => {
          this.$store.dispatch('setLoggedIn', true)
          this.$store.dispatch('user', response.data.data[0])
            .then(() => {
              this.fetchCart();
              this.$swal.fire("Success", `Hi ${response.data.data[0].firstname}, Welcome to Marketsquare`, "success");
              this.user = {};

            })


        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error.message, "error");
        });
    },
    fetchCart () {
      let req = {
        what: "getcart",
        showLoader: true,
        params: {
          userid: this.$store.getters.user.id
        }
      }
      this.$request.makeGetRequest(req)
        .then(res => {
          if (res.type == 'getcart') {
            console.log(res.data.data)
            this.$store.dispatch('storesCart', res.data.data)
              .then(() => {
                this.$router.go(-1);
              })

          }

        })
        .catch(error => {
          this.$swal.fire("Error", error, "error");
          console.log(error)
        });
    },
    handleForgotPassword () {
      let req = {
        what: "forgotpassword",
        data: {
          emailaddress: this.forgot_email
        }
      }
      this.$request
        .makePostRequest(req)
        .then(response => {
          console.log(response)
          $(".modal").modal("hide");
          this.$swal.fire("Success", response.message, "success");
          this.forgot_email = '';

        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Oops", error, "error");
        });
    },
    switchVisibility () {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
  }
}

</script>
<style scoped>
#show_hide {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 18px;
}
</style>

