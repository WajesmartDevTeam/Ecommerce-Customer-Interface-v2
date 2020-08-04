<template>
  <div id="app">
    <TopNav v-bind:class="$route.name=='Login' || $route.name=='Register' ?'d-none': ''"></TopNav>
    <router-view />
    <Footer v-bind:class="$route.name=='Login' || $route.name=='Register' ?'d-none': ''"></Footer>
  </div>
</template>


<script>
// @ is an alias to /src
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    TopNav, Footer
  },
  data () {
    return {
      area: "",
      store: "",
    }
  },
  mounted () {
    // console.log(this.$store.getters.isStoreSet);
    // console.log(this.$store.getters.store);
    // console.log(this.$store.getters.area);
    // this.store = this.$store.getters.store;
    // this.area = this.$store.getters.area;
  },
}
</script>

<style>
</style>
