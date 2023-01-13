<template>
  <div class="loader-wrapper">
    <span class="loader" :class="loaderClassName" :style="loaderStyles"></span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: '#ffffff',
    },
    size: {
      type: String,
      required: false,
      default: 'default',
    },
  },
  computed: {
    loaderClassName() {
      return {
        [`loader--${this.size}`]: true,
      };
    },
    loaderStyles() {
      return {
        borderColor: this.color,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.loader-wrapper {
  @include flex(row, center, center);
}
.loader {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid $white;
  border-bottom-color: transparent !important;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &--small {
    width: 0.75rem;
    height: 0.75rem;
    border-width: 1px;
  }

  &--medium {
    width: 1.25rem;
    height: 1.25rem;
    border-width: 2px;
  }

  &--default {
    width: 1.5rem;
    height: 1.5rem;
    border-width: 2px;
  }

  &--large {
    width: 3rem;
    height: 3rem;
    border-width: 5px;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
