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
                  {{ toCurrencyFormat(1 / rate) }} {{ data.currency.base }}
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
      currency: {
        "success":true,
        "timestamp":1623155644,
        "base":"EUR",
        "date":"2021-06-08",
        "rates":{
          "AED":4.474693,
          "AFN":95.991705,
          "ALL":122.935211,
          "AMD":633.294687,
          "ANG":2.185893,
          "AOA":782.13057,
          "ARS":115.626889,
          "AUD":1.571811,
          "AWG":2.192889,
          "AZN":2.076607,
          "BAM":1.955913,
          "BBD":2.458542,
          "BDT":103.251659,
          "BGN":1.957044,
          "BHD":0.459253,
          "BIF":2408.362082,
          "BMD":1.218272,
          "BND":1.611742,
          "BOB":8.407959,
          "BRL":6.137532,
          "BSD":1.217742,
          "BTC":3.6882174e-5,
          "BTN":88.757176,
          "BWP":12.873146,
          "BYN":3.06433,
          "BYR":23878.124105,
          "BZD":2.454704,
          "CAD":1.471179,
          "CDF":2435.324849,
          "CHF":1.091072,
          "CLF":0.031546,
          "CLP":870.328991,
          "CNY":7.793895,
          "COP":4397.582949,
          "CRC":753.881954,
          "CUC":1.218272,
          "CUP":32.284198,
          "CVE":110.269674,
          "CZK":25.372913,
          "DJF":216.799189,
          "DKK":7.436366,
          "DOP":69.35294,
          "DZD":162.443952,
          "EGP":19.071917,
          "ERN":18.276499,
          "ETB":53.140252,
          "EUR":1,
          "FJD":2.47175,
          "FKP":0.866819,
          "GBP":0.861073,
          "GEL":3.824957,
          "GGP":0.866819,
          "GHS":7.0875,
          "GIP":0.866819,
          "GMD":62.314143,
          "GNF":11947.106394,
          "GTQ":9.407399,
          "GYD":254.383637,
          "HKD":9.452996,
          "HNL":29.268241,
          "HRK":7.499315,
          "HTG":110.981704,
          "HUF":347.883602,
          "IDR":17367.254077,
          "ILS":3.952207,
          "IMP":0.866819,
          "INR":88.786236,
          "IQD":1776.711557,
          "IRR":51295.327323,
          "ISK":146.899206,
          "JEP":0.866819,
          "JMD":180.655209,
          "JOD":0.863736,
          "JPY":133.212527,
          "KES":131.44879,
          "KGS":103.103304,
          "KHR":4967.329,
          "KMF":492.364231,
          "KPW":1096.444617,
          "KRW":1358.774702,
          "KWD":0.366408,
          "KYD":1.014818,
          "KZT":520.722071,
          "LAK":11498.104221,
          "LBP":1836.281886,
          "LKR":241.118762,
          "LRD":208.628568,
          "LSL":16.44059,
          "LTL":3.597239,
          "LVL":0.736921,
          "LYD":5.43263,
          "MAD":10.732655,
          "MDL":21.568914,
          "MGA":4595.454784,
          "MKD":61.617612,
          "MMK":2004.452155,
          "MNT":3473.186567,
          "MOP":9.732453,
          "MRO":434.922765,
          "MUR":49.345737,
          "MVR":18.822462,
          "MWK":969.435091,
          "MXN":24.07736,
          "MYR":5.019884,
          "MZN":75.29483,
          "NAD":16.440547,
          "NGN":500.51444,
          "NIO":42.531803,
          "NOK":10.043943,
          "NPR":142.012688,
          "NZD":1.68769,
          "OMR":0.469045,
          "PAB":1.217852,
          "PEN":4.794592,
          "PGK":4.275811,
          "PHP":58.101201,
          "PKR":189.515722,
          "PLN":4.465489,
          "PYG":8168.845668,
          "QAR":4.43575,
          "RON":4.924378,
          "RSD":117.589984,
          "RUB":88.199828,
          "RWF":1220.751743,
          "SAR":4.569153,
          "SBD":9.726758,
          "SCR":20.102337,
          "SDG":520.812531,
          "SEK":10.069685,
          "SGD":1.611893,
          "SHP":0.866819,
          "SLL":12469.01013,
          "SOS":712.688237,
          "SRD":25.40888,
          "STD":25261.818158,
          "SVC":10.656452,
          "SYP":1532.019551,
          "SZL":16.5102,
          "THB":37.99183,
          "TJS":13.888889,
          "TMT":4.276133,
          "TND":3.321617,
          "TOP":2.705171,
          "TRY":10.464347,
          "TTD":8.260769,
          "TWD":33.754896,
          "TZS":2824.0596,
          "UAH":33.066702,
          "UGX":4298.782209,
          "USD":1.218272,
          "UYU":53.101597,
          "UZS":12825.923643,
          "VEF":260503295227.5096,
          "VND":27951.496454,
          "VUV":132.069437,
          "WST":3.06511,
          "XAF":655.974035,
          "XAG":0.043768,
          "XAU":0.000641,
          "XCD":3.292441,
          "XDR":0.844522,
          "XOF":655.984805,
          "XPF":119.938877,
          "YER":304.628426,
          "ZAR":16.443561,
          "ZMK":10965.92167,
          "ZMW":27.461164,
          "ZWL":392.283839
        }
      },
      collapsed: false,
      isLoading: false,
      /* currency: {} */
    })
    function getCurrencyData() {
      data.isLoading = true;
      api.currencyData('https://pokeapi.co/api/v2/pokemon/ditto').then(() => {
        store.commit('currency_data', data.currency);
        data.isLoading = false;
      })

      /* api.currencyData('http://api.exchangeratesapi.io/v1/latest?access_key=a82fb17b0df6821f7e5a563c608e4a16&format=1').then((response) => {
        store.commit('currency_data', response);
        data.isLoading = false;
      }) */
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
