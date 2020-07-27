<template>
  <div class="orders page bg-white py-5">
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <div id="options">
            <div class="opt active">
              <a href="/orders">My Orders</a>
            </div>
            <div class="opt">
              <a href="/account">My Account</a>
            </div>
            <div class="opt ">
              <a href="/addressbook">Address Book</a>
            </div>
          </div>
        </div>
        <div class="col-sm-9">
          <div class="content">

            <div class="row">
              <div class="col-sm-6 col-md-6 col-lg-4 ">
                <div
                  class="order-box "
                  @click="$router.push('orderview')"
                >
                  <h5 class="order-title">Order #34585</h5>
                  <div class="price">
                    <p>₦12,925</p>
                  </div>
                  <div class="order-badge">
                    <span class="badge status">Processing</span>
                    <span class="badge mode ml-3">Delivery</span>
                  </div>
                  <p class="date">26 March 2020, 3:40pm</p>
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-4 ">
                <div
                  class="order-box "
                  @click="$router.push('orderview')"
                >
                  <h5 class="order-title">Order #34585</h5>
                  <div class="price">
                    <p>₦12,925</p>
                  </div>
                  <div class="order-badge">
                    <span class="badge status">Processing</span>
                    <span class="badge mode ml-3">Delivery</span>
                  </div>
                  <p class="date">26 March 2020, 3:40pm</p>
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-4 ">
                <div
                  class="order-box "
                  @click="$router.push('orderview')"
                >
                  <h5 class="order-title">Order #34585</h5>
                  <div class="price">
                    <p>₦12,925</p>
                  </div>
                  <div class="order-badge">
                    <span class="badge status">Processing</span>
                    <span class="badge mode ml-3">Delivery</span>
                  </div>
                  <p class="date">26 March 2020, 3:40pm</p>
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-4 ">
                <div
                  class="order-box "
                  @click="$router.push('orderview')"
                >
                  <h5 class="order-title">Order #34585</h5>
                  <div class="price">
                    <p>₦12,925</p>
                  </div>
                  <div class="order-badge">
                    <span class="badge status">Processing</span>
                    <span class="badge mode ml-3">Delivery</span>
                  </div>
                  <p class="date">26 March 2020, 3:40pm</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <storeSelector></storeSelector>

  </div>
</template>


<script>
import StoreSelector from '@/components/StoreSelector.vue'
export default {
  name: 'MyOrders',
  components: {
    StoreSelector
  },
  data () {
    return {
      showSearch: false,
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

