<template>
  <div class="orderconfirmation page">
    <div class="confirm-banner">
      <div class="text">
        <div class="banner-icon">
          <img
            src="../assets/img/confirmed.png"
            alt=""
          >
        </div>
        <h3 class="banner-title">Thank You</h3>
        <p class="banner-subtitle">Your order has been received
          <br>
          Confirmation receipt and order details has been shared to <span>bfakeyede@gmail.com</span>
        </p>
      </div>
    </div>
    <div class="content bg-white">
      <div class="container">
        <div class="row my-5 py-3">
          <div class="col-md-3 col-sm-6 orderinfo">
            <h5 class="title">Order Number</h5>
            <p class="value">1444</p>
          </div>
          <div class="col-md-3 col-sm-6 orderinfo">
            <h5 class="title">Date</h5>
            <p class="value">June 12, 2020</p>
          </div>
          <div class="col-md-3 col-sm-6 orderinfo">
            <h5 class="title">Total Amount</h5>
            <p class="value">₦6,200</p>
          </div>
          <div class="col-md-3 col-sm-6 orderinfo">
            <h5 class="title">Payment method</h5>
            <p class="value">Pay with Flutterwave</p>
          </div>
        </div>

        <div class="order-details">
          <h4 class="heading mb-4">Order Details</h4>
          <div class="">
            <div class="d-flex mb-3">
              <h5>Total Item</h5>
              <div class="info">
                <span>6 items</span>
              </div>
            </div>
            <div class="d-flex mb-3">
              <h5>Order time</h5>
              <div class="info">
                <span>1.00pm, 12/06/20</span>
              </div>
            </div>
            <div class="d-flex mb-3">
              <h5>Contact Details</h5>
              <div class="info">
                <span class="text-bold">Mobolarinwa Fakeyede</span><br>
                <span>bfakeyede@gmail.com <br> 09023724420</span>
              </div>
            </div>
            <div class="d-flex mb-3">
              <h5>Fulfilment Store</h5>
              <div class="info">
                <span class="text-bold">Market Square Ada George</span>
                <br>
                <span>9 Ada George, Port Harcourt, Rivers.</span>
              </div>
            </div>
          </div>
          <div class="orderbtn">
            <button class="msq-button">Track Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'OrderConfirmation',
  components: {

  },
  data () {
    return {
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true)
  },
}

</script>

