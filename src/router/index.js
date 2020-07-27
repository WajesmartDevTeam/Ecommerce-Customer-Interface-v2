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
import Terms from '../views/Terms.vue'
import Privacy from '../views/Privacy.vue'
import About from '../views/About.vue'
import Account from '../views/Account.vue'
import Address from '../views/AddressBook.vue'
import MyOrders from '../views/Orders.vue'
import OrderView from '../views/OrderView.vue'

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
        path: '/category',
        name: 'Category',
        component: Category
    },
    {
        path: '/search',
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
        path: '/orderview',
        name: 'MyOrder',
        component: OrderView
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router