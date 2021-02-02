<template>
    <div
        ref='pro'
        v-if='viewproduct'
        class="modal fade"
        id="product"
        tabindex="-1"
        role="dialog"
        data-keyboard="false"
        data-backdrop="static"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">

              <button
                @click.prevent='doSomethingOnHidden($event)'
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-4">

                  <img
                    v-if="pro.img_url.includes('https://cdn.marketsquareng.website')"
                    :src="pro.img_url"
                    alt=""
                    class="img-fluid"
                  >
                  <img
                    v-else
                    :src="image_url+pro.img_url"
                    alt=""
                    class="img-fluid"
                  >
                </div>
                <div  :class="category.toLowerCase().includes('hamper') ? 'col-2' : 'col-7'">
                  <div class="product-text" >
                    <p class="name mb-2" style="height: auto !important">{{pro.name}}</p>
                    <p
                      v-if="pro.description && (pro.description.includes('/KG') || pro.description.includes('/ KG'))"
                      class="weight"
                    >(Per Kg)</p>
                  </div>
                  <div class="product-cat d-flex">
                    <span class="badge text-lowercase">{{pro.category}}</span>
                  </div>
                  <div class="product-footer">
                    <p class="price">
                      <span v-if="pro.promo">
                        <span style="color:#808080;font-size:13px;"><s>₦{{ formatPrice(pro.sellingprice) }}</s></span> <br>
                        <span>₦{{ formatPrice(Math.round((pro.promo.value_percent/100)*pro.sellingprice)) }}</span>
                      </span>
                      <span v-else-if="pro.old_price">
                        <span style="color:#808080;font-size:12px;"><s>₦{{ formatPrice(pro.old_price) }}</s></span> <br>
                        <span>₦{{ formatPrice(pro.sellingprice) }}</span>
                      </span>
                      <span
                        v-else
                        class="price"
                      > ₦{{ formatPrice(pro.sellingprice) }}</span>

                    </p>

                    <button
                      :id="'btntp_modal'"
                      class="addtocart"
                      :style="{'text-align: left !important' : pro.category.toLowerCase().includes('hampers')}"
                      v-bind:class="pro.hidebtn? 'hideqty':''"
                      @click="addToCart(pro, 'addtp_modal' ,'btntp_modal' ,'tp_modal')"
                    >
                      <img
                        src="../assets/img/cart.png"
                        class="img1"
                        alt=""
                      >
                      <img
                        class="d-none img2"
                        src="../assets/img/cart-white.png"
                        alt=""
                      >

                      <span>Add to cart</span>
                    </button>
                    <button
                      :id="'addtp_modal'"
                      class="addquantity"
                      :style="{'text-align: left !important' : pro.category.toLowerCase().includes('hampers')}"
                      v-bind:class="pro.hideqty? 'hideqty':''"
                    >
                      <div
                        @click="decreaseQuantity('tp_modal', pro.id)"
                        class=" decrease"
                      >-</div>
                      <input
                        v-if="pro.description.includes('/KG') || pro.description.includes('/ KG')"
                        oninput="validity.valid||(value='');"
                        id='tp_modal'
                        type="number"
                        min="0.001"
                        step="any"
                        class="number"
                        :value=pro.cart_qty
                        @keypress="restrictChars($event)"
                        @change="inputChange('tp_modal', pro.id)"
                      >

                      <input
                        v-else
                        id='tp_modal'
                        type="number"
                        min="0"
                        step="1"
                        class="number"
                        :value=pro.cart_qty
                        @keypress="restrictChars($event)"
                        @change="inputChange('tp_modal', pro.id)"
                      />

                      <div
                        @click="increaseQuantity('tp_modal', pro.id)"
                        class=" increase"
                      >+</div>
                    </button>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12" v-if="category.toLowerCase().includes('hamper')">
                  <div class="description p-0 m-0">
                    {{pro.description}}
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
    name: 'ProductModal',
    props: ['viewproduct', 'pro', 'products'],
     data () {
    return {
       
      category: '',
      image_url: this.$request.url,
      cart: {
        quantity: "",
        unit_price: "",
        price: "",
        product: {
          id: "",
          name: "",
          price: "",
          img_url: ""
        }
      },
    }
  },

  methods: {
        addToCart (product, addid, addbtn, id) {
            document.getElementById(addid).classList.remove('hideqty');
            document.getElementById(addbtn).classList.add('hideqty')
            // this.loading = true;
            if (product.promo) {
                product["newprice"] = Math.round(
                (product.promo.value_percent / 100) * product.sellingprice
                );
            } else {
                product["newprice"] = product.sellingprice;
            }
            let cart = {
                product: {}
            }
            cart.quantity = document.getElementById(id).value;
            cart.unit_price = product.newprice;
            cart.price = product.newprice * cart.quantity;
            cart.product.id = product.id;
            cart.product.name = product.name;
            cart.product.price = product.newprice;
            cart.product.img_url = product.img_url;
            let cart_array = this.$store.getters.cart;
            let check = [];
            // cart_array.push(cart)
            if (cart_array.length > 0) {
                cart_array.forEach(i => {
                if (i.product.id == cart.product.id) {
                    check.push(1);
                    i.quantity = parseInt(i.quantity) + 1;
                    i.price += Number(i.unit_price);
                    document.getElementById(id).value = i.quantity;
                }
                else {
                    check.push(0)
                }
                })
                // console.log(check)
                if (!check.includes(1)) {
                cart_array.push(cart)
                }
            }
            else {
                cart_array.push(cart)
            }
            this.$store.dispatch('addToCart', cart_array)
        },
        removeFromCart (id) {
            let index;
            let cart = this.$store.getters.cart;
            cart.forEach((i, ind) => {
                if (i.product.id == id) {
                index = ind
                }
            })
            cart.splice(index, 1);
            this.$store.dispatch('addToCart', cart)
        },
        inputChange (id, product_id) {
            var value = document.getElementById(id).value;
            if (value == 0) {
                document.getElementById('add' + id).classList.add('hideqty');
                document.getElementById('btn' + id).classList.remove('hideqty');
                this.removeFromCart(product_id);
            }
            else if (Math.sign(value) == '-1') {
                value = 1;
                document.getElementById(id).value = 1;
            }
            else {

            }
            this.updateCartQuantity(value, product_id, "input");

        },
        increaseQuantity (id, product_id) {
            var value = document.getElementById(id).value
            var v = Number(value) + 1;
            document.getElementById(id).value = v;
            this.updateCartQuantity(v, product_id, "+");

        },
        decreaseQuantity (id, product_id) {
            var value = document.getElementById(id).value;

            if (value != 0) {
                value = Number(value) - 1;
                if (value == 0) {
                document.getElementById('add' + id).classList.add('hideqty');
                document.getElementById('btn' + id).classList.remove('hideqty')
                this.removeFromCart(product_id)
                }
                else {
                document.getElementById(id).value = value;
                }
            }
            else {
                value = 1;
                document.getElementById(id).value = value;
            }
            this.updateCartQuantity(value, product_id, "-");

        },
        updateCartQuantity (value, product_id, action) {
            let cart_array = this.$store.getters.cart;
            cart_array.forEach(i => {
                if (product_id == i.product.id) {
                if (action == '+') {
                    i.quantity = parseInt(i.quantity) + 1;
                    i.price += parseInt(i.unit_price);
                }
                else if (action == '-') {
                    i.quantity = parseInt(i.quantity) - 1;
                    i.price -= parseInt(i.unit_price);
                }
                else {
                    i.quantity = value;
                    i.price = parseInt(i.unit_price) * value;

                }
                }
            })
            this.$store.dispatch('addToCart', cart_array)
        },
        restrictChars: function ($event) {
            if ($event.key !== '-' || $event.code !== 'Minus') {
                return true
            } else {
                $event.preventDefault();
            }
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
        doSomethingOnHidden ($event) {
            history.back()
            let cart = this.$store.getters.cart;
            if(Array.isArray(this.products)) {
              this.products.forEach(i => {
                  i.hidebtn = false;
                  i.hideqty = true;
                  i.cart_qty = i.description.includes('/KG') || i.description.includes('/ KG') ? 1.0 : 1;
                  cart.forEach(j => {
                      if (i.id == j.product.id) {
                          i.hidebtn = true;
                          i.hideqty = false;
                          i.cart_qty = j.quantity;
                      }
                  })
              })
            } else {
              this.products.top.forEach(i => {
                i.hidebtn = false;
                i.hideqty = true;
                i.cart_qty = i.description.includes('/KG') || i.description.includes('/ KG') ? 1.0 : 1;
                cart.forEach(j => {
                  if (i.id == j.product.id) {
                    i.hidebtn = true;
                    i.hideqty = false;
                    i.cart_qty = j.quantity;
                  }

                })
              })
              this.products.beverages.forEach(i => {
                i.hidebtn = false;
                i.hideqty = true;
                i.cart_qty = i.description.includes('/KG') || i.description.includes('/ KG') ? 1.0 : 1;
                cart.forEach(j => {
                  if (i.id == j.product.id) {
                    i.hidebtn = true;
                    i.hideqty = false;
                    i.cart_qty = j.quantity;
                  }

                })
              })
              this.products.water.forEach(i => {
                i.hidebtn = false;
                i.hideqty = true;
                i.cart_qty = i.description.includes('/KG') || i.description.includes('/ KG') ? 1.0 : 1;
                cart.forEach(j => {
                  if (i.id == j.product.id) {
                    i.hidebtn = true;
                    i.hideqty = false;
                    i.cart_qty = j.quantity;
                  }

                })
              })
              this.products.commodities.forEach(i => {
                i.hidebtn = false;
                i.hideqty = true;
                i.cart_qty = i.description.includes('/KG') || i.description.includes('/ KG') ? 1.0 : 1;
                cart.forEach(j => {
                  if (i.id == j.product.id) {
                    i.hidebtn = true;
                    i.hideqty = false;
                    i.cart_qty = j.quantity;
                  }

                })
              })
            }
        },
    }
    
}
</script>

<style scoped>

</style>