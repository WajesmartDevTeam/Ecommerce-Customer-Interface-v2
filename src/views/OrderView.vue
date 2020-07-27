<template>
  <div
    id="order"
    class=" page bg-white py-5"
  >
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

          </div>
        </div>
        <div class="col-sm-9">
          <div class="content">
            <div class="top d-flex">
              <a href="/orders">
                Back</a>
              <h5 class="ml-5 text-bold">Order #34585</h5>
            </div>
            <div class="card order-details mt-2">
              <div class="card-body">

                <div>
                  <div class="d-flex mb-3">
                    <h5>Total Item</h5>
                    <div class="info"><span>6 items</span></div>
                  </div>
                  <div class="d-flex mb-3">
                    <h5>Order time</h5>
                    <div class="info"><span>1.00pm, 12/06/20</span></div>
                  </div>
                  <div class="d-flex mb-3">
                    <h5>Contact Details</h5>
                    <div class="info"><span class="text-bold">Mobolarinwa Fakeyede</span><br><span>bfakeyede@gmail.com <br> 09023724420</span></div>
                  </div>
                  <div class="d-flex mb-3">
                    <h5>Fulfilment Store</h5>
                    <div class="info"><span class="text-bold">Market Square Ada George</span><br><span>9 Ada George, Port Harcourt, Rivers.</span></div>
                  </div>
                  <div class="d-flex mb-3">
                    <h5>Fulfilment Type</h5>
                    <div class="info"><span>Pickup</span></div>
                  </div>
                  <div class="d-flex mb-3">
                    <h5>Payment Method</h5>
                    <div class="info"><span>Card</span></div>
                  </div>
                  <div class="d-flex mb-3">
                    <h5>Total Amount</h5>
                    <div class="info"><span>₦6,200</span></div>
                  </div>

                </div>
                <div class="orderbtn"><button class="msq-button">Order Again</button></div>
              </div>
            </div>
            <div class="card order-status mt-3 p-4">
              <h5 class="card-title title text-left">Order Status</h5>
              <div
                id="Order_Tracker"
                class="card-body p-0 mt-3"
              >
                <div class="track mt-3">
                  <svg class="Rectangle_2828">
                    <rect
                      id="Rectangle_2828"
                      rx="0"
                      ry="0"
                      x="0"
                      y="0"
                      width="2"
                      height="300"
                    >
                    </rect>
                  </svg>
                  <div id="Group_7638">
                    <svg class="complete">
                      <ellipse
                        id="Ellipse_237"
                        rx="18"
                        ry="18"
                        cx="18"
                        cy="18"
                      >
                      </ellipse>
                    </svg>
                    <div id="check">

                      <img
                        src="../assets/img/check.png"
                        alt=""
                      >
                    </div>
                  </div>
                  <svg class="Ellipse_237_ed active">
                    <ellipse
                      id="Ellipse_237_ed"
                      rx="6"
                      ry="6"
                      cx="6"
                      cy="6"
                    >
                    </ellipse>
                  </svg>
                  <svg class="Ellipse_238  disabled">
                    <ellipse
                      id="Ellipse_238"
                      rx="6"
                      ry="6"
                      cx="6"
                      cy="6"
                    >
                    </ellipse>
                  </svg>
                  <svg class=" Ellipse_239 disabled">
                    <ellipse
                      id="Ellipse_239"
                      rx="6"
                      ry="6"
                      cx="6"
                      cy="6"
                    >
                    </ellipse>
                  </svg>
                </div>
                <div class="stat ">
                  <div class="status complete">
                    <h5>Order confirmed</h5>
                    <span class="subtext">Your order has been confirmed</span>
                  </div>
                  <div class="status active mt-5">
                    <h5>Processing</h5>
                    <span class="subtext">Order is being packed for delivery</span>
                    <div id="Market_Square_Ada_George__9_Ad">
                      <span>Market Square Ada George</span>
                      <br>
                      <span class="subtext"> 9 Ada George, Port Harcourt, Rivers.</span>
                    </div>
                  </div>
                  <div class="status mt-5">
                    <h5>Dispatched</h5>
                  </div>
                  <div class="status mt-5">
                    <h5>Delivered</h5>
                  </div>
                </div>

              </div>
            </div>
            <div class="card order-items mt-3 p-4">
              <h5 class="title card-title text-left text-capitalize">Your order</h5>
              <table class="table table-responsive card-body bg-white">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col"></th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>

                    <td class="">

                      <img
                        src="../assets/img/cartimage.png"
                        alt=""
                        class="img"
                      >

                    </td>
                    <td class="productname">Wind Hand Sanitizer 500 ml</td>
                    <td>
                      <div class="qty">5</div>
                    </td>
                    <td>₦3,000 </td>
                    <td>₦3,000 </td>
                  </tr>
                  <tr>

                    <td class="">

                      <img
                        src="../assets/img/cartimage.png"
                        alt=""
                        class="img"
                      >

                    </td>
                    <td class="productname">Wind Hand Sanitizer 500 ml</td>
                    <td>
                      <div class="qty">5</div>
                    </td>
                    <td>₦3,000 </td>
                    <td>₦3,000 </td>
                  </tr>

                  <tr>

                    <td class="">

                      <img
                        src="../assets/img/cartimage.png"
                        alt=""
                        class="img"
                      >

                    </td>
                    <td class="productname">Wind Hand Sanitizer 500 ml</td>
                    <td>
                      <div class="qty">5</div>
                    </td>
                    <td>₦3,000 </td>
                    <td>₦3,000 </td>
                  </tr>

                  <tr>

                    <td class="">

                      <img
                        src="../assets/img/cartimage.png"
                        alt=""
                        class="img"
                      >

                    </td>
                    <td class="productname">Wind Hand Sanitizer 500 ml</td>
                    <td>
                      <div class="qty">5</div>
                    </td>
                    <td>₦3,000 </td>
                    <td>₦3,000 </td>
                  </tr>

                </tbody>
              </table>
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
  name: 'Orderview',
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
<style scoped>
#Order_Tracker {
  height: 350px;
  display: flex;
}
.status.complete h5,
.status.active h5 {
  text-align: left;
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 0;
}

.status h5 {
  text-align: left;
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: rgba(124, 124, 124, 1);
}

.subtext {
  text-align: left;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: rgba(152, 152, 152, 1);
}

#Market_Square_Ada_George__9_Ad {
  width: 401px;
  height: 34px;
  text-align: left;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 1);
}

.Rectangle_2828 {
  width: 2px;
  height: 350px;
  fill: rgba(229, 229, 229, 1);
}

#Group_7638 {
  position: absolute;
  width: 36px;
  height: 36px;
  left: 8px;
  top: 65px;
  overflow: visible;
}
.track .complete {
  fill: rgba(53, 49, 144, 1);
}
.track .active {
  fill: rgba(53, 49, 144, 1);
}
.Ellipse_237_ed {
  position: absolute;
  overflow: visible;
  width: 12px;
  height: 12px;
  left: 19px;
  top: 167px;
}
.disabled {
  fill: rgba(229, 229, 229, 1);
}
.Ellipse_238 {
  position: absolute;
  overflow: visible;
  width: 12px;
  height: 12px;
  left: 19px;
  top: 293px;
}
.Ellipse_239 {
  position: absolute;
  overflow: visible;
  width: 12px;
  height: 12px;
  left: 19px;
  top: 363px;
}
#order #check {
  overflow: visible;
  position: absolute;
  left: 11px;
  top: 5px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
</style>

