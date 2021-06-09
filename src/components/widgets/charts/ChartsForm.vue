<template>
  <UiCard class="charts--card">
    <div class="charts--container">
      <div class="charts--chart">
        <!-- Loader -->
        <div
          v-if="data.isLoading"
          class="charts-loader--container"
          :class="{ 'charts--chart-container-show': data.isLoading }"
        >
          <UiLoader class="charts-loader" />
        </div>
        <div
          v-else
          class="charts--chart-container"
          :class="{ 'charts--chart-container-show': !data.isLoading }"
        >
          <UiLineChart
            v-if="data.values !== null"
            :labels="data.labels"
            tooltipLabel="Price"
            :values="data.values"
          />
        </div>
      </div>

      <div class="charts--actions">
        <UiSelect
          class="charts--actions-select"
          v-model="currency"
          :options="data.options"
        />
        <div class="charts--buttons">
          <UiButton
            v-for="button in data.buttons"
            :key="button.id"
            class="charts--button"
            :text="button.title"
            :active="button.period === data.selectedPeriod"
            @click="getSelectedPeriod(button.period)"
          />
        </div>
      </div>
    </div>
  </UiCard>
</template>

<script>
// API
import api from '@/api/index';

// Components
import UiButton from '@/components/ui/UiButton.vue';
import UiCard from '@/components/ui/UiCard.vue';
import UiLoader from '@/components/ui/UiLoader.vue';
import UiLineChart from '@/components/ui/UiLineChart.vue';
import UiSelect from '@/components/ui/UiSelect.vue';

//Composition API
import { useStore } from 'vuex'
import { reactive, watch, ref, computed, onMounted } from 'vue';

export default {
  components: {
    UiButton,
    UiCard,
    UiLoader,
    UiLineChart,
    UiSelect
  },
  setup() {
    const store = useStore()
    const currency = ref('EUR');
    const data = reactive({
      isLoading: true,
      labels: null,
      values: null,
      options: ['EUR', 'USD', 'AUD', 'CAD', 'PLN', 'MXN'],
      buttons: [{
        title: '1 Day',
        period: '1D', 
      },
      {
        title: '1 Month',
        period: '1M', 
      },
      {
        title: '1 Year',
        period: '1Y', 
      }],
      selectedPeriod: '1D',
    });
    const chartData = computed(() => store.state.chartData)
    watch(currency, (currentValue) => {
      data.selectedPeriod = '1D'
      getChartData(currentValue, getTimeAgo(data.selectedPeriod))
    });
    function getChartData(currency, period) {
      data.isLoading = true;
      const apiUrl = 'https://api.exchangeratesapi.io/v1'
      const accessKey = 'a82fb17b0df6821f7e5a563c608e4a16'
      const date = period
      const base = currency
      /* `${apiUrl}/${date}?access_key=${accessKey}&base=${base}` */
      api.currencyData(`${apiUrl}/${date}?access_key=${accessKey}&base=${base}`).then((response) => {
        store.commit('chart_data', response);
        data.labels = Object.keys(chartData.value.rates)
        data.values = Object.values(chartData.value.rates)
        data.isLoading = false;
      })
    } 
    getChartData(currency.value, getTimeAgo(data.selectedPeriod))
    function getSelectedPeriod(period){
      data.selectedPeriod = period
      getChartData(currency.value, getTimeAgo(period))
    }
    function getTimeAgo(type) {
      const date = new Date()
      if (type === '1M') date.setMonth(date.getMonth() - 1);
      if (type === '1Y') date.setMonth(date.getMonth() - 12);
      return date.toISOString().slice(0, 10);
    }
    return { 
      data, 
      currency, 
      chartData,
      getTimeAgo, 
      getSelectedPeriod, 
      getChartData
    };
  },
};
</script>

<style scoped>
.charts--actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.charts--buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.charts--button {
  margin-bottom: .5rem;
}

.charts-loader {
  min-width: 130px;
}

.charts-loader--container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3.75rem;
  opacity: 0;
}

.charts--chart-container {
  opacity: 0;
}

.charts--chart-container-show {
  opacity: 1;
  transition: opacity .5s ease-in-out;
}

.charts--actions-select {
  max-width: 100%;
  margin-bottom: .5rem;
}

.charts--card {
  box-sizing: border-box;
  margin: 0 2rem;
  padding: 1.5rem 2rem;
}

.charts--card-button {
  align-self: flex-end;
}

.charts--card-container {
  display: flex;
  flex-direction: column;
}

.charts--card-disclaimer {
  padding-top: 1rem;
  display: block;
  text-align: center;
}

.charts--card-button {
  padding-top: 1rem;
}

@media (min-width: 567px){
  .charts--card {
    box-sizing: border-box;
    margin: 0 3rem;
    padding: 1.5rem 4rem;
  }
}

@media (min-width: 768px){
  .charts--actions {
    flex-direction: row;
    justify-content: space-between;
  }

  .charts--actions-select {
    max-width: 400px;
    margin-right: 1rem;
  }

  .charts--buttons {
    width: 100%;
    flex-direction: row;
  }
}

@media (min-width: 991px){
  .charts--card-container {
    flex-direction: row;
  }

  .charts--button {
    margin-right: .5rem;
  }

  .charts--card-select,
  .charts--card-input {
    margin-right: .5rem;
  }

  .charts--card-button {
    padding-top: 0;
  }
}

@media (min-width: 1200px){
  .charts--card-container {
    flex-direction: row;
  }
}
</style>
