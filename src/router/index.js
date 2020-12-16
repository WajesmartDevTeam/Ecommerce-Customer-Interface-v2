import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import StoreLocator from '../views/StoreLocator.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import OrderConfirmation from '../views/OrderConfirmation.vue'
import GiftCard from '../views/GiftCard.vue'
import Contact from '../views/Contact.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ResetPassword from '../views/Reset.vue'
import Terms from '../views/Terms.vue'
import Privacy from '../views/Privacy.vue'
import About from '../views/About.vue'
import Account from '../views/Account.vue'
import Address from '../views/AddressBook.vue'
import MyOrders from '../views/Orders.vue'
import OrderView from '../views/OrderView.vue'
import Product from '../views/Product.vue'
import NotFound from '../components/404.vue';
// import BlackFriday from '../views/BlackFriday.vue';
import Hampers from '../views/Hampers.vue';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'LandingPage',
        component: LandingPage
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/black-friday',
        name: 'BlackFriday',
        component: Home
    },
    {
        path: '/category/:cat',
        name: 'Category',
        component: Category
    },
    {
        path: '/search/:search',
        name: 'Search',
        component: Search
    },
    {
        path: '/storelocator',
        name: 'StoreLocator',
        component: StoreLocator
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout
    },
    {
        path: '/confirm',
        name: 'OrderConfirmation',
        component: OrderConfirmation
    },
    {
        path: '/giftcard',
        name: 'GiftCard',
        component: GiftCard
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/password/reset/:key',
        name: 'ResetPassword',
        component: ResetPassword
    },
    {
        path: '/terms',
        name: 'Terms',
        component: Terms
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: Privacy
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/account',
        name: 'MyAccount',
        component: Account
    },
    {
        path: '/addressbook',
        name: 'AddressBook',
        component: Address
    },
    {
        path: '/orders',
        name: 'MyOrders',
        component: MyOrders
    },
    {
        path: '/orderview/:id',
        name: 'MyOrder',
        component: OrderView
    },
    {
        path: '/product/:store/:category/:name',
        name: 'Product',
        component: Product
    },
    { path: '*', component: NotFound },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router