<template>
  <div class="cartcomponent">
    <div
      id="cart-icon"
      data-toggle="modal"
      data-target="#sidecart"
    >
      <p id="cart-count">
        <span class="material-icons">
          local_mall
        </span>
        <span> 4 Item</span>
      </p>
      <button id="cart-price">₦1,620</button>
    </div>

    <!-- Sidecart Modal -->
    <div
      class="modal fade"
      id="sidecart"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="count modal-title">
              <span class="material-icons ">
                local_mall
              </span>
              <span> 4 Item</span>
            </p>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-0">
            <div>
              <div class="cart-item row">
                <div class="col-4 p-0">
                  <img
                    src="../assets/img/0589.png"
                    alt=""
                    class="img-fluid"
                  >
                </div>
                <div class="col-8">
                  <p class="name">Indomie Chicken</p>
                  <p class="price">₦ 1,865</p>
                  <div class="addquantity">
                    <div class="value-button decrease">-</div>
                    <input
                      oninput="validity.valid||(value='');"
                      id="0"
                      type="number"
                      min="1"
                      class="number"
                    >
                    <div class="value-button increase">+</div>
                  </div>
                </div>
              </div>
              <div class="cart-item row">
                <div class="col-4 p-0">
                  <img
                    src="../assets/img/00070.png"
                    alt=""
                    class="img-fluid"
                  >
                </div>
                <div class="col-8">
                  <p class="name">Indomie Chicken</p>
                  <p class="price">₦ 1,865</p>
                  <div class="addquantity">
                    <div class="value-button decrease">-</div>
                    <input
                      oninput="validity.valid||(value='');"
                      id="0"
                      type="number"
                      min="1"
                      class="number"
                    >
                    <div class="value-button increase">+</div>
                  </div>
                </div>
              </div>
              <div class="cart-item row">
                <div class="col-4 p-0">
                  <img
                    src="../assets/img/0581.png"
                    alt=""
                    class="img-fluid"
                  >
                </div>
                <div class="col-8">
                  <p class="name">Indomie Chicken</p>
                  <p class="price">₦ 1,865</p>
                  <div class="addquantity">
                    <div class="value-button decrease">-</div>
                    <input
                      oninput="validity.valid||(value='');"
                      id="0"
                      type="number"
                      min="1"
                      class="number"
                    >
                    <div class="value-button increase">+</div>
                  </div>
                </div>
              </div>
              <div class="cart-item row">
                <div class="col-4 p-0">
                  <img
                    src="../assets/img/00070.png"
                    alt=""
                    class="img-fluid"
                  >
                </div>
                <div class="col-8">
                  <p class="name">Indomie Chicken</p>
                  <p class="price">₦ 1,865</p>
                  <div class="addquantity">
                    <div class="value-button decrease">-</div>
                    <input
                      oninput="validity.valid||(value='');"
                      id="0"
                      type="number"
                      min="1"
                      class="number"
                    >
                    <div class="value-button increase">+</div>
                  </div>
                </div>
              </div>
              <div class="cart-item row">
                <div class="col-4 p-0">
                  <img
                    src="../assets/img/0581.png"
                    alt=""
                    class="img-fluid"
                  >
                </div>
                <div class="col-8">
                  <p class="name">Indomie Chicken</p>
                  <p class="price">₦ 1,865</p>
                  <div class="addquantity">
                    <div class="value-button decrease">-</div>
                    <input
                      oninput="validity.valid||(value='');"
                      id="0"
                      type="number"
                      min="1"
                      class="number"
                    >
                    <div class="value-button increase">+</div>
                  </div>
                </div>
              </div>
            </div>
            <p class="minimum text-bold">₦3,000 Minimum</p>
            <div class="checkout">
              <button @click="$router.push('cart')">
                <span>Checkout</span>
                <span class="total">₦ 10,865</span>
              </button>
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
  props: {
    msg: String
  },
  methods: {

  }
}
</script>


<style scoped>
</style>
