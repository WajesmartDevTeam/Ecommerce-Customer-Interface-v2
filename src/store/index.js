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
        cart: []
    },
    mutations: {

        updateShowSearch(state, status) {
            this.state.showSearch = status
        },
        updateStoreStatus(state, status) {
            this.state.storeSet = status
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
        }
    },
    actions: {
        ToggleShowSearch({ commit }, status) {
            commit("updateShowSearch", status);
        },
        setStoreStatus({ commit }, status) {
            commit("updateStoreStatus", status);
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
    },
    plugins: [createPersistedState()]
})