<template>
  <div id="disclaimer">
    <div
      class="msg"
      v-if="showA"
    >
      <p>Product images may differ from the actual products.</p>
    </div>
    <div
      class="msg"
      v-if="showB"
    >
      <p>We have a demand surge in our stores affecting the availability of some products. We will, however, do our best to get you the items in your order. Kindly bear with us.
        Any refund due to you after your order is processed will be issued via a Market Square gift card which can immediately be used online or in any of our branches.</p>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'Disclaimer',
  data () {
    return {
      showA: false,
      showB: false,
      isPromo: false,
      countdown_left: ""
    }
  },
  created () {
    let current = this.$route.name;
    let arrayA = ['Home', 'Category', 'Search'];
    let arrayB = ['OrderConfirmation'];
    
  

    if (arrayA.includes(current)) {
      this.showA = true;
    }
    else if (arrayB.includes(current)) {
      this.showB = true;
    }
    else { }
  }
}


</script>
<style scoped>
#disclaimer {
  position: sticky;
  top: 0;
}
div.msg {
  display: inline !important;
  text-align: center;
}
p {
  font-size: 11px;
  font-weight: bold;
  margin: auto;
  background: #fbe7a3;
  padding: 5px 0;
}
</style>