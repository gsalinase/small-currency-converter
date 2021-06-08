<template>
  <div
    class="ui-select"
    :tabindex="tabindex"
    @blur="data.open = false"
    :id="id"
  >
    <label v-if="label" class="ui-select--label" :for="id">{{ label }}</label>
    <div
      class="ui-select--selected"
      :class="{ 'ui-select--open': data.open }"
      @click="data.open = !data.open"
    >
      {{ selected }}
      <span
        class="ui-select--icon"
        :class="{ 'ui-select--icon-up': data.open }"
      ></span>
    </div>
    <div class="ui-select--items" :class="{ 'ui-select--hide': !data.open }">
      <div
        class="ui-select--item"
        :class="{ 'ui-select--item-selected': option === selected }"
        v-for="(option, i) of options"
        :key="i"
        @click="clickOptions(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
// Composition API
import { reactive, computed } from 'vue';

export default {
  props: {
    id: String,
    label: String,
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      default: null,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
    modelValue: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const data = reactive({
      open: false,
    });

    const selected = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val),
    });

    function clickOptions(option) {
      data.selected = option;
      data.open = false;
      emit('update:modelValue', option);
    }

    return { data, clickOptions, selected };
  },
};
</script>

<style scoped>
.ui-select {
  position: relative;
  width: 100%;
}

.ui-select--label {
  display: block;
  padding: 0.25rem .7rem;
  color: var(--ui-input-label);
}

.ui-select--selected {
  display: flex;
  align-items: center;
  padding: .39rem .7rem;
  width: 100%;
  border: 1px solid var(--ui-input-border);
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: var(--ui-input-bg);
  font-size: var(--ui-input-font-size);
  color: var(--ui-input-filled);
}

.ui-select-selected.ui-select--open{
  border: 1px solid var(--ui-input-border);
  border-radius: 6px 6px 0px 0px;
}

.ui-select--icon {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 57%;
  right: 9px;
  background-image: url('../../assets/arrow.svg');
  background-repeat: no-repeat;
  transition: .3s;
}

.ui-select--icon-up {
  transform: rotate(180deg);
}

.ui-select--items {
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--ui-input-border);
  position: absolute;
  z-index: 1;
  background-color: var(--ui-input-bg);
  margin-top: -5px;
  top: 35px;
  left: 0;
  right: 0;
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity .2s ease-out;
}

.ui-select--item{
  color: #ffffff;
  padding: .39rem .7rem;
  cursor: pointer;
  user-select: none;
}

.ui-select--item:hover{
  background-color: var(--ui-input-hover);
}

.ui-select--item-selected {
  background-color: var(--ui-input-active);
}

.ui-select--hide {
  visibility: hidden;
  opacity: 0;
  transition: visibility .1s, opacity .2s ease-in;
}
</style>
