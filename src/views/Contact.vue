<template>
  <div class="contact page">
    <div id="contact-banner">
      <div class="text">

        <h3 class="banner-title">Get In Touch</h3>
        <p class="banner-subtitle">Drop Us a Message </p>
      </div>
      <div class="banner-image">
        <img
          src="../assets/img/envelope.png"
          alt=""
          class="img-fluid"
        >
      </div>
    </div>
    <div class="content bg-white">
      <div class="container py-5">
        <div class="form-box py-5">
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
                  id="inputPassword4"
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
                type="email"
                class="form-control"
                placeholder="Subject"
              >
            </div>
            <div class="form-group">

              <textarea
                name=""
                id=""
                rows="10"
                placeholder="Message body"
              ></textarea>
            </div>
            <button
              type="submit"
              class=" msq-button"
            >Send</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'Contact',
  components: {

  },
  data () {
    return {
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true)
  },
}

</script>

