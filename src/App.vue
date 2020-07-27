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
  }
}
</script>

<style>
</style>
