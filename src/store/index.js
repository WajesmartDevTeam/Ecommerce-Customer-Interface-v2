import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        storeSet: true,
        showSearch: false,
        store: {},
        mode: "",
        delivery_area: "",
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
    },
    modules: {},
    getters: {
        isStoreSet: state => state.storeSet,
        showSearch: state => state.showSearch,
        area: state => state.delivery_area,
        store: state => state.store,
        mode: state => state.mode,
    },

})