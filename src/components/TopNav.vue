<template>
  <div id="header">
    <div
      id="topnav"
      class=""
    >
      <div class=" container">
        <div class="d-flex justify-content-between">

          <ul class="row float-left">
            <li class="navlink  d-sm-block d-md-none">
              <a
                id="openbtn"
                href=""
                class=""
                @click.prevent="openNav()"
              >☰</a>
            </li>
            <li class=" navlink text-capitalize">
              <!-- store not selected -->
              <a
                v-if='$store.getters.isStoreSet==false'
                href=""
                data-toggle="modal"
                data-target="#store"
              >
                <img
                  src="../assets/img/store-icon-sm.png"
                  alt=""
                >
                Select Store

              </a>
              <!-- store selected -->
              <a
                v-else
                href=""
                data-toggle="modal"
                data-target="#store"
              >
                <img
                  src="../assets/img/store-icon-sm.png"
                  alt=""
                >
                Marketsquare Ada George
                <a
                  href=""
                  class="badge badge-pill badge-light"
                  data-toggle="modal"
                  data-target="#store"
                >Change Store</a>
              </a>
            </li>

          </ul>
          <ul class="d-md-flex d-none ">
            <li class=" navlink"><a href="/storelocator">
                <span class="material-icons mr-md-2">
                  location_on
                </span>

                Store Locator </a></li>
            <li class=" navlink"><a href="/giftcard">
                <!-- <span class="material-icons mr-2">
                  card_giftcard
                </span> -->
                <img
                  src="../assets/img/giftcard-icon.png"
                  alt=""
                >
                Gift cards </a></li>
            <li class=" navlink">
              <a href="/contact"> Contact Us </a>
            </li>
            <li class=" navlink ">
              <a href="/login"> Sign in </a>
            </li>
            <li class=" navlink mr-0"><a
                id="register"
                href="/register"
              > Register </a>
            </li>
          </ul>

        </div>
      </div>
    </div>
    <div id="middlenav">
      <div class="container d-flex justify-content-between">
        <div id="logo">
          <a href="/home">
            <img
              class="d-none d-lg-block"
              src="../assets/img/logo-m.png"
              alt="Marketsquare Logo"
            > <img
              class=" d-md-block d-lg-none"
              src="../assets/img/logo_mobile.png"
              alt="Marketsquare Logo"
            >
          </a>
        </div>
        <div
          v-if="$store.getters.showSearch==true"
          id="search"
          class="d-none d-md-block"
        >
          <input
            type="text"
            placeholder="Search your products from here"
          >
          <i class="material-icons">search</i>
        </div>
        <div
          id="cart-icon"
          class="d-flex dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div id="cart-circle">
            <span class="material-icons">
              local_mall
            </span>
            <span id="cart-count">2</span>

          </div>
          <span
            id="cart-price"
            class="ml-2"
          >₦1500</span>
        </div>
        <div class="dropdown-menu cart-dropdown">
          <div class="dropdown-item">
            <div class="row">
              <div class="col-3 icon">
                <img
                  src="../assets/img/store-icon.png"
                  alt=""
                >
              </div>
              <div class="col-9">
                <h5 class="storename">Marketsquare Ada George</h5>
                <p class="cart-info">10 item(s) in Cart</p>
                <p class="price">₦1500</p>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <button id="placeorder-btn">Place Order</button>
              <button id="view-btn">View Store</button>
            </div>

          </div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item">
            <div class="row">
              <div class="col-3 icon">
                <img
                  src="../assets/img/store-icon.png"
                  alt=""
                >
              </div>
              <div class="col-9">
                <h5 class="storename">Marketsquare Ada George</h5>
                <p class="cart-info">10 item(s) in Cart</p>
                <p class="price">₦1500</p>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <button id="placeorder-btn">Place Order</button>
              <button id="view-btn">View Store</button>
            </div>

          </div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item">
            <div class="row">
              <div class="col-3 icon">
                <img
                  src="../assets/img/store-icon.png"
                  alt=""
                >
              </div>
              <div class="col-9">
                <h5 class="storename">Marketsquare Ada George</h5>
                <p class="cart-info">10 item(s) in Cart</p>
                <p class="price">₦1500</p>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <button id="placeorder-btn">Place Order</button>
              <button id="view-btn">View Store</button>
            </div>

          </div>
          <div class="dropdown-divider"></div>

        </div>
      </div>
    </div>
    <div
      id="menu-bar"
      class="d-none  d-md-block"
    >
      <div class="container">
        <ul
          id="menu"
          class="d-flex justify-content-between"
        >
          <li class="menu-link"><a href="/category">Bakery</a></li>
          <li class="menu-link dropdown">
            <a
              href=""
              class="dropdown-toggle"
              data-toggle="dropdown"
            >Groceries</a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>

          <li class="menu-link dropdown">
            <a
              href="/category"
              class="dropdown-toggle"
              data-toggle="dropdown"
            >Food</a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
          <li class="menu-link dropdown">
            <a
              href="/category"
              class="dropdown-toggle"
              data-toggle="dropdown"
            >Drinks</a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
          <li class="menu-link dropdown">
            <a
              href="/category"
              class="dropdown-toggle"
              data-toggle="dropdown"
            >Health & Beauty</a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
          <li class="menu-link dropdown">
            <a
              href="/category"
              class="dropdown-toggle"
              data-toggle="dropdown"
            >Appliances & Accessories</a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
          <li class="menu-link dropdown">
            <a
              href="/category"
              class="dropdown-toggle"
              data-toggle="dropdown"
            >Others</a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- mobile -->

    <!-- <button
            class="openbtn d-sm-block d-md-none"
            @click="openNav()"
          >☰</button> -->

    <div
      id="mySidepanel"
      class="sidepanel d-sm-block d-md-none"
    >
      <a
        href="javascript:void(0)"
        class="closebtn"
        @click.prevent="closeNav()"
      >×</a>
      <a
        href="/home"
        class="sidemenu"
      >Home</a>
      <a
        href="#"
        class="sidemenu"
      >Bakery </a>

      <a
        href="#"
        @click.prevent='toggleDropdown'
        class="dropdown-btn sidemenu"
      >Groceries </a>
      <div class="dropdown-container">
        <a href="#">Groceries</a>
        <a href="#">Confectioneries</a>
        <a href="#">Beverages</a>
        <a href="#">Breakfast Cereal</a>
      </div>
      <a
        href="#"
        @click.prevent='toggleDropdown'
        class="dropdown-btn sidemenu"
      >Food</a>
      <div class="dropdown-container">
        <a href="#">Fresh Produce</a>
        <a href="#">Commodities</a>
        <a href="#">Perishables</a>
        <a href="#">Butchery</a>
        <a href="#">Condiments</a>
      </div>
      <a
        href="#"
        @click.prevent='toggleDropdown'
        class="dropdown-btn sidemenu"
      >Drinks</a>
      <div class="dropdown-container">
        <a href="#">Spirits</a>
        <a href="#">Water</a>
      </div>
      <a
        href="#"
        @click.prevent='toggleDropdown'
        class="dropdown-btn sidemenu"
      >Health & Beauty </a>
      <div class="dropdown-container">
        <a href="#">Medicare</a>
        <a href="#">Toiletries</a>
      </div>
      <a
        href="#"
        @click.prevent='toggleDropdown'
        class="dropdown-btn sidemenu"
      >Appliances & Accessories </a>
      <div class="dropdown-container">
        <a href="#">Household Items</a>
        <a href="#">Accessories</a>
        <a href="#">Small Doestic Appliances</a>
      </div>
      <a
        href="#"
        @click.prevent='toggleDropdown'
        class="dropdown-btn sidemenu"
      >Others </a>
      <div class="dropdown-container">
        <a href="#">Automobile</a>
        <a href="#">Baby Products</a>
        <a href="#">Pet Products</a>
        <a href="#">BMS</a>
        <a href="#">General</a>
      </div>
      <a
        href="/storelocator"
        class="sidemenu"
      >Store Locator </a>
      <a
        href="/giftcard"
        class="sidemenu"
      >Gift Card</a>
      <a
        href="/contact"
        class="sidemenu"
      >Contact Us</a>
      <a
        href="/login"
        class="sidemenu"
      >Login </a>
      <a
        href="/Register"
        class="register sidemenu"
      ><button>Register</button></a>
    </div>

    <!-- mobile end -->
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    msg: String
  },
  methods: {
    openNav () {
      document.getElementById("mySidepanel").style.width = "80%";
    },
    closeNav () {
      document.getElementById("mySidepanel").style.width = "0";
    },
    toggleDropdown (e) {
      document.querySelectorAll('.dropdown-btn').forEach(el => {

        if ((el.nextElementSibling.style.display === "block") && (el != e.target)) {
          el.classList.remove('active');
          el.nextElementSibling.style.display = "none";
        }
      })
      e.target.classList.toggle("active");
      var dropdownContent = e.target.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    }
  }
}
</script>


<style scoped>
</style>
