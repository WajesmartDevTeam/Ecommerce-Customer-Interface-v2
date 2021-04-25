<template>
  <div id="FreeDelivery">
    <div v-if="isPromo" class="text-center promotion_alert_header">
      Add <strong class="countdown_left">&#x20A6;{{cart_amount_qualify.toLocaleString()}}</strong> for FREE delivery. Free delivery expires  <span class="countdown_left blinking">{{countdown_left}}</span>
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
      countdown_left: "",
      cart_amount_qualify:10000
    }
  },
  created () {
    let count_start = "April 25, 2021";
    let count_end   = "May 3, 2021 23:59:59";


    let today_date        = new Date();
    let today             = today_date.getTime();
    let today_promo_y     = today_date.getFullYear();
    let today_promo_m     = today_date.getMonth();
    let today_promo_d     = today_date.getDate();


    let start_promo       = new Date(count_start).getTime();

    
    let end_promo_date    = new Date(count_end);
    let end_promo         = end_promo_date.getTime();
    let end_promo_y       = end_promo_date.getFullYear();
    let end_promo_m       = end_promo_date.getMonth();
    let end_promo_d       = end_promo_date.getDate();


    let day_before_end    = new Date(count_end).setDate(new Date(count_end).getDate() - 1);
    let day_before_end_y  = new Date(day_before_end).getFullYear();
    let day_before_end_m  = new Date(day_before_end).getMonth();
    let day_before_end_d  = new Date(day_before_end).getDate();

    console.log(today, end_promo);

    
    if((today >= start_promo) && (today <= end_promo)){
      this.isPromo = true;

          if(end_promo_y == today_promo_y && end_promo_m == today_promo_m && end_promo_d == today_promo_d)
                this.countdown_left = "Today";

          else if(day_before_end_y == today_promo_y && day_before_end_m == today_promo_m && day_before_end_d == today_promo_d)
                this.countdown_left = "Tomorrow";

          else{
                this.countdown_left = " in " + (end_promo_date.getDate() - today_date.getDate()) + " Days";
          }
    }
    else 
      this.isPromo = false;
    


  }
}


</script>

<style scoped>
.countdown_left{
    font-size: 14px !important;
    background: transparent;
}
.promotion_alert_header {
    margin: 0;
    padding: 25px 0;
    background: #2b2d42;
    background-image: url(https://d2guulkeunn7d8.cloudfront.net/assets/alternate_retailers/top_banner@2x-31cdaa743f689f9da8b2bd235918009831fff1faa0a50bac28ec2520b8350d6b.png);
    color: #ffffff;
    font-size: 14px;
}

.blinking{
    animation:blinkingText 7.5s infinite;
}
@keyframes blinkingText{
    0%{     color: #fff; background: transparent; }
    59%{    color: #fff; background: transparent; }
    100%{   color: #fff; background: transparent;}
}


@media screen and (max-width:500px) {
  .countdown_left{
      margin-left: 3px;
      font-style: 16px !important;
  }
  .promotion_alert_header {
      font-size: 12px;
  }
}
</style>