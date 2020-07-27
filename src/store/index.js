import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        storeSet: true,
        showSearch: false,
        store: {}
    },
    mutations: {
        selectedStore(state, data) {
            this.state.store = data
        },
        updateShowSearch(state, status) {
            this.state.showSearch = status
        }
    },
    actions: {
        ToggleShowSearch({ commit }, status) {
            commit("updateShowSearch", status);
        },
    },
    modules: {},
    getters: {
        isStoreSet: state => state.storeSet,
        showSearch: state => state.showSearch
    },

})