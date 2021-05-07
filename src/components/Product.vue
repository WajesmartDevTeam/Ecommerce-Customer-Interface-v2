<template>
 <!-- <div :class="isProductPromotion() ? 'col-6 col-md-3 col-lg-3 p-1' : 'col-6 col-md-3 col-lg-2 p-1'"> -->
    <div class="product p-md-2 p-sm-1" style="height: auto !important">
        <div
        @click="viewProduct(product)"
        class="product-image"
        data-target="#product"
        data-toggle="modal"
        >
        <img
            v-if="product.img_url.includes('https://cdn.marketsquareng.website')"
            v-lazy="product.img_url"
            alt=""
            class="img-fluid"
        >
        <img
            v-else
            v-lazy="image_url+product.img_url"
            alt=""
            class="img-fluid"
            :style="isProductPromotion() ? 'height:110% !important' : ''"
        >
        </div>
        <div
        @click="viewProduct(product)"
        class="product-text"
        style="margin: auto !important;"
        data-target="#product"
        data-toggle="modal"
        >
        <p class="description">{{product.name}}</p>

        <div v-if="isProductPromotion()">
            <p class="description  desc mt-2" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"><b>Content: </b>{{product.description}}</p>
            <p class="description"><a @click.prevent="" style="text-decoration: underline !important; color: #000066;">View Full Content</a></p>
        </div>

        </div>
        <div class="product-footer" style="height: auto !important">
        <p class="price">
            <span v-if="product.promo">
            <span style="color:#808080;font-size:12px;"><s>₦{{ formatPrice(product.sellingprice) }}</s></span> <br>
            <span>₦{{ formatPrice(Math.round((product.promo.value_percent/100)*product.sellingprice)) }}</span>
            </span>
            <span v-else-if="product.old_price != null && product.old_price != 'NULL' && product.old_price != '' && Number(product.old_price) > 0">
            <span style="color:#808080;font-size:12px;"><s>₦{{ formatPrice(product.old_price) }}</s></span> <br>
            <span>₦{{ formatPrice(product.sellingprice) }}</span><span style="background-color: #ffcccb; font-size:12px;" class="float-right pr-1 pl-1">{{Math.round((( Number(product.sellingprice) - Number(product.old_price))/Number(product.old_price)) * 100)}}%</span>
            </span>
            <span
            v-else
            class="price"
            ><br> ₦{{ formatPrice(product.sellingprice) }}</span>
        </p>
        <button
            :id="'btntp'+index"
            class="addtocart"
            v-bind:class="product.hidebtn? 'hideqty':''"
            @click="addToCart(product, 'addtp'+index ,'btntp'+index ,'tp'+index)"
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
            :id="'addtp'+index"
            class="addquantity"
            v-bind:class="product.hideqty? 'hideqty':''"
        >
            <div
            @click="decreaseQuantity('tp'+index, product.id)"
            class=" decrease"
            >-</div>
            <input
            v-if="product.description.includes('/KG') || product.description.includes('/ KG')"
            oninput="validity.valid||(value='');"
            :id="'tp'+index"
            type="number"
            min="0.001"
            step="any"
            class="number"
            :value=product.cart_qty
            @keypress="restrictChars($event)"
            @change="inputChange('tp'+index, product.id)"
            >

            <input
            v-else
            oninput="validity.valid||(value='');"
            :id="'tp' +index"
            type="number"
            min="0"
            step="1"
            class="number"
            :value=product.cart_qty
            @keypress="restrictChars($event)"
            @change="inputChange('tp'+index, product.id)"
            />

            <div
            @click="increaseQuantity('tp'+index, product.id)"
            class=" increase"
            >+</div>
        </button>

        </div>

    </div>
 <!-- </div> -->
</template>

<script>
export default {
    name: 'Product',
    props: ['product', 'index'],
  
    data () {
        return {
        viewproduct: false,
        image_url: this.$request.url,
        pro: '',
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
        
        viewProduct (product) {
            history.pushState({}, null, `/product/${product.store_id}/${product.category}/${product.name}`);
            let cart = this.$store.getters.cart;
            cart.forEach(j => {
                if (product.id == j.product.id) {
                product.hidebtn = true;
                product.hideqty = false;
                product.cart_qty = j.quantity;
                }

            })
            this.pro = product;

            this.viewproduct = true
            this.$emit('viewProduct',  this.pro)
        },
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
                // document.getElementById(id).value = 1;
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
            // console.log(value)
            // console.log(action)
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

        isProductPromotion (){
            if(this.product.promotion){
                if(this.product.promotion.toLowerCase().includes('ramadan packs'))
                    return true;
            }
            else{
                return false;
            }
        },
    }
}
</script>

<style scoped>

</style>