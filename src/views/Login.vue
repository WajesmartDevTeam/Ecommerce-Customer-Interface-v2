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
        <form>
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
          <a
            class="forgot "
            href=""
          >Forgot Password?</a>
          <button class="msq-button mt-3">sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'Login',
  components: {

  },
  data () {
    return {
    }
  },

}

</script>

