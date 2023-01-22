<template>
  <div class="aside-overlay" ref="overlay" @click.self="closeResponsiveSideMenuOpen">
    <div class="aside-responsive">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      touchStart: 0,
      touchEnd: 0,
    };
  },
  methods: {
    ...mapActions('ui', ['closeResponsiveSideMenuOpen']),
    handleTouchStart(e) {
      this.touchStart = e.changedTouches[0].clientX;
    },
    handleTouchEnd(e) {
      this.touchEnd = e.changedTouches[0].clientX;

      if (this.touchStart - 90 > this.touchEnd) {
        this.closeResponsiveSideMenuOpen();
      }
    },
  },
  mounted() {
    document.body.style.overflow = 'hidden';

    this.$refs.overlay.addEventListener('touchstart', this.handleTouchStart);
    this.$refs.overlay.addEventListener('touchend', this.handleTouchEnd);
  },
  beforeUnmount() {
    this.$refs.overlay.removeEventListener('touchstart', this.handleTouchStart);
    this.$refs.overlay.removeEventListener('touchend', this.handleTouchEnd);
  },
  unmounted() {
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 300);
  },
};
</script>

<style scoped lang="scss">
.aside-overlay {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: background-color .3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.6);
}
.aside-responsive {
  width: calc(6.25rem + 12.5rem);
  transform: translateX(0);
  transition: transform .3s ease-in-out, opacity .3s ease-in-out;
  @include flex(row, flex-start, flex-start);
}

.aside-overlay-enter-from,
.aside-overlay-leave-to {
  background-color: transparent;

  .aside-responsive {
    transform: translateX(-30rem) !important;
    opacity: 0;
  }
}
.aside-overlay-enter-to,
.aside-overlay-leave-from {
  background-color: rgba(0, 0, 0, 0.6);

  .aside-responsive {
    transform: translateX(0) !important;
    opacity: 1;
  }
}
</style>
