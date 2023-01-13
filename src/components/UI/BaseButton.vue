<template>
  <button class="button" :class="buttonClassName" :disabled="loading">
    <transition name="loader">
      <base-loader
          v-if="loading"
          size="medium"
          class="button__loader"
      ></base-loader>
    </transition>

    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    buttonClassName() {
      return {
        ['button--loading']: this.loading,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  position: relative;
  outline: none;
  border: none;
  padding: 0.65rem 1rem;
  cursor: pointer;
  border-radius: 3.3px;
  background-color: $primary-color;
  line-height: initial;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  @include flex(row, center, center);
  @include font(1rem, 400, $white, center);
  transition: background-color .3s ease-in-out, opacity .3s ease-in-out, padding-left .3s ease-in-out;

  &:hover {
    background-color: $primary-color-hover;
  }

  &:active {
    background-color: $primary-color-active;
  }

  &--loading {
    padding-left: 2.5rem;
  }

  &--loading,
  &:disabled {
    opacity: 0.6;

    &:hover,
    &:active {
      background-color: $primary-color !important;
    }
  }
}
.button__loader {
  position: absolute;
  left: 0.75rem;
  transition: opacity .3s ease-in-out;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}
.loader-enter-active {
  transition-delay: .3s;
}
.loader-enter-to,
.loader-leave-from {
  opacity: 1;
}
</style>
