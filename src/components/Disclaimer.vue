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
      <p>Product images may differ from the actual products.</p>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'Disclaimer',
  data () {
    return {
      showA: false,
      showB: false
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