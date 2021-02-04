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
                        v-model="contact.name"
                        placeholder=" "
                        required
                      >
                      <label class="anim">Name</label>
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
                        v-model="contact.location"
                      >
                      <label class="anim">Location</label>
                      <span class="err_msg">{{ errors[0] }}</span>
                    </validation-provider>

                  </div>
                  <div class="form-group col-md-6">
                    <validation-provider
                      rules="required:length:11"
                      v-slot="{ errors }"
                    >
                      <vue-tel-input v-model="contact.phone"></vue-tel-input>
                      <span class="err_msg">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group col-md-6">
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
                </div>
                <div class="form-group">
                  <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <textarea
                      name=""
                      rows="10"
                      v-model="contact.story"
                      placeholder="Message body"
                    ></textarea>
                    <span class="err_msg">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <button
                  type="submit"
                  class=" msq-button"
                >Submit</button>
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
  name: 'ValentineForm',
  components: {
    TopNav, Footer
  },
  data () {
    return {
      selected: '',
      states: States.states,
      cities: [],
      areas: [],
      contact: {
        name: "",
        location: "",
        phone: "",
        story: "",
        email: "",
        store_id: null
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true)
  },
  methods: {
    sendMessage () {
      this.contact.phone = this.contact.phone.replace(/\s/g, '');
      this.store_id = this.$store.getters.store.id;
      var req = {
        what: "valentineQuestionnaire",
        data: this.contact,
      };
      this.$request
        .makePostRequest(req)
        .then(response => {
          this.$swal.fire("Success", response.data.message, "success");
          this.contact.name = '';
          this.contact.location = '';
          this.contact.phone = "";
          this.contact.story = "";
          this.contact.email = "";
          this.store_id = null;
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

