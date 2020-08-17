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
      <!-- <div class="option text-right">
        <a href="/register">Have an account? <span>Register</span></a>
      </div> -->
      <div class="auth-form">
        <h5 class="title mb-5">Reset Your Password.</h5>
        <form @submit.prevent='handleReset()'>

          <div
            class="form-group"
            style="position:relative"
          >
            <input
              class="form-control"
              placeholder="Enter new Password"
              v-model="reset.password"
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
          <div
            class="form-group"
            style="position:relative"
          >
            <input
              class="form-control"
              placeholder="Confirm Password"
              type="password"
            >

          </div>

          <button class="msq-button mt-3">Reset Password</button>
        </form>
      </div>
    </div>

  </div>
</template>


<script>
import * as $ from "jquery";
export default {
  name: 'ResetPassword',
  components: {

  },
  data () {
    return {
      passwordFieldType: 'password',
      reset: {
        token: '',
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    let search = window.location.search
    this.reset.token = this.$route.params.key
    this.reset.email = search.substr(search.lastIndexOf('=') + 1)
    this.reset.email = this.reset.email.replace("%40", "@");

  },
  methods: {
    handleReset () {
      var req = {
        what: "resetpassword",
        data: this.reset,
      };
      this.$request
        .makePostRequest(req)
        .then(response => {
          console.log(response)
          this.$swal.fire("Success", `Hi ${response.message}, Welcome to Marketsquare`, "success");
          this.reset = {};
          this.$route.push('/login')

        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error, "error");
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

