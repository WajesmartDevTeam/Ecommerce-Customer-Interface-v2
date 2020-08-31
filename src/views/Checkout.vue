<template>
  <div>
    <TopNav></TopNav>
    <div class="checkout page">
      <div class="">
        <div class="banner checkout-banner">
          <div class="container">
            <h4 class="title">Checkout</h4>
          </div>
        </div>
        <div class="content container">

          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(placeOrder)">
              <div class="row my-5">
                <div class="col-lg-8 col-md-7">
                  <div
                    v-if="$store.getters.isLoggedIn ==false"
                    class="card card-1"
                  >
                    <div class="card-body">
                      <p> Returning customer? <a href="/login">Click here to login</a></p>
                    </div>
                  </div>
                  <!-- personal info -->
                  <div class="card card-2 mt-4">
                    <div class="card-body">
                      <div class="card-title d-flex">
                        <div class="num">1</div>
                        <h5 class="title">Personal Details</h5>
                      </div>
                      <div class="card-text mt-3 mx-md-5">

                        <div class="form-row">
                          <div class="form-group col-md-6">
                            <validation-provider
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <input
                                type="text"
                                class="form-control"
                                placeholder="First Name"
                                v-model="order.customer.firstname"
                              >
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
                                placeholder="Last Name"
                                v-model="order.customer.lastname"
                              >
                              <span class="err_msg">{{ errors[0] }}</span>
                            </validation-provider>
                          </div>
                        </div>
                        <div class="form-group">
                          <validation-provider
                            rules="required:email"
                            v-slot="{ errors }"
                          >
                            <input
                              type="email"
                              name="email"
                              class="form-control"
                              placeholder="Email Address"
                              v-model="order.customer.email"
                            >
                            <span class="err_msg">{{ errors[0] }}</span>
                          </validation-provider>
                        </div>
                        <div class="form-group">
                          <validation-provider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <vue-tel-input v-model="order.customer.phone"></vue-tel-input>
                            <span class="err_msg">{{ errors[0] }}</span>
                          </validation-provider>
                        </div>

                      </div>
                    </div>
                  </div>

                  <!-- delivery address -->
                  <div
                    v-if="order.delivery.method=='delivery'"
                    class="card card-5 mt-4"
                  >
                    <div class="card-body">
                      <div class="card-title d-flex mb-0">
                        <div class="num">2</div>
                        <h5 class="title">Delivery Address</h5>
                      </div>
                      <h6 class="card-subtitle subtitle mb-2 ml-5">Where should your order be delivered</h6>
                      <div class="card-text mt-3 mx-md-5">

                        <div
                          v-if="$store.getters.isLoggedIn"
                          class=""
                        >

                          <div class="address row">

                            <div class="col-sm-6">
                              <div
                                class="address-box "
                                style="cursor:pointer;"
                              >
                                <div style="height:23px">
                                  <span
                                    class="material-icons float-right dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    type="button"
                                    aria-expanded="false"
                                  >
                                    more_horiz
                                  </span>
                                  <div
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    <a
                                      @click.prevent="editAd(default_address)"
                                      class="dropdown-item"
                                      href=""
                                      data-toggle="modal"
                                      data-target="#addressform"
                                    >Edit Address</a>
                                    <a
                                      class="dropdown-item"
                                      href=""
                                      @click.prevent="handleDelete(default_address.id)"
                                    >Remove Address</a>

                                  </div>

                                </div>
                                <div>
                                  <h5>{{default_address.label}}</h5>
                                  <p>{{default_address.address}}, {{default_address.area}}, {{default_address.city}}, {{default_address.state}}.</p>
                                </div>
                              </div>
                            </div>
                            <div class="col-sm-6">
                              <div
                                id="addnew"
                                data-toggle="modal"
                                data-target="#addressform"
                              >
                                <a
                                  data-toggle="modal"
                                  @click.prevent="edit=false"
                                  data-target="#addressform"
                                >
                                  <img
                                    src="../assets/img/addnew.png"
                                    alt=""
                                  >
                                </a>
                                <p>Add new address</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <div class="form-row">
                            <div class="form-group col-12">
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Label( Office, Home)"
                                  v-model="order.delivery.label"
                                >
                                <span class="err_msg">{{ errors[0] }}</span>
                              </validation-provider>
                            </div>
                            <div class="form-group col-12">
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Street Address"
                                  v-model="order.delivery.address"
                                >
                                <span class="err_msg">{{ errors[0] }}</span>
                              </validation-provider>
                            </div>
                          </div>
                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="State"
                                  v-model="order.delivery.state"
                                >
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
                                  placeholder="City"
                                  v-model="order.delivery.city"
                                >
                                <span class="err_msg">{{ errors[0] }}</span>
                              </validation-provider>
                            </div>
                          </div>
                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Area"
                                  v-model="order.delivery.area"
                                >
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
                                  placeholder="Closest Landmark"
                                  v-model="order.delivery.landmark"
                                >
                                <span class="err_msg">{{ errors[0] }}</span>
                              </validation-provider>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- fulfillment info -->
                  <div class="card card-3 mt-4">
                    <div class="card-body">
                      <div class="card-title d-flex">
                        <div class="num">
                          <span v-if="order.delivery.method !=='delivery'">2</span>
                          <span v-else>3</span>
                        </div>
                        <h5 class="title">Fulfillment Information</h5>
                      </div>
                      <div class="card-text my-3 mx-md-5">
                        <p class="mode ml-5">
                          <span v-if="store.mode=='Pickup'">Pickup At:</span>
                          <span v-else>Delivering To:</span>
                        </p>
                        <div class="d-flex fulfillment-address">
                          <img
                            src="../assets/img/store-icon.png"
                            alt=""
                          >
                          <p>{{store.name}}, {{store.address}},<br> {{store.state}}.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!---window -->
                  <div class="card card-4 mt-4">
                    <div class="card-body">
                      <div class="card-title d-flex mb-0">
                        <div class="num">
                          <span v-if="order.delivery.method !=='delivery'">3</span>
                          <span v-else>4</span>
                        </div>
                        <h5 class="title">Fulfillment Window</h5>

                      </div>
                      <h6 class="card-subtitle subtitle mb-2 ml-5">Click on preferred day to view available windows</h6>
                      <div class="card-text my-3 ml-5">
                        <div class="date-box">
                          <p
                            class="window-date wday"
                            v-bind:class="row.window_day=='Today' ? 'active': ''"
                            v-bind:style="row.active== false ? 'color: lightgrey;':''"
                            :id="'day'+index"
                            @click.prevent="listWindows(row, 'day'+index)"
                            v-for="(row, index) in windows"
                            v-bind:key="index"
                          >{{row.window_day}}
                          </p>
                        </div>

                        <div class="row mr-5 mt-3">
                          <div
                            v-if="open_windows.length == 0"
                            class="text-center col-md-12 mt-2"
                            qaz
                          >
                            <p>There is no availability for this date.</p>
                          </div>
                          <div
                            v-else
                            v-for="(row, index) in open_windows"
                            v-bind:key="index"
                            class="col-lg-6 col-md-12 mt-2"
                          >
                            <div
                              @click="setWindow(row, index)"
                              v-bind:class="selected_window ==row.id+''+index?'active':''"
                              class="window"
                            >
                              <div style="height:30px">
                                <img
                                  src="../assets/img/checked.png"
                                  alt=""
                                  class="check float-right"
                                >
                              </div>
                              <div
                                class="d-flex justify-content-between"
                                style="flex-flow:wrap;"
                              >
                                <p class="hour">{{row.starttime+ ' - '+ row.endtime}}</p>
                                <div class="fee">
                                  <h5 v-if="order.delivery.method == 'delivery'">Delivery Fee</h5>
                                  <h5 v-else>Pickup Fee</h5>
                                  <p v-if="order.delivery.method == 'pickup'">FREE</p>
                                  <p v-else>₦{{row.deliveryfee}}</p>
                                </div>
                              </div>
                            </div>

                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 3rd party-->
                  <div class="card card-5 mt-4">
                    <div class="card-body">
                      <div class="card-title d-flex mb-0">
                        <div class="num">
                          <span v-if="order.delivery.method !=='delivery'">4</span>
                          <span v-else>5</span>
                        </div>
                        <h5 class="title">3rd Party Contacts</h5>
                      </div>
                      <h6 class="card-subtitle subtitle mb-2 ml-5">Who should we contact to follow up on this order</h6>
                      <div class="card-text mt-3 mx-md-5">

                        <fieldset>
                          <legend>Order Enquiry Contact*</legend>

                          <div class="form-row">
                            <div class="form-group col-12">
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Full Name"
                                  v-model="order.order_enquiry_contactname"
                                >
                                <span class="err_msg">{{ errors[0] }}</span>
                              </validation-provider>
                            </div>

                          </div>
                          <div class="form-row">
                            <div class="form-group col">
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <vue-tel-input v-model="order.order_enquiry_contactnumber"></vue-tel-input>
                                <span class="err_msg">{{ errors[0] }}</span>
                              </validation-provider>
                            </div>

                          </div>
                          <div class="form-group form-check">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id="exampleCheck1"
                              @change="check($event, 'default')"
                            >
                            <label
                              class="form-check-label"
                              for="exampleCheck1"
                            >Same as personal details</label>
                          </div>
                        </fieldset>
                        <fieldset>
                          <legend>Contact Upon Pickup*</legend>

                          <div class="form-row">
                            <div class="form-group col-12">
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Full Name"
                                  v-model="order.contact_upon_delivery_name"
                                >
                                <span class="err_msg">{{ errors[0] }}</span>
                              </validation-provider>
                            </div>

                          </div>
                          <div class="form-row">
                            <div class="form-group col">
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <vue-tel-input v-model="order.contact_upon_delivery_number"></vue-tel-input>
                                <span class="err_msg">{{ errors[0] }}</span>
                              </validation-provider>
                            </div>

                          </div>
                          <div class="form-group form-check">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              @change="check($event, 'enquiry')"
                            >
                            <label
                              class="form-check-label"
                              for="exampleCheck1"
                            >Same as order enquiry</label>
                          </div>
                        </fieldset>

                        <div class="contact mt-5">
                          <h5 class="title m-0">How should your contacts be reached</h5>
                          <div class="row mt-3">
                            <div
                              @click="order.delivery.contact_method ='call'"
                              v-bind:class="order.delivery.contact_method =='call'?'active':''"
                              class="contact-type col-3"
                            >
                              <div class="icon">
                                <img
                                  src="../assets/img/phone.png"
                                  alt=""
                                >
                              </div>
                              <p>Phone Call</p>
                            </div>
                            <div
                              @click="order.delivery.contact_method = 'whatsapp'"
                              v-bind:class="order.delivery.contact_method =='whatsapp'?'active':''"
                              class="contact-type col-3"
                            >
                              <div class="icon">
                                <img
                                  src="../assets/img/whatsapp.png"
                                  alt=""
                                >
                              </div>
                              <p>Whatsapp</p>
                            </div>
                            <div
                              @click="order.delivery.contact_method ='email'"
                              v-bind:class="order.delivery.contact_method =='email'?'active':''"
                              class="contact-type col-3"
                            >
                              <div class="icon">
                                <img
                                  src="../assets/img/email.png"
                                  alt=""
                                >
                              </div>
                              <p>Email</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- comment -->
                  <div class="card card-6 mt-4">
                    <div class="card-body">
                      <div class="card-title d-flex">
                        <div class="num">
                          <span v-if="order.delivery.method !=='delivery'">5</span>
                          <span v-else>6</span>
                        </div>
                        <h5 class="title">Extra</h5>
                      </div>
                      <div class="card-text mt-3 mx-md-5">

                        <div class="form-group">
                          <textarea
                            v-model="order.comment"
                            name=""
                            placeholder="Add a note/instruction"
                          ></textarea>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-5">
                  <div id="summary">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title title ">Your Order</h5>
                        <table class="table">
                          <tbody class="body1">
                            <tr v-for="row in cart">
                              <td> {{row.quantity}}x {{row.product.name}}</td>
                              <td class="float-right ">₦{{formatPrice(row.price)}}</td>
                            </tr>

                          </tbody>
                          <tbody class="body2">
                            <tr>
                              <td>Subtotal</td>
                              <td class="float-right ">₦{{formatPrice(order.cart_subtotal)}}</td>
                            </tr>

                            <tr>
                              <td>Fulfillment Fee</td>
                              <td class="float-right ">
                                <span v-if="order.delivery.method=='delivery' && order.delivery.charge !==null">₦{{order.delivery.charge}}</span>
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
                          <span>Got a voucher or Gift card?</span>
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
                        <label class="form-check-label">Pay with Flutterwave
                          <small
                            class="ml-2"
                            id="balance"
                            style="color:red;font-size:11px"
                          ></small>
                          <br>
                          <span>Pay with Flutterwave (Card, Bank Transfer or USSD)</span>
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
                      <button
                        v-bind:disabled="(balance ==order.order_total || balance >0) && payment.card==false"
                        v-bind:class="(balance ==order.order_total || balance >0) && payment.card==false? 'disabled': ''"
                        type="submit"
                      >Proceed to Payment</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>

    </div>
    <!-- Address Modal -->
    <div
      class="modal fade"
      id="addressform"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              style="font-size:15px;font-weignt:600;"
              class="modal-title text-left"
            >{{edit ? 'Edit':'Add'}} Delivery address <br>
              <small
                v-if="edit"
                style="font-size:11px;color:#859BBCF5;"
              >Edit address.</small>
              <small
                v-else
                style="font-size:11px;color:#859BBCF5;"
              >Add where you will like to make your deliveries.</small>
            </h5>

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
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent='handleSubmit(createAddress)'>
                <div class="form-row">
                  <div class="form-group col-sm-6">
                    <validation-provider
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <input
                        type="text"
                        class="form-control"
                        required
                        placeholder="Label e.g Home, Office"
                        v-model="address.label"
                      >
                      <span class="err_msg">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group col-sm-6">
                    <validation-provider
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <input
                        type="text"
                        required
                        class="form-control"
                        placeholder="Street Address"
                        v-model="address.address"
                      >
                      <span class="err_msg">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-sm-6">
                    <validation-provider
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <input
                        type="text"
                        required
                        class="form-control"
                        placeholder="Area"
                        v-model="address.area"
                      >
                      <span class="err_msg">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group col-sm-6">
                    <validation-provider
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <input
                        type="text"
                        required
                        class="form-control"
                        placeholder="Closest Landmark"
                        v-model="address.landmark"
                      >
                      <span class="err_msg">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-row ">
                  <div class="form-group col-sm-6">
                    <validation-provider
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <input
                        type="text"
                        required
                        class="form-control"
                        placeholder="State"
                        v-model="address.state"
                      >
                      <span class="err_msg">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group col-sm-6">
                    <validation-provider
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <input
                        type="text"
                        required
                        class="form-control"
                        placeholder="City"
                        v-model="address.city"
                      >
                      <span class="err_msg">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      v-model="address.default"
                    >

                    <label
                      class="form-check-label"
                      for="exampleCheck1"
                    >Set as default</label>
                  </div>
                </div>
                <button
                  type="submit"
                  class="msq-button mt-4"
                >{{edit? 'Update':'Add'}} Address</button>
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
import * as $ from "jquery";
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Checkout',
  components: {
    TopNav, Footer
  },
  data () {
    return {
      edit: false,
      clearance: '',
      selected_window: '',
      user: {},
      balance: "",
      giftcard_amount: '',
      store: {},
      cart: [],
      serialnumber: "",
      voucher: 0,
      addresslist: [],
      default_address: {},
      address: {
        user_id: this.$store.getters.user.id,
        label: '',
        area: '',
        state: '',
        address: '',
        city: '',
        landmark: '',
        default: 1
      },
      windows: [],
      open_windows: [],
      payment: {
        voucher: false,
        loyalty: false,
        card: false
      },
      order: {
        cart_id: "",
        user_id: '',
        unique_code: "",
        comment: "",
        customer: {
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
        },
        delivery: {
          id: '',
          method: "",
          charge: 0,
          hour: "",
          label: "",
          address: "",
          city: "",
          state: '',
          area: '',
          landmark: "",
          contact_method: "",

        },
        order_enquiry_contactname: '',
        order_enquiry_contactnumber: '',
        contact_upon_delivery_name: '',
        contact_upon_delivery_number: '',
        payment: {
          method: ""
        },
        store: "",
        cart_subtotal: 0,
        order_total: 0,
        order_items: ""
      }
    }
  },
  created () {
    this.store = this.$store.getters.store;
    this.fetchWindow();
    let rave = document.createElement("script");
    rave.setAttribute(
      "src",
      "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js"
      // "https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"
    );
    document.head.appendChild(rave);

  },
  mounted () {

    this.user = this.$store.getters.user;
    this.cart = this.$store.getters.cart;
    this.order.order_items = this.cart
    this.order.user_id = this.user.id
    this.order.customer.firstname = this.user.firstname;
    this.order.customer.lastname = this.user.lastname;
    this.order.customer.email = this.user.email;
    this.order.customer.phone = this.user.phone;
    this.order.store = this.store.id.toString();
    if (this.store.mode == 'Delivery') {
      this.order.delivery.method = "delivery"
      this.order.delivery.city = this.store.city;
      this.order.delivery.state = this.store.state;
      this.order.delivery.area = this.$store.getters.area;
      setTimeout(() => {
        this.fetchAddress();
      }, 3000)
      this.address.state = this.store.state
      this.address.city = this.store.city
      this.address.area = this.$store.getters.area
    }
    else {
      this.order.delivery.method = "pickup"
    }
    this.cart.forEach(i => {
      this.order.cart_subtotal += Number(i.price)
    })
  },
  watch: {
    edit (val) {
      if (val == false) {
        this.address.state = this.store.state
        this.address.city = this.store.city
        this.address.area = this.$store.getters.area
        this.address.default = 1
      }
    }
  },
  computed: {
    ordertotal () {
      let total = Number(this.order.cart_subtotal) + Number(this.order.delivery.charge);
      this.order.order_total = total;
      return total;
    }
  },
  methods: {
    fetchWindow () {
      let req = {
        what: "windows",
        showLoader: false,
        params: {
          deliverywindow: this.store.mode,
          storeid: this.store.id
        }
      }
      this.$request.makeGetRequest(req)
        .then(response => {

          if (response.type == "windows") {

            let vm = this;
            let today = new Date();
            const d = new Date(today)
            d.setDate(d.getDate() + 1);
            var dateString = new Date(today.getTime() - (today.getTimezoneOffset() * 60000))
              .toISOString()
              .split("T")[0];
            var nextdateString = new Date(d.getTime() - (d.getTimezoneOffset() * 60000))
              .toISOString()
              .split("T")[0];
            response.data.data.forEach(i => {
              if (i.open_window.length == 0) {
                i.active = false;
              }
              else {
                i.active = true;
              }
              if (dateString == i.window_date) {
                i.window_day = 'Today';

              }
              else if (nextdateString == i.window_date) {
                i.window_day = 'Tomorrow';
              }
              else {
                i.window_day = i.window_day.substring(0, 3) + ', ' + vm.formatDate(i.window_date)
              }
            });
            let sortedActivities = response.data.data.slice().sort((a, b) => new Date(b.window_date) - new Date(a.window_date));
            this.windows = sortedActivities.reverse();

          }
        })
        .catch(error => {

          console.log(error)
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
    formatDate (date) {
      // let d = new Date(date)
      // return d.toDateString();


      var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];


      var t = new Date(date);
      return monthShortNames[t.getMonth()] + ' ' + t.getDate();

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
    formatUnique (n) {
      return Number(n) > 9 ? "" + n : "0" + n;
    },
    setWindow (row, index) {
      this.order.delivery.hour = row.starttime + ' - ' + row.endtime;
      this.selected_window = row.id + '' + index;
      if (row.deliveryfee !== null) {
        this.order.delivery.charge = row.deliveryfee;
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
    check ($event, action) {
      if ($event.target.checked) {

        if (action == 'default') {
          this.order.order_enquiry_contactname = this.order.customer.firstname + " " + this.order.customer.lastname
          this.order.order_enquiry_contactnumber = this.order.customer.phone;
        }
        else {
          this.order.contact_upon_delivery_name = this.order.order_enquiry_contactname
          this.order.contact_upon_delivery_number = this.order.order_enquiry_contactnumber
        }
      }
      else {
        if (action == 'default') {
          this.order.order_enquiry_contactname = ""
          this.order.order_enquiry_contactnumber = ""
        }
        else {
          this.order.contact_upon_delivery_name = ""
          this.order.contact_upon_delivery_number = ""
        }


      }
    },
    listWindows (row, index) {
      this.order.delivery.deliverydate = row.window_date;
      row.open_window.forEach(i => {
        i.id = index
      })
      this.open_windows = row.open_window;
      this.fee = row.deliveryfee;

      var add = document.querySelectorAll(".wday");
      [].forEach.call(add, function (el) {
        el.classList.remove("active");
      });
      if (index) {
        document.getElementById(index).classList.add('active');
      }


    },
    placeOrder () {
      this.order.unique_code = this.formatUnique(this.order.store) + this.formatUnique(this.store.branch_code) + Math.floor(10000 + Math.random() * 90000);
      this.order.contact_upon_delivery_number = this.order.contact_upon_delivery_number.replace(/\s/g, '');
      this.order.order_enquiry_contactnumber = this.order.order_enquiry_contactnumber.replace(/\s/g, '');
      this.order.customer.phone = this.order.customer.phone.replace(/\s/g, '');
      let isValidate = [];
      let field = []
      if (this.payment.loyalty) {
        if (this.order.payment.method.toLowerCase().includes("loyalty") == false) {

          this.order.payment.method += " loyalty"
        }
      }
      if (this.payment.voucher) {
        if (this.order.payment.method.toLowerCase().includes("gift") == false) {
          this.order.payment.method += " gift"
        }
      }
      if (this.payment.card) {
        if (this.order.payment.method.toLowerCase().includes("card") == false) {
          this.order.payment.method += " card"
        }
      }
      if (this.order.delivery.contact_method !== '' && this.order.delivery.hour !== '' && this.order.delivery.deliverydate !== '') {
        isValidate.push(true)

      }
      if (this.order.delivery.contact_method == '') {
        isValidate.push(false)
        field.push('contact method')
      }
      if (this.order.delivery.hour == '') {
        isValidate.push(false)
        field.push('delivery hour')
      }
      if (this.order.delivery.deliverydate == '') {
        isValidate.push(false)
        field.push('delivery date')
      }
      if (this.order.payment.method == '') {
        isValidate.push(false)
        field.push('payment method')
      }
      if (!isValidate.includes(false)) {

        console.log(this.order);
        if (this.clearance) {
          let req = {
            what: "placeorder",
            showLoader: true,
            data: this.order
          }
          this.$request
            .makePostRequest(req)
            .then(res => {
              // console.log(res.data.data.order);
              if (this.order.payment.method.includes("gift")) {
                this.payGift(res.data.data.order)
              }
              else {
                this.payCard(res.data.data.order)
              }
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
    payCard (order, giftref) {

      let PBFKey = "FLWPUBK-00fd26c8dc92b4e1663550c4ba7532aa-X";
      let transid = giftref ? giftref : `${order.id}${Math.floor(Date.now())}`;
      let vm = this;
      let cardamount;
      if (Number(this.balance) !== "" && this.balance > 0) {
        cardamount = this.balance

      }
      else {
        cardamount = order.balance
      }
      getpaidSetup({

        PBFPubKey: PBFKey,
        customer_email: this.order.customer.email,
        customer_firstname: this.order.customer.firstname,
        customer_lastname: this.order.customer.lastname,
        custom_description: "Payment for order made",
        custom_logo: "http://localhost:8081/assets/img/logo_mobile.png",
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
    fetchAddress () {
      let req = {
        what: "listaddress",
        showLoader: false,
        params: {
          user_id: this.$store.getters.user.id
        }
      }
      this.$request.makeGetRequest(req)
        .then(response => {

          if (response.type == 'listaddress') {
            console.log(response);

            this.addresslist = response.data.data
            response.data.data.forEach(i => {
              if (i.default == 1) {
                this.default_address = i;
                this.order.delivery.id = i.id;
                this.order.delivery.label = i.label;
                this.order.delivery.address = i.address
                this.order.delivery.city = i.city
                this.order.delivery.state = i.state
                this.order.delivery.area = i.area
                this.order.delivery.landmark = i.landmark
              }
            })
          }
        })
        .catch(error => {

          console.log(error)
        });
    },
    createAddress () {
      if (this.edit) {
        let req = {
          what: "editaddress",
          showLoader: true,
          id: this.addressid,
          data: this.address
        }
        this.$request
          .editItem(req)
          .then(res => {
            this.$swal.fire("Success", res.data.message, "success");
            this.address = {}
            $(".modal").modal("hide")
            this.fetchAddress();
          })
          .catch(error => {
            console.log(error);
            this.$swal.fire("Error", error.message, "error");
          });
      }
      else {
        let req = {
          what: "createaddress",
          showLoader: true,
          data: this.address
        }
        this.$request
          .makePostRequest(req)
          .then(res => {
            console.log(res)
            this.$swal.fire("Success", res.data.message, "success");
            this.address = {}
            $(".modal").modal("hide")
            this.fetchAddress();
          })
          .catch(error => {
            console.log(error);
            this.$swal.fire("Error", error.message, "error");
          });
      }

    },
    editAd (row) {
      this.edit = true;
      this.addressid = row.id;
      this.address = {
        label: row.label,
        area: row.area,
        state: row.state,
        address: row.address,
        city: row.city,
        landmark: row.landmark,
        default: row.default
      }

    },
    handleDelete (id) {
      let req = {
        what: "deleteaddress",
        showLoader: true,
        id: id
      }
      this.$request
        .deleteItem(req)
        .then(res => {
          this.$swal.fire("Success", res.data.message, "success");
          this.fetchAddress();
        })
        .catch(error => {
          console.log(error);
          this.$swal.fire("Error", error.message, "error");
        });
    }
  }
}

</script>

