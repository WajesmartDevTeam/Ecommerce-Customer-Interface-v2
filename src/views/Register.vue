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
        <a href="/register">Already have an account? <span>Sign In</span></a>
      </div>
      <div class="auth-form">
        <h5 class="title mb-2">Create an account</h5>
        <p class="subtitle mb-5">
          Please note that you should register with your phone number connected to loyalty account if you are an existing loyalty customer
        </p>
        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="First Name"
              >
            </div>
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Last Name"
              >
            </div>
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Email Address"
            >
          </div>
          <div class="form-group">
            <!-- <input
              type="text"
              class="form-control"
              placeholder="Phone Number"
            > -->
            <vue-tel-input></vue-tel-input>
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
            >
          </div>
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
            />
            <label class="form-check-label">I have read and agreed to the
              <span @click="$router.push('terms')">terms of service</span> and <span @click="$router.push('terms')"> conditions</span> of MarketSquare
            </label>
          </div>
          <button class="msq-button mt-3">sign up</button>
        </form>
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
    }
  },

}

</script>

