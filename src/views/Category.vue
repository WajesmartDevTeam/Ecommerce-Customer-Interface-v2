<template>
  <div>
    <Disclaimer />
    <TopNav></TopNav>
    <div class="category page">
      <div class="container">
        <div
          class="banner category-banner mt-5"
          v-bind:class='category.replace(/\s+/g, "")'
        >
          <div
            class="banner-text"
            style="width:100%"
          >
            <!-- <h3 class="title text-center text-capitalize">{{category}}</h3> -->

          </div>
        </div>
        <div class="content">

          <div class="product-group container bg-white my-5 py-2">

            <div  class="row mt-4 pb-2  px-md-2 pb-sm-2">
             <div class="col-6 col-md-3 col-lg-2 p-1" v-for="(product, index) in products" :key="index">
                <Product :product="product" 
                v-bind:key="product.sku"  @viewProduct="viewProduct($event)" :index="product.id" />
              
             </div>
              <infinite-loading
                @distance="1"
                @infinite="fetchProducts"
              >
                <div slot="no-more">
                  <!-- <i class="material-icons text-center">info_outline</i> -->
                  <!-- <i>No more items</i> -->

                </div>
                <div slot="no-results">
                  <!-- <i class="material-icons text-center">not_interested</i>
                  <i>No item</i> -->

                </div>
              </infinite-loading>

            </div>
            
          </div>

        </div>
      </div>
      <storeSelector></storeSelector>
      <Cart :products="products" />
      <!-- Product Modal -->
      <ProductModal :viewproduct="viewproduct" :pro="pro" :products="products"/>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>
/* html {
  --lh: 1.4rem;
  line-height: var(--lh);
} */

.truncate-overflow {
  /* --max-lines: 2; */
  position: relative;
  /* max-height: calc(var(--lh) * var(--max-lines)); */
  max-height: 2.3rem;
  overflow: hidden;
  padding-right: 1rem; /* space for ellipsis */
}
.truncate-overflow::before {
  position: absolute;
  content: "...";
  inset-block-end: 0; /* "bottom" */
  inset-inline-end: 0; /* "right" */
}
.truncate-overflow::after {
  content: "";
  position: absolute;
  inset-inline-end: 0; /* "right" */
  width: 1rem;
  height: 1rem;
  background: white;
}
.desc{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script>
import * as $ from "jquery";
import StoreSelector from '@/components/StoreSelector.vue'
import Cart from '@/components/CartComponent.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import Disclaimer from '@/components/Disclaimer.vue'
import Product from '@/components/Product.vue'
import ProductModal from '@/components/ProductModal.vue'
export default {
  name: 'Category',
  components: {
    StoreSelector, Cart, TopNav, Footer, Disclaimer, Product, ProductModal
  },
  data () {
    return {
      loader: '',
      showSearch: false,
      viewproduct: false,
      category: '',
      image_url: this.$request.url,
      page: 0,
      products: [],
      pro: '',
      searchQuery: '',
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

  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true);
    this.loader = this.$loading.show();
  },
  mounted () {

    this.category = this.$route.params.cat
    this.searchQuery = this.$route.params.searchQuery != undefined ? this.$route.params.searchQuery : null
    if(this.$store.getters.isStoreSet) {
      this.fetchProducts()
    } else {
      this.loader.hide();
    }
  },
  methods: {
    fetchProducts ($state) {
      this.page += 1; ``
      let req = {
        what: "categories",
        showLoader: false,
        params: {
          storeid: this.$store.getters.store.id,
          category: this.category,
          search: this.searchQuery,
          page: this.page
        }
      }
      this.$request.makeGetRequest(req)
        .then(res => {
          if (res.type == 'categories') {
            let pro = res.data.data.data;
            let cart = this.$store.getters.cart;
            pro.forEach(i => {


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
            console.log(pro)
            // console.log(this.$store.getters.cart)
            if (pro.length > 0) {
              pro.forEach($product => this.products.push($product));
              if ($state) $state.loaded();
            } else {
              if ($state) $state.complete();
            }

            // let path = '..'
            // i.img_url = path.concat(i.img_url)
            this.loader.hide()
          }

        })
        .catch(error => {

          console.log(error)
        });
    },
    viewProduct (product) {
      
      this.pro = product;
      this.viewproduct = true
    },
  }
}

</script>

