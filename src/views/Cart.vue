<template>
  <div class="cart page">
    <div class="">
      <div class="banner cart-banner">
        <div class="container">
          <h3 class="title">Cart</h3>
        </div>
      </div>
      <div class="content container">
        <div class="row my-5">
          <div class="col-md-8">
            <table class="table table-responsive">
              <thead>
                <tr>
                  <th scope="col"></th>

                  <th scope="col">Product</th>
                  <th scope="col"></th>
                  <th scope="col">Qty</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> <img
                      src="../assets/img/cancel.png"
                      alt=""
                      title="Remove item"
                    ></td>
                  <td class="">

                    <img
                      src="../assets/img/cartimage.png"
                      alt=""
                      class="img"
                    >

                  </td>
                  <td class="productname">Wind Hand Sanitizer 500 ml</td>
                  <td>
                    <input
                      type="number"
                      class="qty"
                      value="5"
                    >
                  </td>
                  <td>₦3,000 </td>
                  <td>₦3,000 </td>
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
                      <td class="float-right">₦5,000</td>
                    </tr>

                  </tbody>
                </table>
                <div class="mt-4 total d-flex  justify-content-between">
                  <p>Total</p>
                  <h5>₦10,000</h5>
                </div>
                <button @click="$router.push('checkout')">Proceed to checkout</button>
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
  name: 'Cart',
  components: {
  },
  data () {
    return {
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true)
  },
  mounted () {
    // console.log(this.$store.getters.showSearch)
  }
}

</script>

