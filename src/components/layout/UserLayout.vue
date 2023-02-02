<template>
  <template v-if="isAuth">
    <the-header></the-header>

    <side-menu-wrapper>
      <side-menu></side-menu>
      <side-menu-extension></side-menu-extension>
    </side-menu-wrapper>
  </template>

  <main :class="mainClassName">
    <router-view v-if="connection"></router-view>
    <no-internet v-else></no-internet>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// Components
import TheHeader from './TheHeader.vue';
import SideMenuWrapper from './SideMenuWrapper.vue';
import SideMenu from './SideMenu.vue';
import SideMenuExtension from './SideMenuExtension.vue';
import NoInternet from './NoInternet.vue';

export default {
  components: {
    TheHeader,
    SideMenuWrapper,
    SideMenu,
    SideMenuExtension,
    NoInternet,
  },
  computed: {
    ...mapGetters('auth', ['isAuth']),
    ...mapGetters('ui', ['isDesktop', 'connection']),
    mainClassName() {
      return {
        main: this.isAuth,
        ['auth-main']: !this.isAuth,
      };
    },
  },
  watch: {
    isAuth(current) {
      if (current) {
        this.getUser();
      }
    },
  },
  methods: {
    ...mapActions('user', ['getUser']),
  },
  mounted() {
    if (this.isAuth) {
      this.getUser();
    }
  },
};
</script>

<style scoped lang="scss">
.main {
  min-height: calc(100vh - 6.25rem);
  width: 1%;
  flex: 1 1;
  padding: 2rem;
  margin-top: 6.25rem;
}
.auth-main {
  width: 100%;
}

@include small-desktop-media {
  .main {
    padding: 1.5rem;
    min-height: calc(100vh - 5rem);
    margin-top: 5rem;
  }
}
</style>
