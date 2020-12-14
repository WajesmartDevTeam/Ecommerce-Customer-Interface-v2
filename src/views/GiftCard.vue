<template>
  <div>
    <TopNav></TopNav>
    <div class=" page">
      <div class="container">

        <div class="content">

          <div class="gift-group container bg-white my-5">

            <div class="row  mt-4 py-4 px-4">
              <div
                v-for="(row, index) in cards"
                v-bind:key="index"
                class="col-sm-6 col-md-4 col-lg-3 p-1"
              >
                <div
                  @click="card=row; buycard=true;"
                  class="giftcard p-3"
                  data-target="#giftcard"
                  data-toggle="modal"
                >
                  <div class="handle text-center">
                    <i class="sprite sprite-handle-dark"></i>
                    <i class="sprite sprite-handle-white"></i>
                  </div>
                  <div class="text">
                    <h5 class="title">{{row.cardname}}</h5>
                    <p class="price">₦{{formatPrice(row.amount)}}</p>

                  </div>
                  <div class="gift-image pt-5">
                    <img
                      src="../assets/img/gift.png"
                      alt=""
                    >
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <!-- Buy Modal -->
      <div
        v-if="buycard"
        class="modal fade"
        id="giftcard"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5>Purchase Gift card</h5>
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
              <div class="row">
                <div class="col-4 border-right">
                  <div class="giftcard p-3">
                    <div class="handle">
                      <i class="sprite sprite-handle-dark"></i>
                      <i class="sprite sprite-handle-white"></i>
                    </div>
                    <div class="text">
                      <h5 class="title">{{card.cardname}}</h5>
                      <p class="price">₦{{formatPrice(card.amount)}}</p>

                    </div>
                    <div class="gift-image pt-5">
                      <img
                        src="../assets/img/gift.png"
                        alt=""
                      >
                    </div>

                  </div>
                </div>
                <div class="col-8">
                  <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent='handleSubmit(paygiftcard)'>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <validation-provider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="text"
                              class="form-control"
                              id="inputEmail4"
                              v-model="gifter.firstname"
                              placeholder=" "
                            >
                            <label class="anim">Gifter's First Name</label>
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
                              v-model="gifter.lastname"
                              placeholder=" "
                              id="inputPassword4"
                            >
                            <label class="anim">Gifter's Last Name</label>
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
                            v-model="gifter.email"
                            type="email"
                            class="form-control"
                            placeholder=" "
                          >
                          <label class="anim">Gifter's Email Address</label>
                          <span class="err_msg">{{ errors[0] }}</span>
                        </validation-provider>
                      </div>
                      <div class="form-group">
                        <validation-provider
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <vue-tel-input
                            v-model="gifter.phone"
                            placeholder="Gifter's Phone Number"
                          ></vue-tel-input>
                          <span class="err_msg">{{ errors[0] }}</span>
                        </validation-provider>
                      </div>
                      <div class="form-group">
                        <validation-provider
                          rules="required|email"
                          v-slot="{ errors }"
                        >
                          <input
                            type="email"
                            v-model="recipient.customeremail"
                            class="form-control"
                            placeholder=" "
                          >
                          <label class="anim">Recipient's Email Address</label>
                          <span class="err_msg">{{ errors[0] }}</span>
                        </validation-provider>
                      </div>
                      <div class="form-group">
                        <validation-provider
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <vue-tel-input
                            v-model="recipient.customerphone"
                            placeholder="Recipient's Phone Number"
                          ></vue-tel-input>
                          <span class="err_msg">{{ errors[0] }}</span>
                        </validation-provider>
                      </div>
                      <button
                        type="submit"
                        class=" msq-button"
                      >Buy</button>
                    </form>
                  </ValidationObserver>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import * as $ from "jquery";
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'GiftCard',
  components: {
    TopNav, Footer
  },
  data () {
    return {
      loader: '',
      showSearch: false,
      buycard: false,
      cards: [],
      card: {},
      recipient: {
        serviceid: "351817683",
        customerphone: "",
        serialnumber: "",
        amount: "",
        customeremail: "",
        reference: ""
      },
      gifter: {
        firstname: "",
        lastname: "",
        email: "",
        phone: ""
      },

    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', false);
    this.loader = this.$loading.show();
  },
  mounted () {
    let rave = document.createElement("script");
    rave.setAttribute(
      "src",
      // "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js"
      "https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"
    );
    document.head.appendChild(rave);
    this.fetchCards()
  },
  methods: {
    fetchCards () {
      let req = {
        what: "giftcards",
        showLoader: false,
        params: {
          serviceid: 351817683
        }
      }
      this.$request.makeGetRequest(req)
        .then(response => {
          console.log(response.data.data);
          this.cards = response.data.data;
          this.loader.hide()
        })
        .catch(error => {

          console.log(error)
        });
    },
    paygiftcard () {
      console.log(this.recipient)
      // live
      // let PBFKey = "FLWPUBK-f079ea84da7aac9ca312a10668f88c44-X";

      // test
      // let PBFKey = "FLWPUBK-00fd26c8dc92b4e1663550c4ba7532aa-X"; 
      let PBFKey = "FLWPUBK-f079ea84da7aac9ca312a10668f88c44-X";
      let transid = `${this.card.id}${Math.floor(Date.now())}`;
      let vm = this;

      var x = getpaidSetup({
        PBFPubKey: PBFKey,
        customer_email: this.gifter.email,
        customer_firstname: this.gifter.firstname,
        customer_lastname: this.gifter.lastname,
        custom_description: "Payment for gift card",
        custom_logo: "../assets/img/logo.png",
        custom_title: "Market Square",
        amount: this.card.amount,
        customer_phone: this.gifter.phone,
        country: "NG",
        currency: "NGN",
        txref: `giftcard-${transid}`,
        onclose: function () { },
        callback: function (response) {
          var flw_ref = response.tx.flwRef; // collect flwRef returned and pass to a 					server page to complete status check.
          let txref = response.tx.txRef;
          let status = response.tx.status;
          let amount = response.tx.amount;
          let chargeResponse = response.tx.chargeResponseCode;
          if (chargeResponse == "00" || chargeResponse == "0") {
            if (status === "successful" && vm.card.amount == amount) {
              vm.recipient.serialnumber = vm.card.serialnumber;
              vm.recipient.amount = vm.card.amount;
              vm.recipient.reference = txref;
              vm.purchasegiftcard(txref);
              x.close(); // use this to close the modal immediately after payment.
            }

            //Add your success page here
          } else {
            x.close();
            this.$toast.error({
              title: "Error",
              message: "An error occured, Pls try again.",
              delay: 0
            });
            //Add your failure page here
          }
        }
      });
    },
    purchasegiftcard (txref) {

      var req = {
        what: "purchasegiftcard",
        key: txref,
        data: this.recipient,
      };
      this.$request
        .makePostRequest(req)
        .then(response => {
          console.log(response)
          this.$swal.fire("Success", `You have successfully bought this gift card.`, "success");
          $(".modal").modal("hide");
          this.fetchCards();
        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error, "error");
        });

    },
    formatPrice (price) {
      var str = price.toString().split(".");
      if (str[0].length >= 3) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      }
      if (!str[1]) {
        str[1] = "00";
      }
      return str.join(".");
    },

  }
}

</script>

