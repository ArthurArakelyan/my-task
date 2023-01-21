<template>
  <the-header></the-header>

  <side-menu-wrapper>
    <side-menu></side-menu>
    <side-menu-extension></side-menu-extension>
  </side-menu-wrapper>

  <main class="main">
    <router-view></router-view>
  </main>
</template>

<script>
import { mapActions } from 'vuex';

// Components
import TheHeader from './TheHeader.vue';
import SideMenuWrapper from './SideMenuWrapper.vue';
import SideMenu from './SideMenu.vue';
import SideMenuExtension from './SideMenuExtension.vue';

export default {
  components: {
    TheHeader,
    SideMenuWrapper,
    SideMenu,
    SideMenuExtension,
  },
  methods: {
    ...mapActions('user', ['getUser']),
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style scoped lang="scss">
.main {
  min-height: calc(100vh - 100px);
  width: 1%;
  flex: 1 1;
  padding: 2rem;
  margin-top: 100px;
}
</style>
