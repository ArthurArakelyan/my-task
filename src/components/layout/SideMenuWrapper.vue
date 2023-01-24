<template>
  <div v-if="isDesktop" class="aside" :class="asideClassName">
    <slot></slot>
  </div>
  <transition name="aside-overlay">
    <side-menu-responsive v-if="!isDesktop && isResponsiveSideMenuOpen">
      <slot></slot>
    </side-menu-responsive>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import SideMenuResponsive from '@/components/layout/SideMenuResponsive.vue';

export default {
  components: {
    SideMenuResponsive,
  },
  computed: {
    ...mapGetters('ui', ['isSideMenuOpen', 'isResponsiveSideMenuOpen', 'isDesktop']),
    asideClassName() {
      return {
        ['aside--close']: !this.isSideMenuOpen,
      };
    },
  },
  methods: {
    ...mapActions('boards', ['getBoards']),
    ...mapActions('labels', ['getLabels']),
  },
  mounted() {
    this.getBoards();
    this.getLabels();
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
