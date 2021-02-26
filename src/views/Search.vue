<style scoped>
.btn {
  background: #000066 !important;
  color: #fff !important;
  box-shadow: 2px 3px #ccc; 
  /* margin-bottom: 10px; */
}
.text {
  font-size: 15px;
}
.searchError{
  font-size: 16px;
  font-weight: bold;
}
.rounded {
  width: 30vh;
  /* height: */
}
</style>
<template>
  <div>
    <Disclaimer />
    <TopNav></TopNav>

    <div class="search page">
      
      <div class="container">
        
        <div class="content">
          <h4 class="my-3"> Search Results - {{searchQuery.toUpperCase()}}</h4>

          <div class="product-group container bg-white my-2 py-2">
            

            <div v-if="products.length < 1 && !this.loader.isActive" class="text-center" style="width: inherit;">
              <img class="rounded mx-auto mb-2" src="../assets/img/app/failed_search.jpg"/>
              <p class="searchError">We didn't find results for <i>"{{searchQuery}}".</i></p>
              <p class="text"> - Kindly double-check the spelling or use simple or related words.</p>
              <p class="text"> - The product you are looking for might be in our store but not yet online.</p>
              <p><div class="btn mr-auto mb-2" @click="chat()">Chat To Find Offline Products</div>
              <div class="btn ml-2 mb-2" @click="$router.push('/home#menu')">Continue Shopping</div></p>
            </div>
            <div class="row mt-4 pb-2 px-md-2 pb-sm-2">
              <div
                v-for="(product, index) in products"
                v-bind:key="index"
                class="col-6 col-md-3 col-lg-2 p-1"
              >
                <Product :product="product" 
                v-bind:key="product.sku"  @viewProduct="viewProduct($event)" :index="product.id" />
              </div>

              <!-- <infinite-loading
                @distance="1"
                @infinite="fetchProducts"
              >
                <div slot="no-more">
                  <!-- <i class="material-icons text-center">info_outline</i> -->
                  <!-- <i>No more items</i> -->

                <!-- </div> -->
                <!-- <div slot="no-results"> -->
                  <!-- <i class="material-icons text-center">not_interested</i>
                  <i>No item</i> -->

                <!-- </div> -->
              <!-- </infinite-loading>  -->

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


<script>
import StoreSelector from '@/components/StoreSelector.vue'
import Cart from '@/components/CartComponent.vue'
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import Disclaimer from '@/components/Disclaimer.vue'
import Product from '@/components/Product.vue'
import ProductModal from '@/components/ProductModal.vue'
export default {
  name: 'Search',
  components: {
    StoreSelector, Cart, TopNav, Footer, Disclaimer, Product, ProductModal
  },
  data () {
    return {
      showSearch: false,
      viewproduct: false,
      image_url: this.$request.url,
      searchQuery: "",
      storeid: '',
      page: 0,
      products: [],
      pro: '',
      loader: ''
    }
  },
  beforeMount () {
    this.$store.dispatch('ToggleShowSearch', true);
    this.loader = this.$loading.show();
  },
  mounted () {

    this.storeid = this.$store.getters.store.id
    this.searchQuery = this.$route.params.search
    this.fetchProducts();
    document.title = this.searchQuery.toUpperCase() + ' | ' + this.$store.getters.store.name
  },
  methods: {
    chat() {
      Tawk_API.toggle();
    },
    fetchProducts ($state) {
      this.page += 1;
      let req = {
        what: "search",
        showLoader: false,
        params: {
          storeid: this.storeid,
          search_query: this.searchQuery,
          page: this.page
        }
      }
      this.$request.makeGetRequest(req)
        .then(res => {

          if (res.type == 'search') {
            // console.log(res.data.data.data)
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
            if (pro.length > 0) {
              pro.forEach($product => this.products.push($product));
              if ($state) $state.loaded();
            } else {
              if ($state) $state.complete();
            }
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

