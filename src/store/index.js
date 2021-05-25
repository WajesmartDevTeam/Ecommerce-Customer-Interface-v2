import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        storeSet: false,
        showSearch: false,
        store: {},
        mode: "",
        delivery_area: "",
        allstores: [],
        stat_stores: false,
        cart: [],
        user: {},
        loggedIn: false,
        orders: [],
        storesCart: [],
        order: {},
        banners: [],
        blackFriday: false,
        categoryRoute: '/home',
        categories: false,
        promotions: 0,
    },
    mutations: {
        updateBlackFriday(state, status) {
            this.state.blackFriday = status
        },
        updatecategories(state, data) {
            this.state.categories = data
        },
        updatepromotions(state, data) {
            this.state.promotions = data
        },
        updateCategoryRoute(state, route) {
            this.state.categoryRoute = route
        },
        updateShowSearch(state, status) {
            this.state.showSearch = status
        },
        updateStoreStatus(state, status) {
            this.state.storeSet = status
        },
        updateLogin(state, status) {
            this.state.loggedIn = status
        },
        updateArea(state, area) {
            state.delivery_area = area
        },
        updateStore(state, store) {
            state.store = store
        },
        updateMode(state, mode) {
            state.mode = mode
        },
        updateAllStores(state, stores) {
            state.allstores = stores
        },
        updateStatStore(state, status) {
            state.stat_stores = status
        },
        updateCart(state, data) {
            state.cart = data
        },
        updateUser(state, data) {
            state.user = data
        },
        updateOrders(state, data) {
            state.orders = data
        },
        updateStoresCart(state, data) {
            state.storesCart = data
        },
        updateOrder(state, data) {
            state.order = data
        },
        loadBanners(state, data) {
            state.banners = data
        }
    },
    actions: {
        ToggleShowSearch({ commit }, status) {
            commit("updateShowSearch", status);
        },
        categories({ commit }, data) {
            commit("updatecategories", data);
        },
        promotions({ commit }, data) {
            commit("updatepromotions", data);
        },
        setBlackFriday({ commit }, status) {
            commit("updateBlackFriday", status);
        },
        setCategoryRoute({ commit }, route) {
            commit("updateCategoryRoute", route);
        },
        setStoreStatus({ commit }, status) {
            commit("updateStoreStatus", status);
        },
        setLoggedIn({ commit }, status) {
            commit("updateLogin", status);
        },
        area({ commit }, area) {
            commit("updateArea", area);
        },
        setStore({ commit }, store) {
            commit("updateStore", store)
        },
        setMode({ commit }, data) {
            commit("updateMode", data)
        },
        setAllStores({ commit }, stores) {
            commit("updateAllStores", stores)
        },
        setStatStore({ commit }, setAll) {
            commit("updateStatStore", setAll)
        },
        addToCart({ commit }, data) {
            commit("updateCart", data)
        },
        user({ commit }, data) {
            commit("updateUser", data)
        },
        orders({ commit }, data) {
            commit("updateOrders", data)
        },
        storesCart({ commit }, data) {
            commit("updateStoresCart", data)
        },
        orderinfo({ commit }, data) {
            commit("updateOrder", data)
        },
        banners({ commit }, data) {
            commit("loadBanners", data)
        }
    },
    modules: {},
    getters: {
        isStoreSet: state => state.storeSet,
        showSearch: state => state.showSearch,
        area: state => state.delivery_area,
        store: state => state.store,
        mode: state => state.mode,
        allstores: state => state.allstores,
        stat_stores: state => state.stat_stores,
        cart: state => state.cart,
        user: state => state.user,
        orders: state => state.orders,
        isLoggedIn: state => state.loggedIn,
        storesCart: state => state.storesCart,
        order: state => state.order,
        banners: state => state.banners.reverse(),
        blackFriday: state => state.blackFriday,
        promotions: state => state.promotions,
        categories: state => state.categories,
        categoryRoute: state => state.categoryRoute,
        cart_total: state=> state.cart.map(x => Number(x.quantity) * Number(x.unit_price)).reduce((acc, curr) => {
            acc += Number(curr)
            return acc
        }, 0)
    },
    plugins: [createPersistedState()]
})