import { createStore } from 'vuex';

export default createStore({
  state: {
    currencyData: {},
    chartData: {},
  },
  mutations: {
    currency_data(state, currencyData) {
      state.currencyData = currencyData
    },
    chart_data(state, chartData) {
      state.chartData = chartData
    }
  },
  actions: {
    setChartData({ commit }, data) {
      commit('chart_data', data)
    }
  },
});
