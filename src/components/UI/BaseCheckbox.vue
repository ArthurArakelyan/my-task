<template>
  <label class="checkbox" :class="checkboxClassName" @click.stop>
    <input
      type="checkbox"
      class="checkbox__input"
      :value="checked"
      @input="handleInput"
      :disabled="disabled"
    />

    <transition name="checkmark">
      <base-icon v-if="checked" name="CheckmarkIcon" class="checkbox__icon"></base-icon>
    </transition>
  </label>
</template>

<script>
export default {
  emits: ['update:modelValue', 'check'],
  props: {
    value: {
      type: Boolean,
      required: false,
    },
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    checked() {
      if (typeof this.value === 'boolean') {
        return this.value;
      }

      return this.modelValue;
    },
    checkboxClassName() {
      return {
        ['checkbox--disabled']: this.disabled,
        ['checkbox--checked']: this.checked,
      };
    },
  },
  methods: {
    handleInput() {
      this.$emit('update:modelValue', !this.checked);
      this.$emit('check', !this.checked);
    },
  },
};
</script>

<style scoped lang="scss">
.checkbox {
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 3.3px;
  cursor: pointer;
  background-color: $white;
  border: 2px solid #1C0D1F29;
  transition: background-color .15s ease-in-out, border-color .15s ease-in-out, opacity .15s ease-in-out;
  @include flex(row, center, center);

  &--checked {
    background-color: #5678FA;
    border-color: #4365E8;
  }

  &--disabled {
    cursor: default;
    opacity: 0.6;
  }
}
.checkbox__input {
  display: none;
  opacity: 0;
  visibility: hidden;
}
.checkbox__icon {
  width: 0.625rem;
  height: 0.625rem;
  fill: $white;
  transition: opacity .3s ease-in-out, transform .3s ease-in-out;
}

.checkmark-enter-from,
.checkmark-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.checkmark-enter-to,
.checkmark-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
