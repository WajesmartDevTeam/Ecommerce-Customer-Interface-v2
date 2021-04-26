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
    //=>> Set date variables here.
    let startstring     = "April 25, 2021";       // set start date here   >>>
    let futurestring    = "May 3, 2021 23:59:59"; // set future date here; >>>
    //=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    //=>>Format todays date below. - untouched!
    let montharray      = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
    let today           = new Date();
    let today_y         = today.getFullYear();
    let today_m         = today.getMonth();
    let today_d         = today.getDate();
    let today_h         = today.getHours();
    let today_min       = today.getMinutes();
    let today_sec       = today.getSeconds();
    let todaystring     = montharray[today_m]+" "+today_d+", "+today_y+" "+today_h+":"+today_min+":"+today_sec;

   
    //=> Parse date and get diffrences below;
		let dd              = Date.parse(futurestring) - Date.parse(todaystring);
	  let dday            = Math.floor(dd/(60*60*1000*24)*1);
		let dhour           = Math.floor((dd%(60*60*1000*24))/(60*60*1000)*1);
		let dmin            = Math.floor(((dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
		let dsec            = Math.floor((((dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);


    //=> Get time as milliseconds.
    let today_time      = today.getTime();
    let start_time      = new Date(startstring).getTime();
    let end_time        = new Date(futurestring).getTime();

    
    
    if((today_time >= start_time) && (today_time <= end_time)){
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

<style scoped>
.countdown_left{
    font-size: 14px !important;
    background: transparent;
}
.promotion_alert_header {
    margin: 0;
    padding: 25px 0;
    background: #ff0102;
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