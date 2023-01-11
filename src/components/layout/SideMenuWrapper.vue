<template>
  <div class="aside" :class="asideClassName">
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('ui', ['isSideMenuOpen']),
    asideClassName() {
      return {
        ['aside--close']: !this.isSideMenuOpen,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.aside {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 1;
  width: calc(6.25rem + 12.5rem);
  height: 100vh;
  transition: width .3s ease-in-out;
  @include flex(row, flex-start, flex-start);

  &--close {
    width: 6.25rem;
  }
}
</style>
