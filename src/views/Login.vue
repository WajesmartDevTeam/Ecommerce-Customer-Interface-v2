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
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent='handleSubmit(handleLogin)'>

            <div class="form-group">
              <validation-provider
                rules="required"
                v-slot="{ errors }"
              >
                <vue-tel-input
                  v-model="user.phone"
                  placeholder="Phone Number"
                ></vue-tel-input>
                <span class="err_msg">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div
              class="form-group"
              style="position:relative"
            >
              <validation-provider
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  class="form-control"
                  placeholder="Password"
                  v-model="user.password"
                  :type="passwordFieldType"
                >
                <span class="err_msg">{{ errors[0] }}</span>
              </validation-provider>
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
        </ValidationObserver>
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
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent='handleSubmit(handleForgotPassword)'>
                <div class="form-group">
                  <validation-provider
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <input
                      type="email"
                      class="form-control"
                      v-model="forgot_email"
                      placeholder="Enter email address"
                    />
                    <span class="err_msg">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="msq-button mt-3"
                  >Submit</button>
                </div>
              </form>
            </ValidationObserver>
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

  
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = 'Login Page';
        }
    },
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
          console.log(response.data)
          this.$store.dispatch('user', response.data.message[0])
            .then(() => {
              this.fetchCart();
              this.$swal.fire("Success", `Hi ${response.data.message[0].firstname}, Welcome to Marketsquare`, "success");
              // this.user = {};

            })


        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error, "error");
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
         // this.$swal.fire("Success", response.message, "success");
          this.$swal.fire("Success", "<small>An email is on its way to you. Kindly click on the link in the email and follow the guide to reset your password.</small>", "success");
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

