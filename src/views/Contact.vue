<template>
  <div>
    <TopNav></TopNav>
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
            <form @submit.prevent="sendMessage">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="contact.firstname"
                    placeholder="First Name"
                    required
                  >
                </div>
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    required
                    v-model="contact.lastname"
                  >
                </div>
              </div>
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email Address"
                  v-model="contact.email"
                >
              </div>
              <div class="form-group">

                <!-- <input
                type="text"
                class="form-control"
                placeholder="Phone Number"
              > -->
                <vue-tel-input v-model="contact.phone"></vue-tel-input>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Subject"
                  v-model="contact.subject"
                >
              </div>
              <div class="form-group">

                <textarea
                  name=""
                  rows="10"
                  v-model="contact.message"
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
    <Footer></Footer>
  </div>
</template>


<script>
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Contact',
  components: {
    TopNav, Footer
  },
  data () {
    return {
      contact: {
        firstname: "",
        lastname: "",
        phone: "",
        message: "",
        email: "",
        subject: ""
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true)
  },
  methods: {
    sendMessage () {
      this.contact.phone = this.contact.phone.replace(/\s/g, '');
      var req = {
        what: "contact",
        data: this.contact,
      };
      this.$request
        .makePostRequest(req)
        .then(response => {
          this.$swal.fire("Success", response.data.message, "success");
          this.contact.firstname = '';
          this.contact.lastname = '';
          this.contact.phone = "";
          this.contact.message = "";
          this.contact.email = "";
          this.contact.subject = "";
        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error.message, "error");
        });
    }
  }
}

</script>

