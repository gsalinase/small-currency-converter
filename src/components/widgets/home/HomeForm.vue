<template>
  <UiCard
    class="home--card"
    :class="{
      'home--card-collapsed': data.collapsed,
      'home--card-loader-small': data.isLoading,
      'home--card-loader-full': !data.isLoading,
    }"
  >
    <!-- Loader -->
    <div v-if="data.isLoading" class="home--card-loader"><UiLoader /></div>
    <!-- Normal flow -->
    <div v-else>
      <form class="home--card-container">
        <UiInput
          class="home--card-input"
          label="amount"
          id="home-amount"
          type="number"
          autocomplete="off"
          :prefix="currency.base"
          v-model="form.amount"
        />
      </form>

      <div
        class="home--card-result"
        :class="{ 'home--card-opacity-1': form.amount.toString().length > 0 }"
      >
        <div
          class="home--card-result-container"
          v-for="(rate, key) in currency.rates"
          :key="rate.id"
        >
          <UiCard light size="small">
            <div class="home--card-result-data">
              <h4 class="home--card-result-title">
                {{ key }}
              </h4>
              <div class="home--card-result-icon">
                <img src="../../../assets/arrow-down.svg" alt="" />
              </div>
              <div class="home--card-result-values">
                <h5
                  :title="`${key} ${toCurrencyFormat(
                    convertCurrency(rate, form.amount)
                  )}`"
                >
                  {{ toCurrencyFormat(convertCurrency(rate, form.amount)) }}
                </h5>
                <p>
                  1 {{ key }}
                  =
                  {{ toCurrencyFormat(1 / rate) }} {{ currency.base }}
                </p>
                <p>
                  1 EUR =
                  {{ toCurrencyFormat(convertCurrency(rate, 1)) }} {{ key }}
                </p>
              </div>
            </div>
          </UiCard>
        </div>
        <div
          class="home--card-see-more"
          @click="data.collapsed = !data.collapsed"
        >
          <div class="home--card-see-more-click">
            <img src="../../../assets/arrow.svg" alt="arrow see more" />
            <small> See {{ data.collapsed ? "Less" : "More" }} </small>
          </div>
        </div>
      </div>
    </div>
  </UiCard>
</template>

<script>
// API
import api from '@/api/index';

// Components
import UiCard from '@/components/ui/UiCard.vue';
import UiLoader from '@/components/ui/UiLoader.vue';
import UiInput from '@/components/ui/UiInput.vue';

// Composition API
import { useStore } from 'vuex'
import { reactive, computed, onMounted } from 'vue'

// Utils
import utils from '@/utils/utils';

export default {
  name: 'HomeForm',
  components: {
    UiCard,
    UiLoader,
    UiInput,
  },
  setup() {
    const store = useStore()
    const form = reactive({
      amount: '',
      from: 'USD',
      to: 'CLP',
    });
    const data = reactive({ 
      collapsed: false,
      isLoading: false,
      /* currency: {} */
    })
    function getCurrencyData() {
      data.isLoading = true;
      api.currencyData('http://api.exchangeratesapi.io/v1/latest?access_key=a82fb17b0df6821f7e5a563c608e4a16&format=1').then((response) => {
        store.commit('currency_data', response);
        data.isLoading = false;
      })
    }
    function convertCurrency(amount, valueToConvert){
      return utils.convertCurrency(amount, valueToConvert);
    }
    function toCurrencyFormat(amount){
      return utils.toCurrencyFormat(amount);
    }
    onMounted(() => {
      getCurrencyData();
    })
    
    return {
      data,
      form,
      currency: computed(() => store.state.currencyData),
      toCurrencyFormat,
      convertCurrency
    }
  },
};
</script>

<style scoped>
.home--card {
  position: relative;
  box-sizing: border-box;
  max-height: 290px;
  max-width: 100%;
  overflow: hidden;
}

.home--card-loader-small {
  margin: 0 auto !important;
  max-width: 300px;
}

.home--card-loader-full {
  margin: 0 auto !important;
  max-width: 100%;
  transition: max-width .5s ease;
}

.home--card-button {
  align-self: flex-end;
}

.home--card-container {
  display: flex;
  flex-direction: column;
}

.home--card-disclaimer {
  padding-top: 1rem;
  display: block;
  text-align: center;
}

.home--card-result {
  opacity: 0;
  height: 0;
  visibility: hidden;
  text-align: center;
  transition: all .25s ease-in-out;
}

.home--card-result-container {
  width: 100%;
  margin-bottom: 0.8rem;
}

.home--card-result-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home--card-result-values h5 {
  text-align: right;
  font-size: var(--font-size-base);
  margin: 0;
  max-width: 30vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.home--card-result-values p {
  text-align: right;
  font-size: var(--font-size-xs);
  margin: 0;
}

.home--card-see-more {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 8;
  left: 0;
  bottom: 0;
  height: 110px;
  width: 100%;
  cursor: pointer;
    background: linear-gradient(
    rgba(20, 17, 37, 0),
    rgba(20, 17, 37, 0.4),
   rgba(20, 17, 37, 0.7), 
    rgba(20, 17, 37, 0.9), 
   rgb(20, 17, 37)
  );
}

.home--card-see-more-click {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home--card-see-more-click {
  margin-top: 2rem;
}

.home--card-see-more-click img {
  transition: .5s;
  transform: rotate(0deg);
  width: 30px;
}

.home--card-collapsed  {
  max-height: 100%;
  transition: max-height 0.25s ease-in-out;
}

.home--card-collapsed .home--card-see-more  img {
  transition: .5s;
  transform: rotate(180deg);
}

.home--card-opacity-0 {
  opacity: 0;
}

.home--card-opacity-1 {
  opacity: 1;
  height: 100%;
  margin-top: 1rem;
  margin-bottom: 3rem;
  visibility: visible;
  transition: opacity .25s ease-in-out;
}

@media (min-width: 567px){
  .home--card {
    box-sizing: border-box;
    margin: 0 3rem;
  }

  .home--card-result-values h5 {
    text-align: right;
    font-size: var(--font-size-base);
    margin: 0;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .home--card-result-values p {
    text-align: right;
    font-size: var(--font-size-xs);
    margin: 0;
  }
}

@media (min-width: 768px){
  .home--card-result {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

   .home--card-result-container {
    width: 49%;
    margin-bottom: 0.8rem;
  }
}

@media (min-width: 991px){
  .home--card-container {
    flex-direction: row;
  }
}

@media (min-width: 1200px){
  .home--card-container {
    flex-direction: row;
  }

  .home--card-result-container {
    width: 32%;
    margin-bottom: 0.8rem;
  }
}
</style>
