<template>
  <div class="main">
    <!-- Navigation -->
    <Navigation />

    <!-- Pagination -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="in-out">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Footer -->
  </div>
</template>

<script>
// Components
import Navigation from '@/components/layout/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  data() {
    return {
      firstLoad: undefined,
    };
  },
  watch: {
    $route(to, from) {
      this.firstLoad = from.name == null;
    },
  },
};
</script>

<style>
#app,
.main {
  width: 100%;
  height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter,
.fade-leave-to  {
  opacity: 0
}

.v-leave { opacity: 1; }
.v-leave-active { transition: opacity 1s }
.v-leave-to { opacity: 0; }
.v-enter { opacity: 0; }
.v-enter-active  { transition: opacity 1s }
.v-enter-to { opacity: 1; }
</style>
