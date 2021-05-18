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
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(sendMessage)">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <validation-provider
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <input
                        type="text"
                        class="form-control"
                        v-model="contact.firstname"
                        placeholder=" "
                        required
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
                        required
                        v-model="contact.lastname"
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
                      type="email"
                      class="form-control"
                      placeholder=" "
                      v-model="contact.email"
                    >
                    <label class="anim">Email Address</label>
                    <span class="err_msg">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <validation-provider
                    rules="required:length:11"
                    v-slot="{ errors }"
                  >
                    <vue-tel-input v-model="contact.phone"></vue-tel-input>
                    <span class="err_msg">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder=" "
                    v-model="contact.subject"
                  >
                  <label class="anim">Subject</label>
                </div>
                <div class="form-group">
                  <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <textarea
                      name=""
                      rows="10"
                      v-model="contact.message"
                      placeholder="Message body"
                    ></textarea>
                    <span class="err_msg">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <button
                  type="submit"
                  class=" msq-button"
                >Send</button>
              </form>
            </ValidationObserver>
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
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = 'Contact Us';
        }
    },
    selected: function (val) {
      let vm = this;
      vm.contact.state = val
      this.states.forEach(i => {
        if (i.state.name == val) {
          // vm.cities = i.state.locals
          vm.cities = i.state.cities;
        }
      })
    },
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
          location.reload()
        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error, "error");
        });
    }
  }
}

</script>

