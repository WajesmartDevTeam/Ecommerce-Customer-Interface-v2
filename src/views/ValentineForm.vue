<template>
  <div>
    <TopNav></TopNav>
    <div class="contact page">
      <div class="banner home-banner">
        <!-- <div class="text">

          <h3 class="banner-title">Get In Touch</h3>
          <p class="banner-subtitle">Drop Us a Message </p>
        </div> -->
        <!-- <div class="banner-image"> -->
          <img
            src="../assets/img/banners/MSQLoveStory.jpg"
            alt=""
            class="img-fluid"
          >
        <!-- </div> -->
      </div>
      <div class="content">
        <div class="container py-5">
          <div class="text-center h2 mr-auto ml-auto mt-6" style="width:70%">Share a special Love Story and <br> stand a chance to win a Gift Voucher </div>
          <hr class="mb-1">       
          <div class="text-center mt-5 mb-3 h5">Contact Details</div>
          <!-- <div class="form-box py-5"> -->
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(sendMessage)">
                <div class="form-row">
                  <div class="form-group col-12">
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
                      <label class="anim">Full Name</label>
                      <span class="err_msg">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group col-6">
                    <validation-provider
                      rules="required:length:11"
                      v-slot="{ errors }"
                    >
                      <vue-tel-input v-model="contact.phone" inputClasses="input" wrapperClasses="input" ></vue-tel-input>
                      <span class="err_msg">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group col-6">
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
                  <div class="form-group col-6">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors }"
                      >

                        <select
                          name=""
                          id=""
                          required
                          class="form-control "
                          v-model="selected"
                        >
                          <option
                            value=""
                            selected
                            hidden
                          >Select State</option>
                          <option
                            v-for="(row, index) in states"
                            v-bind:key='index'
                            :value="row.state.name"
                          >{{row.state.name}}</option>
                        </select>
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="form-group col-6">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors }"
                      >

                        <select
                          name=""
                          id=""
                          required
                          class="form-control "
                          v-model="contact.city"
                        >
                          <option
                            value=""
                            selected
                            hidden
                          >Select City</option>
                          <option
                            v-for="(row, index) in cities"
                            v-bind:key='index'
                            :value="row"
                          >{{row}}</option>
                        </select>
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                </div>
                <div class="row ">
                  <div class="text-center mr-auto ml-auto h5 mt-5 col-12 mb-2" >Your Love Story (Not More Than 300 words)</div>
                <div class="form-group  col-12">
                  <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <textarea
                      name=""
                      rows="10"
                      v-model="contact.story"
                      placeholder="If you realy want to hear about it, the first thing you'll probably want to know is were I was born, and what my idea of love was like ..."
                    ></textarea>
                    <span class="err_msg">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                </div>
                <div class="row">
                <button
                  type="submit"
                  class=" btn btn-info col-4 mr-auto ml-auto"
                >Submit</button>
                <div class="text-center mr-auto ml-auto h5 mt-3 col-12 mb-2" >Winners will be contacted to pick up their gift, <span style="text-decoration:underline"> terms and conditions apply. </span></div>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      <!-- </div> -->
    </div>
    <Footer></Footer>
  </div>
</template>
<style scoped>
hr {
  width: 35%;
  height: 5px !important; 
  margin-left: auto; 
  margin-right: auto;
  background-color:#FF0000;
  border: 0 none;
}

.text-center, .btn{
  font-family: frank;
}

input, select  {
  border: 0 none !important;
}

.vue-tel-input  {
  border: 0 none !important;
}


textarea{
  width: 100%;
  border: 0 none !important;
  padding: 20px;
}

.btn {
  background-color: #FF0000 !important;
  border: 0 none !important;
}
</style>

<script>
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import States from "../states";
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
      contact: {
        name: "",
        location: "",
        phone: "",
        story: "",
        email: "",
        city: "",
        state: "",
        store_id: null
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true)
  },
   watch: {
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
      this.contact.store_id = this.$store.getters.store.id;
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
          this.contact.state = "";
          this.contact.city = "";
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

