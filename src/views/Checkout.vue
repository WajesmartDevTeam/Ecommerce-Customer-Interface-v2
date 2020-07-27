<template>
  <div class="checkout page">
    <div class="">
      <div class="banner checkout-banner">
        <div class="container">
          <h4 class="title">Checkout</h4>
        </div>
      </div>
      <div class="content container">
        <div class="row my-5">
          <div class="col-md-8">
            <div class="card card-1">
              <div class="card-body">
                <p> Returning customer? <a href="">Click here to login</a></p>
              </div>
            </div>
            <!-- personal info -->
            <div class="card card-2 mt-4">
              <div class="card-body">
                <div class="card-title d-flex">
                  <div class="num">1</div>
                  <h5 class="title">Personal Details</h5>
                </div>
                <div class="card-text mt-3 mx-5">
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

                  </form>
                </div>
              </div>
            </div>
            <!-- fulfillment info -->
            <div class="card card-3 mt-4">
              <div class="card-body">
                <div class="card-title d-flex">
                  <div class="num">2</div>
                  <h5 class="title">Fulfillment Information</h5>
                </div>
                <div class="card-text my-3 mx-5">
                  <p class="mode ml-5">Pickup At:</p>
                  <div class="d-flex fulfillment-address">
                    <img
                      src="../assets/img/store-icon.png"
                      alt=""
                    >
                    <p>Market Square Ada George, 9 Ada George, Port Harcourt, <br> Rivers.</p>
                  </div>
                </div>
              </div>
            </div>

            <!---window -->
            <div class="card card-4 mt-4">
              <div class="card-body">
                <div class="card-title d-flex mb-0">
                  <div class="num">3</div>
                  <h5 class="title">Fulfillment Window</h5>

                </div>
                <h6 class="card-subtitle subtitle mb-2 ml-5">When will you like to pick up your order</h6>
                <div class="card-text my-3 ml-5">
                  <div class="date-box">
                    <p class="window-date">Today</p>
                    <p class="window-date">Tomorrow</p>
                    <p class="window-date">Sat, Jun 13</p>
                    <p class="window-date">Sun, Jun 14</p>
                    <p class="window-date">Mon, Jun 15</p>
                    <p class="window-date">Tue, Jun 16</p>
                    <p class="window-date">Wed, Jun 17</p>
                  </div>

                  <div class="row mr-5 mt-3">
                    <div class="col-lg-6 col-md-12 mt-2">
                      <div class="window">
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
                          <p class="hour">8:00 am - 11:00 am</p>
                          <div class="fee">
                            <h5>Pickup Fee</h5>
                            <p>Free</p>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div class="col-lg-6 col-md-12 mt-2">
                      <div class="window">
                        <div style="height:30px">
                          <img
                            src="../assets/img/checked.png"
                            alt=""
                            class="check float-right"
                          >
                        </div>
                        <div class="d-flex justify-content-between">
                          <p class="hour">8:00 am - 11:00 am</p>
                          <div class="fee">
                            <h5>Pickup Fee</h5>
                            <p>Free</p>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div class="col-lg-6 col-md-12 mt-2">
                      <div class="window">
                        <div style="height:30px">
                          <img
                            src="../assets/img/checked.png"
                            alt=""
                            class="check float-right"
                          >
                        </div>
                        <div class="d-flex justify-content-between">
                          <p class="hour">8:00 am - 11:00 am</p>
                          <div class="fee">
                            <h5>Pickup Fee</h5>
                            <p>Free</p>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div class="col-lg-6 col-md-12 mt-2">
                      <div class="window">
                        <div style="height:30px">
                          <img
                            src="../assets/img/checked.png"
                            alt=""
                            class="check float-right"
                          >
                        </div>
                        <div class="d-flex justify-content-between">
                          <p class="hour">8:00 am - 11:00 am</p>
                          <div class="fee">
                            <h5>Pickup Fee</h5>
                            <p>Free</p>
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
                  <div class="num">4</div>
                  <h5 class="title">3rd Party Contacts</h5>
                </div>
                <h6 class="card-subtitle subtitle mb-2 ml-5">Who should we contact to follow up on this order</h6>
                <div class="card-text mt-3 mx-5">
                  <form>
                    <fieldset>
                      <legend>Order Enquiry Contact*</legend>

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
                          >
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="form-group col">
                          <!-- <input
                            type="text"
                            class="form-control"
                            placeholder="Phone Number"
                          > -->
                          <vue-tel-input></vue-tel-input>
                        </div>

                      </div>
                      <div class="form-group form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
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
                          >
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="form-group col">
                          <!-- <input
                            type="text"
                            class="form-control"
                            placeholder="Phone Number"
                          > -->
                          <vue-tel-input></vue-tel-input>
                        </div>

                      </div>
                      <div class="form-group form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
                        >
                        <label
                          class="form-check-label"
                          for="exampleCheck1"
                        >Same as order enquiry</label>
                      </div>
                    </fieldset>

                  </form>

                  <div class="contact mt-5">
                    <h5 class="title m-0">How should your contacts be reached</h5>
                    <div class="row mt-3">
                      <div class="contact-type col-sm-3 col-xs-12">
                        <div class="icon">
                          <img
                            src="../assets/img/phone.png"
                            alt=""
                          >
                        </div>
                        <p>Phone Call</p>
                      </div>
                      <div class="contact-type col-sm-3 col-xs-12">
                        <div class="icon">
                          <img
                            src="../assets/img/whatsapp.png"
                            alt=""
                          >
                        </div>
                        <p>Whatsapp</p>
                      </div>
                      <div class="contact-type col-sm-3 col-xs-12">
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
                  <div class="num">5</div>
                  <h5 class="title">Comments / Special Instructions</h5>
                </div>
                <div class="card-text mt-3 mx-5">
                  <form>
                    <div class="form-group">

                      <textarea
                        name=""
                        placeholder="Add a note/instruction"
                      ></textarea>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div id="summary">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title title ">Your Order</h5>
                  <table class="table">
                    <tbody class="body1">
                      <tr>
                        <td> 1x Wind Hand Sanitizer 500 ml</td>
                        <td class="float-right ">₦1,865</td>
                      </tr>
                      <tr>
                        <td> 1x Wind Hand Sanitizer 500 ml</td>
                        <td class="float-right ">₦1,865</td>
                      </tr>
                      <tr>
                        <td> 1x Wind Hand Sanitizer 500 ml</td>
                        <td class="float-right ">₦1,865</td>
                      </tr>

                    </tbody>
                    <tbody class="body2">
                      <tr>
                        <td>Subtotal</td>
                        <td class="float-right ">₦1,865</td>
                      </tr>

                      <tr>
                        <td>Fulfillment Fee</td>
                        <td class="float-right ">Pickup(free)</td>
                      </tr>

                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Total</th>
                        <th class="float-right total">₦1,865</th>
                      </tr>
                    </tfoot>
                  </table>

                </div>
              </div>
              <div>

                <div class="form-group form-check pay mt-3">
                  <input
                    type="checkbox"
                    class="form-check-input"
                  />
                  <label class="form-check-label">Pay with Flutterwave
                    <br>
                    <span>Pay with Flutterwave (Card, Bank Transfer or USSD)</span>
                  </label>
                </div>

                <div class="form-group form-check agree">
                  <input
                    type="checkbox"
                    class="form-check-input"
                  >
                  <label
                    class="form-check-label"
                    for="exampleCheck1"
                  >I accept to the <a
                      href="/terms"
                      style="color:#000066; font-weight:bold;"
                    >terms and conditions</a> of marketsquare</label>
                </div>
                <button @click="$router.push('checkout')">Proceed to Payment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>

export default {
  name: 'Checkout',
  components: {

  },
  data () {
    return {
    }
  },
  mounted () {
    // console.log(this.$store.getters.showSearch)
  }
}

</script>

