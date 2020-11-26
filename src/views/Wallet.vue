<template>
  <div class="container-fluid">
    <div
      v-if="d_errors"
      class="alert alert-danger"
    >
      <p>
        <b>Please correct the following error(s):</b>
      </p>
      <ul>
        <li
          v-for="(value, index) in d_errors"
          v-bind:key="index"
        >{{ value[0] }}</li>
      </ul>
    </div>

    <!-- Table List -->
    <div class="row">
      <div class="col-md-8">
        <div class="content container">
          <div class="row my-5">
            <div class="col-md-8">
              <table class="table table-responsive">
                <thead>
                  <tr>

                    <th scope="col">Product</th>
                    <th scope="col"></th>
                    <th scope="col">Qty</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Total</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, i) in cart"
                    v-bind:key="i"
                  >

                    <td class="">

                      <img
                        v-if="row.product.img_url.includes('https://cdn.marketsquareng.website')"
                        :src="row.product.img_url"
                        alt=""
                        class="img"
                      >
                      <img
                        v-else
                        :src="'https://admin.sundrymarkets.com'+row.product.img_url"
                        alt=""
                        class="img"
                      >

                    </td>
                    <td class="productname">{{row.product.name}}</td>
                    <td>
                      <input
                        v-if="row.product.name.includes('/KG') || row.product.name.includes('/ KG')"
                        oninput="validity.valid||(value='');"
                        :id="i"
                        type="number"
                        min="0.001"
                        step="any"
                        class="number qty"
                        v-model=row.quantity
                        @keypress="restrictChars($event)"
                        @change="inputChange(i, row.product.id)"
                      >

                      <input
                        v-else
                        :id="i"
                        type="number"
                        min="1"
                        step="1"
                        class="number qty"
                        v-model=row.quantity
                        oninput="validity.valid||(value='');"
                        @keypress="restrictChars($event)"
                        @change="inputChange(i, row.product.id)"
                      />
                    </td>
                    <td>₦{{formatPrice(row.unit_price)}} </td>
                    <td>₦{{formatPrice(row.price)}} </td>
                    <td> <img
                        @click="removeItem(row)"
                        style="cursor:pointer;"
                        src="../assets/img/cancel.png"
                        alt=""
                        title="Remove item"
                      ></td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title text-bold">Cart Total</h5>
                  <table class="table table-sm">

                    <tbody>
                      <tr>
                        <td class="float-left">Cart Subtotal</td>
                        <td class="float-right">₦{{formatPrice(cart_subtotal)}}</td>
                      </tr>

                    </tbody>
                  </table>
                  <div class="mt-4 total d-flex  justify-content-between">
                    <p>Total</p>
                    <h5>₦{{formatPrice(cart_total)}}</h5>
                  </div>
                  <button
                    id="continue"
                    @click="$router.push('home')"
                  >Continue Shopping</button>
                  <button
                    v-bind:disabled="cart_total < 3000"
                    v-bind:class="cart_total < 3000? 'disabled': ''"
                    @click="handleCheckout"
                  >Proceed to checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="card">
          <div class="card-header card-header-danger">
            <div class="pull-left">
              <h4 class="card-title">Wallet Transations list</h4>
              <p class="card-category">Here are the list of Wallet Transactions</p>
            </div>
          </div>
          <div class="card-body">
            <v-client-table
              :data="walletTransactions"
              :columns="columns"
              :options="options"
              slots="slots"
            >
              <span
                slot="sn"
                slot-scope="props"
              >{{props.index}}</span>
            </v-client-table>
          </div>
        </div> -->
      </div>
      <div class="col-lg-4 col-md-5">
                  <div id="summary">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title title ">Your Order</h5>
                        <table class="table table-responsive">
                          <tbody class="body1">
                            <tr v-for="row in cart">
                              <td> {{row.quantity}}x {{row.product.name}}</td>
                              <td class="float-right ">₦{{formatPrice(row.price)}}</td>
                            </tr>

                          </tbody>

                        </table>

                        <table class="table">

                          <tbody class="body2">
                            <tr>
                              <td>Subtotal</td>
                              <td class="float-right ">₦{{formatPrice(order.cart_subtotal)}}</td>
                            </tr>

                            <tr>
                              <td>Delivery Fee</td>
                              <td class="float-right ">
                                <span v-if="order.delivery.method=='delivery' && order.delivery.charge !==null">₦{{deliveryFee}}</span>
                                <span v-else-if="order.delivery.method=='delivery' && order.delivery.charge ==null">₦0.00</span>
                                <span v-else>Pickup(Free)</span>
                              </td>
                            </tr>

                          </tbody>
                          <tfoot>
                            <tr>
                              <th>Total</th>
                              <th class="float-right total">₦{{ formatPrice(ordertotal)}}</th>
                            </tr>
                          </tfoot>
                        </table>

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
                      <button type="submit" @click.prevent="handleSubmit(placeOrder)">Proceed to Payment</button>
                    </div>
                  </div>
                </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      perpage: 10,
      order: {},
      user: this.$store.getters.user,
      walletTransactions: [],
      page_url: null,
      pagination: {},
      columns: ["sn",'amount_before', 'amount' , 'amount_after', 'order_number', 'id', 'channel', 'remarks', 'date'],
      options: {

        headings:  {
          sn: "S/N",
          amount_before: "Amount Before",
          amount_after: "Amount After",
          amount: "Transaction Amount",
          order_number: "Order Number",
          id: "Transaction ID",
          channel: "Transaction Channel",
          remarks: "Transaction Remarks",
          date: "Transaction Date and Time"

        },

        sortable:  ["sn",'amount_before', 'amount' , 'amount_after', 'order_number', 'id', 'channel', 'remarks', 'date'],
        filterable: ['amount_before', 'amount' , 'amount_after', 'order_number', 'id', 'channel', 'remarks', 'date'],
        saveState: true,
      }

    };
  },

  watch: {
    loading: function (val) {
      if (val) {
        this.$swal({
          title: "Loading...",
          text: "Please wait",
          imageUrl: "/assets/img/Spinner.gif",
          imageWidth: 200,
          imageHeight: 200,
          showConfirmButton: false,
          allowOutsideClick: false
        });
      } else {
        this.$swal.close();
      }
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

  methods: {
    fetchWalletTransactions () {
      this.loading = true;
      let vm = this;

      fetch(`/wallet`, {
        method: "get"
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            this.loading = false;
            this.$toast.error({
              title: "Error",
              message: "An error occured, Pls try again.",
              delay: 0
            });
          }
          return res.json();
        })
        .then(res => {
          this.walletTransactions = res.data;
          this.loading = false;
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

    creditWallet () {
      if (this.payment.loyalty) {
        if (this.order.payment.method.toLowerCase().includes("loyalty") == false) {

          this.order.payment.method += " loyalty"
        }
      }
      else {
        if (this.order.payment.method.toLowerCase().includes("loyalty")) {

          this.order.payment.method = this.order.payment.method.replace(' loyalty', '')
        }

      }
      if (this.payment.voucher) {
        if (this.order.payment.method.toLowerCase().includes("gift") == false) {
          this.order.payment.method += " gift"
        }
      }
      else {
        if (this.order.payment.method.toLowerCase().includes("gift")) {
          this.order.payment.method = this.order.payment.method.replace(' gift', '')
        }

      }
      if (this.payment.card) {
        if (this.order.payment.method.toLowerCase().includes("card") == false) {
          this.order.payment.method += " card"
        }
      }
      else {
        if (this.order.payment.method.toLowerCase().includes("card")) {

          this.order.payment.method = this.order.payment.method.replace(' card', '')
        }
      }
      if (this.payment.voucher) {
        this.payGift(res.data.data.order)
      }
      else if(this.payment.card) {
        this.payCard(res.data.data.order)
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
            this.balance = Number(this.order.order_total) - Number(res.data.data)
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
    getpaidSetup({

        PBFPubKey: PBFKey,
        customer_email: this.order.customer.email,
        customer_firstname: this.order.customer.firstname,
        customer_lastname: this.order.customer.lastname,
        custom_description: "Payment for order made",
        custom_logo: "https:marketsquareng.com/assets/img/logo_mobile.png",
        custom_title: "Market Square",
        amount: cardamount,
        customer_phone: this.order.customer.phone,
        country: "NG",
        currency: "NGN",
        txref: order.unique_code,
        onclose: function () { },
        callback: function (response) {
          var flw_ref = response.tx.flwRef; // collect flwRef returned and pass to a 					server page to complete status check.
          let txref = response.tx.txRef;
          let status = response.tx.status;
          let amount = response.tx.amount;
          let chargeResponse = response.tx.chargeResponseCode;

          if (chargeResponse == "00" || chargeResponse == "0") {
            let req;
            if (!vm.$store.getters.isLoggedIn) {
              req = {
                what: "verifypayment",
                showLoader: true,
                data: {
                  txref: txref,
                  pref: flw_ref,
                  order_id: order.id,
                  user_id: "",
                  cart_id: "",
                  customer_id: order.customer_id,
                  status: status,
                  amount: amount
                }
              }
            }
            else {
              req = {
                what: "verifypayment",
                showLoader: true,
                data: {
                  txref: txref,
                  pref: flw_ref,
                  order_id: order.id,
                  user_id: order.user_id,
                  cart_id: "",
                  customer_id: "",
                  status: status,
                  amount: amount
                }
              }
            }

            vm.$request
              .makePostRequest(req)
              .then(res => {
                console.log(res)
                vm.$store.dispatch('orderinfo', order);
                vm.$store.dispatch('addToCart', [])
                vm.$swal.fire({
                  title: 'Success!',
                  html: 'Order Payment Successful!!!',
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
                    vm.$router.push('/confirm')
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
    payGift (order) {
      let vm = this;
      let req = {
        what: "redeemgift",
        showLoader: true,
        data: {
          serviceid: "351817683",
          serialnumber: this.serialnumber,
          phonenumber: this.order.customer.phone.replace(/\s/g, ''),
          amount: this.giftcard_amount,
          order_id: order.id
        }
      }
      this.$request
        .makePostRequest(req)
        .then(res => {
          console.log(res)
          if (res.type == "redeemgift") {
            this.$swal.fire("Success", "Giftcard Redeemed Successfully", "success");
            if (this.balance !== "" && this.balance > 0) {
              this.payCard(order, res.data)
            }
            else {
              vm.$store.dispatch('addToCart', [])
              vm.$store.dispatch('orderinfo', order).then(() => {
                vm.$router.push('/confirm')
              })


            }
          }
        })
        .catch(error => {
          console.log(error);
          this.$swal.fire("Error", error, "error");
        });
    },
  }
};
</script>
<style scoped>
select.form-control {
  height: 36px !important;
}
</style>
