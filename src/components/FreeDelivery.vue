<template>
  <div id="FreeDelivery">

    <div v-if="isPromo && cart_total == 0" class="text-center promotion_alert_header">
      Shop for &#x20A6;{{cart_amount_qualify.toLocaleString()}} and get FREE Delivery <span class="text-black">Expires {{countdown_left}}.</span><br>
      <small><b>Get FREE &#x20A6;1,000 Gift Card on orders from &#x20A6;15,000.</b></small>
    </div>

    <div v-else-if="isPromo && cart_total < cart_amount_qualify" class="text-center promotion_alert_header">
      Add &#x20A6;{{qualify.toLocaleString()}} more and get FREE Delivery <span class="text-black">Expires {{countdown_left}}.</span> <br>
      <small><b>Get FREE &#x20A6;1,000 Gift Card on orders from &#x20A6;15,000.</b></small>
    </div>

    <div v-else-if="isPromo && cart_total >= cart_amount_qualify && cart_amt < 15000" class="text-center promotion_alert_header">
      FREE delivery won! Add &#x20A6;{{(15000 - cart_amt).toLocaleString()}} more to get FREE &#x20A6;1,000 Gift Card. <span class="text-black">Expires {{countdown_left}}.</span>
    </div>

    <div v-else-if="isPromo && cart_total >= cart_amount_qualify && cart_amt >= 15000" class="text-center promotion_alert_header">
        FREE delivery + &#x20A6;1,000 Gift Card won! <span class="text-black">Expires {{countdown_left}}.</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FreeDelivery',
  data () {
    return {
      url: window.location.origin,
      isPromo: false,
      countdown_left: '',
      cart_amount_qualify:10000,
    }
  },
  computed : {
    cart_total () {
      return this.$store.getters.cart_total
    },

    qualify () {
      return (this.cart_amount_qualify - Number(this.cart_total))
    },

    cart_amt () {
      return Number(this.cart_total);
    }
  },
  created () {
    // this.$store.getters.startstring   = "Jun 27, 2021 00:00:59";// set start date here   >>>
    // this.$store.getters.futurestring  = "Jul 3, 2021 23:59:59"; // set future date here; >>>

    let startstring  = this.$store.getters.startstring;         
    let futurestring = this.$store.getters.futurestring;

    //=>>Format todays date
    let montharray      = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
    let today           = new Date();
    let today_y         = today.getFullYear();
    let today_m         = today.getMonth();
    let today_d         = today.getDate();
    let today_h         = today.getHours();
    let today_min       = today.getMinutes();
    let today_sec       = today.getSeconds();
    let todaystring     = montharray[today_m]+" "+today_d+", "+today_y+" "+today_h+":"+today_min+":"+today_sec;

    //=> Get diffrences
		let dd              = Date.parse(futurestring) - Date.parse(todaystring);
	  let dday            = Math.floor(dd/(60*60*1000*24)*1);
		let dhour           = Math.floor((dd%(60*60*1000*24))/(60*60*1000)*1);
		let dmin            = Math.floor(((dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
		let dsec            = Math.floor((((dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);

    //=> Get time
    let today_time      = today.getTime();
    let start_time      = new Date(startstring).getTime();
    let end_time        = new Date(futurestring).getTime();

    
    if(today_time <= end_time && start_time <= today_time){
          this.isPromo = true;

          if(dday == 0){
                this.countdown_left = "Today";
          }
          else if(dday == 1){
                this.countdown_left = "Tomorrow";
          }
          else{
                this.countdown_left = " in " + dday + " Days";
          }
    }
    else{
      this.isPromo = false;
    }
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@800&display=swap');

.promotion_alert_header {
 margin: 0;
    padding: 15px 0;
    background: #f40909;
    background-image: url(https://cdn.marketsquareng.website/images/promo_bg_img.png);
    color: yellow;
    font-size: 28px;
    font-weight: 900;
    font-family: 'Baloo Bhai 2', cursive;
    background-position: 50% 99%;
    background-size: contain;
    background-blend-mode: darken;
    background-repeat: no-repeat;
    line-height: 20px;
}
.text-black{
  color:#fff;
    font-family: 'Baloo Bhai 2', cursive;
}
.promotion_alert_header > small {
    position: relative;
    top: 6px;
    font-size: 50%;
}

@media screen and (max-width:500px) {
  .promotion_alert_header {
      font-size: 14px;
      padding: 15px 0;
  }
  .promotion_alert_header > small {
      position: relative;
      top: 6px;
      font-size: 80%;
  }
}
</style>