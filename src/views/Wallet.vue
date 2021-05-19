<template>
  <div>
    <TopNav></TopNav>
    <div class="checkout page">
      <div class="">
        <div class="banner checkout-banner">
          <div class="container">
            <h4 class="title">Wallet</h4>
          </div>
        </div>
        <div class="content container-fluid">
          <div class="row ">
            <div class="col-lg-12 col-md-12">
              <div class="card">
                <div class="card-header card-header-danger">
                  <div class="pull-left">
                    <h4 class="card-title"><div>Transaction History</div></h4>
                  </div>
                  <div class="pull-right">
                    <h4 class="card-title"><div class="btn btn-success" data-toggle="modal" data-target="#modal_aside_right"> Make Transaction</div></h4>
                  </div>

                  <div class="pull-right">
                    <h4 class="card-title"><div class="btn btn-info wallet_pin_btn" data-toggle="modal" data-target="#modal_aside_right_password"> Set Wallet Pin</div></h4>
                  </div>

                </div>
                <div class="card-body">
                  <vue-table-dynamic :params="params"></vue-table-dynamic>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="modal_aside_right" class="modal fixed-left fade" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-dialog-aside" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Make Transaction</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div id="summary">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title title ">Your Wallet</h5>
                      <table class="table">
                        <tbody class="body2">
                        <tr>
                          <td>Balance OnHold</td>
                          <td class="float-right ">₦{{user.balanace_onHold}}</td>
                        </tr>

                        <tr>
                          <td>Available Balance</td>
                          <td class="float-right ">₦{{user.available_balance}}</td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                          <th>Total</th>
                          <th class="float-right total">₦{{ user.wallet_balance}}</th>
                        </tr>
                        </tfoot>
                      </table>

                      <div class="form-row px-2">
                        <input
                            type="text"
                            class="form-control col-12"
                            min="1"
                            placeholder="Enter Wallet Top Up Ammount"
                            v-model="transaction.balance"
                        >
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="form-group form-check pay mt-3">
                      <input
                          id='voucherCheck'
                          type="checkbox"
                          class="form-check-input"
                          v-model="payment.voucher"
                          @change="paymethod($event, 'voucher')"
                      />
                      <label class="form-check-label">Pay with Giftcard
                        <br>
                        <span >Got a voucher or Gift card?</span>
                      </label>
                      <small
                          class="ml-2"
                          id="statusvoucher"
                          style="color:red;font-size:11px"
                      ></small>
                    </div>
                    <div
                        v-if="payment.voucher"
                        class="form-group"
                    >
                      <div class="form-row px-2">
                        <input
                            type="text"
                            class="form-control col-7"
                            placeholder="Enter serial no."
                            v-model="serialnumber"
                        >
                        <button
                            @click.prevent="verifyMethod('voucher')"
                            class="btn mt-1 ml-1 col-4"
                        >Verify</button>
                      </div>
                    </div>
                    <div class="form-group form-check pay mt-3">
                      <input
                          type="checkbox"
                          class="form-check-input"
                          @change="paymethod($event, 'card')"
                      />
                      <label class="form-check-label">Pay with - USSD, Bank Transfer or Card (Pay with Flutterwave)
                        <small
                            class="ml-2"
                            id="balance"
                            style="color:red;font-size:11px"
                        ></small>
                        <br>
                        <span style="color:black">Pay with Flutterwave</span>
                      </label>
                    </div>

                    <div class="form-group form-check agree">
                      <validation-provider
                          rules="required"
                          v-slot="{ errors }"
                      >
                        <input
                            type="checkbox"
                            class="form-check-input"
                            v-model="clearance"
                        >
                        <label
                            class="form-check-label"
                            for="exampleCheck1"
                        >I accept to the <a
                            href="/terms"
                            style="color:#000066; font-weight:bold;"
                        >terms and conditions</a> of marketsquare</label>
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <button type="submit" @click.prevent="creditWallet">Proceed to Payment</button>
                  </div>
                </div>
              </div>
            </div>
          </div> <!-- modal-bialog .// -->
        </div>

        <div id="modal_aside_right_password" class="modal fixed-left fade" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-dialog-aside" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Set Wallet Pin</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" style="margin-top: 10%">
                <p class="text-center"><small>Complete the form to set a new wallet pin;</small></p>
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent='handleSubmit(setWalletPin)'>

                    <div  class="form-group" style="position:relative">
                      <validation-provider rules="required"  v-slot="{ errors }">
                        <label>Enter current password</label>
                        <input class="form-control" placeholder="Enter your current password" v-model="set_pin.password" type="password" >
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>

                    <div  class="form-group" style="position:relative">
                      <validation-provider rules="required"  v-slot="{ errors }">
                        <label>Enter new pin</label>
                        <input class="form-control" placeholder="Enter New Pin" v-model="set_pin.pin1" type="password" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
 minlength="4" maxlength="6" onfocus="this.placeholder = 'Enter 4 to 6 digits number'" onblur="this.placeholder = 'Enter New Pin'" v-on:keyup="set_pin.pin1 != set_pin.pin2 ? err_match = 'Enter the same Pin in confirm pin' : err_match = ''">
                        <span class="err_msg">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>

                     <div  class="form-group" style="position:relative">
                      <validation-provider rules="required"  v-slot="{ errors }">
                        <label>Confirm new pin</label>
                        <input class="form-control" label="" placeholder="Confirm your Pin" v-model="set_pin.pin2" type="password" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
 minlength="4" maxlength="6"  v-on:keyup="set_pin.pin1 != set_pin.pin2 ? err_match = 'The confirm does not match the Pin' : err_match = ''">

 
                        <span class="err_msg">{{ errors[0] }} {{err_match}}</span>
                      </validation-provider>
                    </div>

                    <button class="msq-button mt-3">Set Wallet Pin</button>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </div> <!-- modal-bialog .// -->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import * as $ from "jquery";
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import VueTableDynamic from 'vue-table-dynamic'
export default {
  name: 'Wallet',
  components: {
    TopNav, Footer, VueTableDynamic
  },
  data () {
    return {
      err_match:"",
      set_pin: {

      },
      my_permissions: {},
      balance: "",
      method: "",
      giftcard_amount: '',
      serialnumber: "",
      voucher: 0,
      payment : {
        voucher: false,
        loyalty: false,
        card: false,
      },
      loading: false,
      d_errors: null,
      clearance: false,
      perpage: 10,
      transaction: {
        balance: 0,
        user_id: this.$store.getters.user.id,
        type: "CREDIT",
        payment: []
      },
      walletTransactions: [],
      page_url: null,
      pagination: {},
      params: {
        data: [
        ["Sn", 'Id', 'Order Number', 'Amount Before', 'Amount' , 'Amount After','Channel', 'Remarks', 'Date'],
        ],
        header: 'row',
        stripe: true,
        enableSearch: true,
        sort: [0, 1, 3, 4, 5, 6, 7, 8, 9],
        pagination: true,
        pageSize: 10,
        pageSizes: [10],
        columnWidth: [{column: 0, width: '5%'}, {column: 1, width: '5%'}, {column: 2, width: '13%'}, {column: 4, width: '10%'}],
      },
    };
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  created () {
    this.fetchWalletTransactions();
    let rave = document.createElement("script");
    rave.setAttribute(
      "src",
      "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js"
      // "https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"
    );
    document.head.appendChild(rave);
  },
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = 'Your Wallet Page';
        }
    },
  },

  methods: {
    fetchWalletTransactions () {
      let req = {
        what: "wallet",
        showLoader: false,
        params: {
          user_id: this.user.id
        }
      }
      this.$request.makeGetRequest(req)
        .then(res => {
          let object = [];
          
          this.params.headings =  ['sn', 'id', 'order_number', 'amount_before', 'amount' , 'amount_after','channel', 'remarks', 'date'];
          this.params.counter = 0;

          this.walletTransactions = res.data.data;
          this.walletTransactions.forEach(val => {

            this.params.headings.forEach((key) => {
                object.push(val[key]);                
                this.params.headings.sn = this.params.counter++;
            });

            this.params.data.push(object);

            object = [];

          });
        })
        .catch(err => console.log(err));
    },

    makePagination (meta, links) {
      let pagination = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        next_page_url: links.next,
        prev_page_url: links.prev
      };
      this.pagination = pagination;
    },

    formatUnique (n) {
      return Number(n) > 9 ? "" + n : "0" + n;
    },

    creditWallet () {
      this.transaction.unique_code = this.formatUnique(this.user.id) + Math.floor(10000 + Math.random() * 90000);
      let isValidate = [];
      let field = [];

      if (this.payment.loyalty) {
        if (this.transaction.payment.method.toLowerCase().includes("loyalty") == false) {

          this.transaction.payment.method += " loyalty"
        }
      }
      else {
        if (this.transaction.payment.method.toLowerCase().includes("loyalty")) {

          this.transaction.payment.method = this.transaction.payment.method.replace(' loyalty', '')
        }

      }
      if (this.payment.voucher) {
        if (this.transaction.payment.method.toLowerCase().includes("gift") == false) {
          this.transaction.payment.method += " gift"
        }
      }
      else {
        if (this.transaction.payment.method.toLowerCase().includes("gift")) {
          this.transaction.payment.method = this.transaction.payment.method.replace(' gift', '')
        }

      }
      if (this.payment.card) {
        if (this.transaction.payment.method.toLowerCase().includes("card") == false) {
          this.transaction.payment.method += " card"
        }
      }
      else {
        if (this.transaction.payment.method.toLowerCase().includes("card")) {

          this.transaction.payment.method = this.transaction.payment.method.replace(' card', '')
        }
      }

      if (this.transaction.payment.method == '') {
        isValidate.push(false)
        field.push('payment method')
      }
      if (!isValidate.includes(false)) {

        console.log(this.transaction);
        this.transaction.amount = this.transaction.balance;
        if (this.clearance) {
          let req = {
            what: "creditWallet",
            showLoader: true,
            data: this.transaction
          }
          this.$request
            .makePostRequest(req)
            .then(res => {
              if (this.transaction.payment.method.includes("gift")) {
                this.payGift(res.data.data)
              }
              else {
                this.payCard(res.data.data)
              }
              this.fetchWalletTransactions();
              $('#modal_aside_right').modal('hide');
            })
            .catch(error => {
              console.log(error);
              this.$swal.fire("Error", error.message, "error");
            });
        }
        else {
          this.$swal.fire("Notice", 'You have not accepted our Terms & Conditions', "warning");
        }
      }
      else {
        this.$swal.fire("Error", `Kindly select your preferred ${field.toString()}`, "error");
      }
    },

    paymethod ($event, meth) {
      if ($event.target.checked) {

        if (meth == 'voucher') {
          this.payment.voucher = true;
        }
        if (meth == 'loyalty') {
          this.payment.loyalty = true;
        }
        if (meth == 'card') {
          this.payment.card = true;
          this.transaction.payment.method = "card";
        }
      }
      else {
        if (meth == 'voucher') {
          this.payment.voucher = false;
          this.balance = ""
          document.getElementById('statusvoucher').textContent = ''
          document.getElementById('balance').textContent = '';
          this.serialnumber = ''
          console.log(this.balance)
        }
        if (meth == 'loyalty') {
          this.payment.loyalty = false;
          this.balance = ""
        }
        if (meth == 'card') {
          this.payment.card = false;
          this.balance = this.transaction.balance
        }
      }
    },

    verifyMethod (method) {
      let req = {
        what: "verifycard",
        showLoader: false,
        data: {
          serviceid: "351817683",
          serialnumber: this.serialnumber
        }
      }
      this.$request
        .makePostRequest(req)
        .then(res => {
          console.log(res)

          if (method == 'voucher') {
            this.payment.voucher = true;
            this.giftcard_amount = res.data.data
            document.getElementById('statusvoucher').textContent = '₦' + this.giftcard_amount;
            this.balance = Number(this.transaction.amount) - Number(res.data.data)
            document.getElementById('balance').textContent = 'Balance= ₦' + this.balance;
          }
        })
        .catch(error => {
          if (method == 'voucher') {
            document.getElementById('statusvoucher').textContent = error;
            this.payment.voucher = false;
          }
          // else {
          //   document.getElementById('statusloyalty').textContent = res;
          //   this.payment.loyalty = false;
          // }
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

    payCard (transaction, giftref) {
      // live
      // let PBFKey = "FLWPUBK-f079ea84da7aac9ca312a10668f88c44-X";

      // test
      let PBFKey = "FLWPUBK-00fd26c8dc92b4e1663550c4ba7532aa-X";
      let transid = giftref ? giftref : `${this.user.id}${Math.floor(Date.now())}`;
      let vm = this;
      let cardamount;
      if (this.balance !== "" && Number(this.balance) > 0) {
        cardamount = this.balance

      }
      else {
        cardamount = this.transaction.balance
      }
        getpaidSetup({

        PBFPubKey: PBFKey,
        customer_email: this.user.email,
        customer_firstname: this.user.firstname,
        customer_lastname: this.user.lastname,
        custom_description: "Payment for transaction made",
        custom_logo: "https//:marketsquareng.com/assets/img/logo_mobile.png",
        custom_title: "Market Square",
        amount: cardamount,
        customer_phone: this.user.phone,
        country: "NG",
        currency: "NGN",
        txref: this.transaction.unique_code,
        onclose: function () { },
        callback: function (response) {
          var flw_ref = response.tx.flwRef; // collect flwRef returned and pass to a 					server page to complete status check.
          let txref = response.tx.txRef;
          let status = response.tx.status;
          let amount = response.tx.amount;
          let chargeResponse = response.tx.chargeResponseCode;

          if (chargeResponse == "00" || chargeResponse == "0") {
            let req;
            
              req = {
                what: "verifywalletcredit",
                showLoader: true,
                data: {
                  txref: txref,
                  pref: flw_ref,
                  transaction_id: transaction.id,
                  user_id: vm.user.id,
                  status: status,
                  amount: amount
                }
              }
            
            vm.$request
              .makePostRequest(req)
              .then(res => {
                console.log(res)
                vm.$store.dispatch('user', res.data.data.user)
                vm.fetchWalletTransactions()
                vm.$swal.fire({
                  title: 'Success!',
                  html: 'Wallet TopUp Successful!!!',
                  timer: 5000,
                  onBeforeOpen: () => {
                    vm.$swal.showLoading()
                  },
                  onClose: () => {
                    clearInterval(setInterval(() => {
                      const content = vm.$swal.getContent()
                      if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                          b.textContent = vm.$swal.getTimerLeft()
                        }
                      }
                    }, 100))
                  }

                })
              })
              .catch(error => {
                console.log(error);
                vm.$swal.fire("Error", error, "error");
              });

          } else {
            //Add your failure page here
            vm.$swal.fire({
              icon: 'error',
              type: "error",
              title: 'Error',
              text: 'Payment Failed!!!',
            })
          }
        }
      });
    },
    payGift (transaction) {
      let vm = this;
      let req = {
        what: "redeemgiftwallet",
        showLoader: true,
        data: {
          serviceid: "351817683",
          serialnumber: this.serialnumber,
          phonenumber: this.user.phone.replace(/\s/g, ''),
          amount: this.giftcard_amount,
          order_id: transaction.id
        }
      }
      this.$request
        .makePostRequest(req)
        .then(res => {
          console.log(res)
          if (res.type == "redeemgift") {
            this.$swal.fire("Success", "Giftcard Redeemed Successfully", "success");
            if (this.balance !== "" && this.balance > 0) {
              this.payCard(transaction, res.data)
            }else {
              this.$store.dispatch('user', res.data)
            }
          }
        })
        .catch(error => {
          console.log(error);
          this.$swal.fire("Error", error, "error");
        });
    },

    setWalletPin (){
      this.set_pin.phone = this.$store.getters.user.phone;

      if(this.set_pin.password != undefined && this.set_pin.pin1 != undefined && (this.set_pin.pin1 == this.set_pin.pin2)){
        var req = {
          what: "newwalletpin",
        showLoader: true,
          data: this.set_pin,
        };
        this.$request
        .makePostRequest(req)
        .then(response => {
          console.log(response)
          this.$swal.fire("Success", "Pin was created successfully", "success");
          this.set_pin = {};
        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error, "error");
        });
      }
      else{
          this.$swal.fire("Error", "Enter the form correctly to set waller pin", "error");
      }



    },

  }
};
</script>
<style scoped>
select.form-control {
  height: 36px !important;
}

.modal .modal-dialog-aside{
  width: 350px; max-width:80%; height: 100%; margin:0;transform: translate(0); transition: transform .2s;
}
.modal .modal-dialog-aside .modal-content{  height: inherit; border:0; border-radius: 0;}
.modal .modal-dialog-aside .modal-content .modal-body{ overflow-y: auto }
.modal.fixed-left .modal-dialog-aside{ margin-left:auto;  transform: translateX(100%); }
.modal.fixed-right .modal-dialog-aside{ margin-right:auto; transform: translateX(-100%); }
.modal.show .modal-dialog-aside{ transform: translateX(0);  }
.wallet_pin_btn{margin-right:10px;}
</style>
