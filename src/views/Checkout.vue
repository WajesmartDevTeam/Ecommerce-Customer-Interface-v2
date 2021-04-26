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
                                placeholder=" "
                                type="text"
                                class="form-control"
                                v-model="order.customer.firstname"
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
                                placeholder=" "
                                type="text"
                                class="form-control"
                                v-model="order.customer.lastname"
                              >
                              <label class="anim">Last Name</label>
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
                              placeholder=" "
                              type="email"
                              name="email"
                              class="form-control"
                              v-model="order.customer.email"
                            >
                            <label class="anim">Email Address</label>
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
                          v-show="$store.getters.isLoggedIn"
                          v-if="$store.getters.isLoggedIn"
                          class=""
                        >

                          <div class="address row">

                            <div
                              v-if="Object.keys(default_address).length > 0"
                              class="col-sm-6"
                            >
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
                                v-show="$store.getters.isLoggedIn"
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
                                  placeholder=" "
                                  type="text"
                                  class="form-control"
                                  v-model="order.delivery.label"
                                >
                                <label class="anim">Label( Office, Home)</label>
                                <span class="err_msg">{{ errors[0] }}</span>
                              </validation-provider>
                            </div>
                            <div class="form-group col-12">
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <input
                                  placeholder=" "
                                  type="text"
                                  class="form-control"
                                  v-model="order.delivery.address"
                                >
                                <label class="anim">Street Address</label>
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
                                  placeholder=" "
                                  type="text"
                                  required
                                  class="form-control"
                                  v-model="order.delivery.landmark"
                                >
                                <label class="anim">Closest Landmark</label>
                                <span class="err_msg">{{ errors[0] }}</span>
                              </validation-provider>
                            </div>
                            <div class="form-group col-md-6">
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <input
                                  placeholder=" "
                                  type="text"
                                  class="form-control"
                                  disabled
                                  v-model="order.delivery.state"
                                >
                                <label class="anim">State</label>
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
                                  placeholder=" "
                                  type="text"
                                  class="form-control"
                                  disabled
                                  v-model="order.delivery.city"
                                >
                                <label class="anim">City</label>
                                <span class="err_msg">{{ errors[0] }}</span>
                              </validation-provider>
                            </div>
                            <div class="form-group col-md-6">
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <input
                                  placeholder=" "
                                  type="text"
                                  class="form-control"
                                  disabled
                                  v-model="order.delivery.area"
                                >
                                <label class="anim">Area</label>
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
                          <span v-else>We are picking your order from:</span>
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
                            v-bind:class="('day'+index) =='day0' ? 'active': ''"
                            v-bind:style="row.active== false ? 'color: lightgrey;':''"
                            :id="'day'+index"
                            @click.prevent="listWindows(row, 'day'+index)"
                            v-for="(row, index) in windows"
                            v-bind:key="index"
                          >{{row.window_day}}
                          </p>
                        </div>
                        <div class="row mr-5 mt-3"
                            v-if="!window_set"
                        >
                          <div
                            class="text-center col-md-12 mt-2"
                            qaz
                          >
                            <div style="height:150px;width:150px;margin: 0 auto;"><img style="width: 100%;" src="https://www.c-sgroup.com/images/loading-icon-red.gif" /></div>
                          </div>
                        </div>
                        <div v-else class="row mr-5 mt-3">
                          <div
                            v-if="open_windows.length == 0"
                            class="text-center col-md-12 mt-2"
                            qaz
                          >
                            <p>There are no available windows for this date</p>
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
                              <div style="height:25px">
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
                                  <p v-else-if="isPromo && ordertotal >= 10000">FREE</p>
                                  <p v-else>₦{{row.deliveryfee}}</p>
                                </div>
                              </div>
                              
                            </div>

                          </div>
                          <div class="text-center mt-2 col-md-12" style="font-size: 12px;font-style:italic;font-weight:bold;">
                            <span style="color:black">Disclaimer:</span> <span style="color:red">We typically deliver most of our orders with the delivery fee paid online. However, on rare occasions, we might contact you to give you an update on the delivery fee depending on the weight of your items or the delivery distance.</span>
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
                      <h6 class="card-subtitle subtitle mb-2 ml-5">Who should we contact to follow up on this order?</h6>
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
                                  placeholder=" "
                                  type="text"
                                  class="form-control"
                                  v-model="order.order_enquiry_contactname"
                                >
                                <label class="anim">Name</label>
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
                                  placeholder=" "
                                  v-model="order.contact_upon_delivery_name"
                                >
                                <label class="anim">Name</label>
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
                        <h5 class="title">Add note/instruction</h5>
                      </div>
                      <div class="card-text mt-3 mx-md-5">

                        <div class="form-group">
                          <textarea
                            v-model="order.comment"
                            name=""
                            placeholder="e.g. an item you want but didn't find OR special instructions about your order."
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
                        <table class="table table-responsive">
                          <tbody class="body1">
                            <tr v-for="(row, i) in cart" :key="i">
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
                              <td class="float-right">
                                <span v-if="isPromo && ordertotal >= 10000">Free</span>
                                <span v-else>
                                  <span v-if="order.delivery.method=='delivery' && order.delivery.charge !==null">₦{{deliveryFee}}</span>
                                  <span v-else-if="order.delivery.method=='delivery' && order.delivery.charge ==null">₦0.00</span>
                                  <span v-else>Pickup(Free)</span>
                                </span>
                              </td>
                            </tr>
                            <!-- <tr v-if="isLoggedIn">
                              <td>Wallet</td>
                              <td class="float-right ">₦{{formatPrice(user.available_balance)}}</td>
                            </tr>
                            <tr v-if="isLoggedIn">
                              <td>Wallet Balance</td>
                              <td class="float-right ">₦{{formatPrice(available_balance)}}</td>
                            </tr> -->
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>Total</th>
                              <th class="float-right total">₦{{ formatPrice(ordertotal)}}</th>
                            </tr>
                          </tfoot>
                        </table>

                        <!-- <div class="form-row px-2" v-if="isLoggedIn">
                          <input
                            type="text"
                            class="form-control col-12"
                            min="0"
                            placeholder="Enter Wallet Top Up Ammount"
                            v-model="top_up_transaction.amount"
                          >
                        </div> -->

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
                        <!-- :disabled="isLoggedIn && Number(balance) == 0" -->
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
                        <!-- :disabled="isLoggedIn && Number(balance) == 0" -->
                        <label class="form-check-label">
                          <b>Pay with - PayPal, USSD, Bank Transfer or Card</b>
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
                      <button
                        v-bind:disabled="!canPay"
                        v-bind:class="!canPay ? 'disabled': ''"
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
                        placeholder=" "
                        v-model="address.label"
                      >
                      <label
                        for=""
                        class="anim"
                      >Label e.g Home, Office</label>
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
                        placeholder=" "
                        v-model="address.address"
                      >
                      <label class="anim">Street Address</label>
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
                        placeholder=" "
                        disabled
                        v-model="address.area"
                      >
                      <label class="anim">Area</label>
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
                        placeholder=" "
                        v-model="address.landmark"
                      >
                      <label class="anim">Closest Landmark</label>
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
                        disabled
                        class="form-control"
                        placeholder=" "
                        v-model="address.state"
                      >
                      <label class="anim">State</label>
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
                        disabled
                        placeholder=" "
                        v-model="address.city"
                      >
                      <label class="anim">City</label>
                      <span class="err_msg">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      v-model="address.address_default"
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
      isPromo: false,

      transaction: {
        balance: 0,
        user_id: this.$store.getters.user.id,
        type: "DEBIT",
        amount: 0
      },
      top_up_transaction: {
        balance: 0,
        user_id: this.$store.getters.user.id,
        type: "CREDIT",
        amount: 0
      },
      isLoggedIn: this.$store.getters.isLoggedIn,
      edit: false,
      clearance: '',
      selected_window: '',
      window_set: false,
      user: {},
      available_balance: 0,
      balance: 0,
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
        address_default: 1
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
        amount_paid: 0,
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
      },
      delivery_fee_variation: {}
    }
  },
  created () {
    this.store = this.$store.getters.store;
    this.fetchWindow();
    let rave = document.createElement("script");

    rave.setAttribute(
      "src",
      this.$request.raveAPI
      // "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js"
      // "https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"
    );
    document.head.appendChild(rave);

    /* for free delivery promotion */
    let startstring      = "April 25, 2021";
    let futurestring     = "May 3, 2021 23:59:59";

    let today             = new Date().getTime();
    let start_promo       = new Date(startstring).getTime();
    let end_promo         = new Date(futurestring).getTime();


    if((today >= start_promo) && (today <= end_promo)){
      this.isPromo = true;
    }
    else{
      this.isPromo = false;
    }

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
      }, 2000)
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

    if(this.isPromo && this.order.order_total >= 10000){
      console.log('is promo window');
    }
    // else
    //   this.fetchDeliveryFeeVariation();

  },
  watch: {
    edit (val) {
      if (val == false) {
        this.address.state = this.store.state
        this.address.city = this.store.city
        this.address.area = this.$store.getters.area
        this.address.address_default = 1
      }
    }
  },
  computed: {
    canPay(){
      // if(this.isLoggedIn) {
      //   return (Number(this.user.available_balance) == 0 || Number(this.user.available_balance) > 0) && this.balance  > 0 && this.payment.card || (Number(this.user.available_balance) || this.payment.voucher) > 0 && this.balance == 0 && this.clearance;
      // } else {
        return !((this.balance == this.order.order_total || this.balance >0) && this.payment.card==false);
      // }
    },
    deliveryFee () {
      // let result = Number(this.order.delivery.charge) + (Number(this.order.delivery.charge) * (Number(this.delivery_fee_variation.delivery_area)/100)) + (Number(this.order.delivery.charge) * (Number(this.delivery_fee_variation.basket_size)/100));
      // return isNaN(result) || result == undefined ? 0 : result;
      return this.order.delivery.charge;
    },
    ordertotal () {
      let total = (Number(this.order.cart_subtotal) + Number(this.deliveryFee));
      this.order.order_total = total;
      // if(this.isLoggedIn) {
      //   let available_balance =  Number(this.user.available_balance);
      //   let top_up = Number(this.top_up_transaction.amount);
      //   let balance = available_balance - total;
        
      //   if(balance < 0) {
      //     balance = balance * -1;
      //     this.available_balance = 0;
      //     this.transaction.amount =  -1 * available_balance;
      //     this.order.amount_paid = (total - balance);
      //   } else {
      //     this.order.amount_paid = (available_balance - balance);
      //     this.transaction.amount = -1 * this.order.amount_paid;
      //     this.available_balance = balance;
      //     balance = 0;
      //   }
      //   this.balance = balance;
      //   if(top_up > 0){
      //      this.balance = top_up + this.balance;
      //   }
      //   return this.balance;
      // } else {
        this.balance = total;
        return total;
      // }
    },
  },
  methods: {
    
    fetchDeliveryFeeVariation() {
      let req = {
        what: "deliveryFeeVariation",
        showLoader: false,
        params: {
          subtotal: Number(this.order.cart_subtotal),
          store_id: this.store.id,
          area: this.order.delivery.area
        }
      }
      this.$request.makeGetRequest(req)
        .then(response => {
          this.delivery_fee_variation = response.data.data
        }).catch(error => {
          console.log(error)
        });
    },
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
            this.windows = sortedActivities.length > 0 ? sortedActivities.reverse() : [];
            this.window_set = true;
            if(this.windows != []) {
              this.listWindows(this.windows[0], 'day0');
            }


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
            this.balance = Number(this.balance) - Number(res.data.data)
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
       
          if(this.isPromo && this.order.order_total >= 10000){
            this.order.delivery.charge = 0;
          }
          else{
            this.order.delivery.charge = row.deliveryfee;
          }
        
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
          this.balance = this.order.order_total
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
      console.log('in '+ index)
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
    makeTransaction (type, data) {
      data.unique_code = this.order.unique_code;
      let req = {
        what: type,
        showLoader: true,
        data: data
      }
      this.$request
      .makePostRequest(req)
      .then(res => {
          
      })
      .catch(error => {
        console.log(error);
        this.$swal.fire("Error", error.message, "error");
      });
    },
    placeOrder () {
      console.log('about to order');

      this.order.unique_code = this.formatUnique(this.order.store) + this.formatUnique(this.store.branch_code) + Math.floor(10000 + Math.random() * 90000);
      this.order.contact_upon_delivery_number = this.order.contact_upon_delivery_number.replace(/\s/g, '');
      this.order.order_enquiry_contactnumber = this.order.order_enquiry_contactnumber.replace(/\s/g, '');
      this.order.customer.phone = this.order.customer.phone.replace(/\s/g, '');
      let isValidate = [];
      let field = [];

      // if (Number(this.user.available_balance) >  0) {
      //   if (this.order.payment.method.toLowerCase().includes("wallet") == false) {
      //     this.order.payment.method += " wallet"
      //   }
      // }
      // else {
        // if (this.order.payment.method.toLowerCase().includes("wallet")) {

        //   this.order.payment.method = this.order.payment.method.replace(' wallet', '')
        // }
      // }
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
          // if(this.isLoggedIn && (Number(this.user.available_balance) >  0 || Number(this.top_up_transaction.amount) > 0)) {
            
          //   if(Number(this.top_up_transaction.amount) > 0) {
          //     this.makeTransaction('creditWallet', this.top_up_transaction);
          //   }
          //   if(Number(this.user.available_balance) >  0 ) {
          //     this.makeTransaction('debitWallet', this.transaction);
          //   }
            
          //   let req = {
          //     what: "placeorder",
          //     showLoader: false,
          //     data: this.order
          //   }
          //   this.$request
          //   .makePostRequest(req)
          //   .then(res => {
              
          //     // console.log(res.data.data.order);
          //     if(this.balance > 0 || this.top_up_transaction.amount > 0) {
          //       if (this.order.payment.method.includes("gift")) {
          //         this.payGift(res.data.data.order)
          //       }
          //       else {
          //         this.payCard(res.data.data.order)
          //       }
          //     } else {
          //       let order = res.data.data.order;
          //       let req = {
          //         what: "verifypayment",
          //         showLoader: true,
          //         data: {
          //           txref: null,
          //           pref: null,
          //           order_id: order.id,
          //           user_id: order.user_id,
          //           cart_id: "",
          //           customer_id: "",
          //           status: "successful",
          //           amount: Number(this.balance)
          //         }
          //       }

          //       this.verifyPayment(this, req, order);
          //     }
          //   })
          //   .catch(error => {
          //     console.log(error);
          //     this.$swal.fire("Error", error.message, "error");
          //   });     
          // } else {
            let req = {
                what: "placeorder",
                showLoader: true,
                data: this.order
              }
              this.$request
              .makePostRequest(req)
              .then(res => {
                // console.log(res.data.data.order);
                // if(this.balance > 0) {
                  if (this.order.payment.method.includes("gift")) {
                    this.payGift(res.data.data.order)
                  }
                  else {
                    this.payCard(res.data.data.order)
                  }
                // }
              })
              .catch(error => {
                console.log(error);
                this.$swal.fire("Error", error.message, "error");
              });  
          // }
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
      // live
      // let PBFKey = "FLWPUBK-f079ea84da7aac9ca312a10668f88c44-X";

      // test
      // let PBFKey = "FLWPUBK-00fd26c8dc92b4e1663550c4ba7532aa-X";
      let PBFKey = this.$request.PBFKey;
      let transid = giftref ? giftref : `${order.id}${Math.floor(Date.now())}`;
      let vm = this;
      let cardamount;
      if (Number(this.balance) !== "" && this.balance > 0) {
        cardamount = this.balance

      }
      // else if(this.isLoggedIn) {
      //   cardamount = Number(this.balance)
      // }
      else {
        cardamount = order.balance
      }
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

           vm.verifyPayment(vm, req, order);

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
    verifyPayment (vm, req, order) {
       vm.$request
              .makePostRequest(req)
              .then(res => {
                console.log(res)
                vm.$store.dispatch('orderinfo', order);
                vm.$store.dispatch('addToCart', []);
                this.$store.dispatch('user', res.data.data);
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
            // this.balance = Number(this.balance) - Number(this.giftcard_amount);
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
          console.log(response)
          if (response.type == 'listaddress') {
            this.addresslist = response.data.data
            response.data.data.forEach(i => {
              if (Number(i.address_default) == 1) {
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
          // this.$swal.fire("Error", error.message, "error");
          console.log(error)
        });
    },
    createAddress () {
      this.address.user_id = this.$store.getters.user.id
      if (!this.address.hasOwnProperty("address_default")) {
        this.address.address_default = 0
      }
      if (this.edit) {
        let req = {
          what: "editaddress",
          showLoader: true,
          id: this.addressid,
          data: this.address
        }
        this.$request
          .makePostRequest(req)
          .then(res => {
            this.$swal.fire("Success", res.data.message, "success");
            this.address.label = '';
            this.address.address = '',
              this.address.landmark = '',



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
            this.address.label = '';
            this.address.address = '',
              this.address.landmark = '',
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
        address_default: Number(row.address_default)
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

