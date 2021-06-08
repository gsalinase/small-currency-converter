import { createStore } from 'vuex';

export default createStore({
  state: {
    currencyData: {},
  },
  mutations: {
    currency_data(state, currencyData) {
      state.currencyData = currencyData
    }
  },
  actions: {
    setCurrencyData({ commit }, data) {
      commit('currency_data', data)
    }
  },
});
