<template>
  <div class="charts">
    <div class="charts--top">
      <h1 class="charts--title">Charts Data</h1>
      <div class="charts--content">
        <ChartsForm />
      </div>
    </div>
    <UiWaves />
  </div>
</template>

<script>
// Components
import UiWaves from '@/components/ui/UiWaves.vue';

import ChartsForm from './ChartsForm.vue';

export default {
  name: 'ChartsComponent',
  components: {
    ChartsForm,
    UiWaves,
  },
};
</script>

<style scoped>
.charts {
  min-height: calc(100% - 85px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.charts--top {
  box-sizing: border-box;
  padding-top: 2rem;
}

.charts--title,
.charts--subtitle {
  padding-bottom: 1.5rem;
  text-align: center;
}

.charts--title {
  padding-bottom: 3rem;
  font-size: var(--font-size-xxl);
  line-height: 30px;
  text-align: center;
}

.charts--subtitle {
  font-family: var(--font-family-nunito);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
}

@media (min-width: 768px){
  .charts--title {
    padding-bottom: 2rem;
    line-height: inherit;
    font-size: var(--font-size-xxxl);
  }
}

@media (min-width: 991px){
  .charts--top {
    padding-top: 1rem;
    margin-bottom: 4rem;
  }
}

@media (min-width: 1200px){
  .charts--content {
    max-width: 1320px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
