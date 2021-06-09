<template>
  <apexchart
    class="ui-linechart"
    height="250px"
    type="line"
    :options="data.options"
    :series="data.series"
  >
  </apexchart>
</template>

<script>
// Utils
import utils from '@/utils/utils';

// Composition API
import { reactive, toRefs, watch } from 'vue';

export default {
  name: 'UiLinechart',
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    values: {
      type: Array,
      default: () => [],
    },
    tooltipLabel: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const data = reactive({
      options: {
        colors: ['transparent'],
        chart: {
          width: '100%',
          id: 'linechart',
          toolbar: {
            show: false,
          },
          animations: {
            enabled: true,
            easing: 'linear',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 100,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 100,
            },
          },
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'round',
          width: 2,
        },
        fill: {
          opacity: 0.9,
          strokeWidth: 1,
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
              {
                offset: 0,
                color: '#503CCD',
                opacity: 1,
              },
              {
                offset: 100,
                color: '#32cd8b',
                opacity: 1,
              },
            ],
          },
        },
        grid: {
          show: true,
          borderColor: '#C2BEEF',
          strokeDashArray: 4,
          position: 'back',
          row: {
            colors: undefined,
            opacity: 0.5,
          },
          column: {
            colors: undefined,
            opacity: 0.5,
          },
        },
        markers: {
          size: 0,
          colors: undefined,
          strokeColors: '#fff',
          strokeWidth: 1,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: 'circle',
          radius: 2,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3,
          },
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: true,
          },
          y: {
            show: false,
            formatter: function(value) {
              return utils.toCurrencyFormat(value);
            },
          },
          z: {
            title: 'Size: ',
          },
          marker: {
            show: false,
          },
          items: {
            display: 'flex',
          },
          fixed: {
            enabled: false,
            position: 'topRight',
          },
        },
        xaxis: {
          categories: props.labels,
          labels: {
            style: {
              colors: '#f0effb',
              fontSize: '10px',
            },      
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          tickAmount: 6,
          forceNiceScale: true,
          labels: {
            style: {
              colors: '#f0effb',
            },
            formatter: function(value) {
              return utils.toCurrencyFormat(value);
            },
          },
        },
      },
      series: [{
        name: props.tooltipLabel,
        data: props.values,
      }],
    });
    let {values} = toRefs(props)
    watch(values, (currentValue) => {
      data.series = [{
        name: props.tooltipLabel,
        data: Object.values(currentValue)
      }]
    });

    return { data };
  },
};
</script>

<style>
.ui-linechart {
  min-height: 250px !important;
}

.apexcharts-xaxis-texts-g text[id^='SvgjsText'] {
    display: none;
}

.apexcharts-xaxis-texts-g text[id^='SvgjsText']:nth-of-type(5n) {
    display: revert;
}
</style>
