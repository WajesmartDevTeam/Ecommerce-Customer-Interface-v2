<template>
  <div
    id="register"
    class="row auth page"
  >
    <div class="col-md-4 img-box p-3 pl-5">
      <a href="/home">
        <img
          src="../assets/img/logo_mobile.png"
          alt=""
        >
      </a>
    </div>
    <div class="col-md-8 field p-3">
      <div class="option text-right">
        <a href="/login">Already have an account? <span>Sign In</span></a>
      </div>
      <div class="auth-form">
        <h5 class="title mb-2">Create an account</h5>
        <p class="subtitle mb-5">
          Please note that you should register with your phone number connected to loyalty account if you are an existing loyalty customer
        </p>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent='handleSubmit(handleRegister)'>
            <div class="form-row">
              <div class="form-group col-md-12">
                <validation-provider
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select
                    class="form-control"
                    name="title"
                    v-model="user.title"
                  >
                    <option
                      value=""
                      selected
                      hidden
                    >Title</option>
                    <option>Miss</option>
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                  </select>
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
                    placeholder="First Name"
                    v-model="user.firstname"
                  >
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
                    placeholder="Last Name"
                    v-model="user.lastname"
                  >
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
                  type="email"
                  class="form-control"
                  placeholder="Email Address"
                  v-model="user.email"
                >
                <span class="err_msg">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider
                rules="required"
                v-slot="{ errors }"
              >
                <vue-tel-input v-model="user.phone"></vue-tel-input>
                <span class="err_msg">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <validation-provider
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select
                    class="form-control"
                    name="title"
                    v-model="user.gender"
                  >
                    <option
                      value=""
                      selected
                      hidden
                    >Gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>

                  </select>
                  <span class="err_msg">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group col-md-4">
                <validation-provider
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select
                    class="form-control"
                    @change="getDob()"
                    v-model="month"
                  >
                    <option
                      value
                      selected
                      hidden
                    >Birth Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  <span class="err_msg">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group col-md-4">
                <validation-provider
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select
                    class="form-control"
                    @change="getDob()"
                    v-model="day"
                  >
                    <option
                      value
                      selected
                      hidden
                    >Birth Day</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                  <span class="err_msg">{{ errors[0] }}</span>
                </validation-provider>
              </div>
            </div>
            <div
              class="form-group"
              style="position: relative;"
            >
              <validation-provider
                name="password"
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
            <div class="form-group">
              <validation-provider
                name="confirm"
                rules="required|confirmedBy:@password"
                v-slot="
                {
                errors
                }"
              >
                <input
                  type="password"
                  v-model="confirmpassword"
                  class="form-control"
                  placeholder="Confirm Password"
                >
                <span class="err_msg">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group form-check">

              <input
                type="checkbox"
                class="form-check-input"
                v-model="user.subscribe"
              />
              <label class="form-check-label">
                I want to receive Newsletters with the best deals and offers.
              </label>
            </div>
            <div class="form-group form-check">
              <validation-provider
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="checkbox"
                  class="form-check-input"
                  v-model="terms"
                />

                <label class="form-check-label">I have read and agreed to the
                  <span
                    style="cursor:pointer;"
                    @click="$router.push('terms')"
                  >terms and conditions</span> and <span
                    style="cursor:pointer;"
                    @click="$router.push('privacy')"
                  > Privacy Policy</span> of MarketSquare
                </label>
                <span class="err_msg">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <button class="msq-button mt-3">sign up</button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'Register',
  components: {

  },
  data () {
    return {
      month: "",
      day: '',
      terms: '',
      confirmpassword: '',
      passwordFieldType: 'password',
      user: {
        title: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        subscribe: false,
        gender: "",
        dob: ""
      },
    }
  },

  methods: {
    getDob () {
      let month = this.month !== "" ? this.month : "00";
      let day = this.day !== "" ? this.day : "00";
      this.user.dob = `9999-${month}-${day}`;
    },
    handleRegister () {
      if (this.terms) {
        this.user.phone = this.user.phone.replace(/\s/g, '');
        var req = {
          what: "register",
          data: this.user,
        };
        this.$request
          .makePostRequest(req)
          .then(response => {
            this.$swal.fire("Success", response.data.message, "success");
            this.user = {};
            this.$router.push('login')
          })
          .catch(error => {
            console.log(error)
            this.$swal.fire("Error", error, "error");
          });
      }
      else {
        this.$swal.fire("Warning", 'Please Accept Our Terms and Conditions', "warning");
      }
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

