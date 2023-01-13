<template>
  <div class="app">
    <template v-if="isAuth">
      <the-header></the-header>

      <side-menu-wrapper>
        <side-menu></side-menu>
        <side-menu-extension></side-menu-extension>
      </side-menu-wrapper>

      <main class="main">
        <router-view></router-view>
      </main>
    </template>

    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import TheHeader from '@/components/layout/TheHeader.vue';
import SideMenuWrapper from '@/components/layout/SideMenuWrapper.vue';
import SideMenu from '@/components/layout/SideMenu.vue';
import SideMenuExtension from '@/components/layout/SideMenuExtension.vue';

// Services
import { AuthService } from '@/services';

export default {
  components: {
    TheHeader,
    SideMenuWrapper,
    SideMenu,
    SideMenuExtension,
  },
  computed: {
    ...mapGetters('auth', ['isAuth']),
  },
  methods: {
    ...mapActions('auth', ['updateAuth']),
  },
  mounted() {
    AuthService.onAuthChanged((user) => {
      if (!user) {
        localStorage.removeItem('token');
      }

      this.updateAuth();

      if (this.$router.currentRoute.value.meta.auth) {
        this.$router.push('/login');
      }
    });
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');

html, body, div, span, iframe,
h1, h2, h3, h4, h5, h6, p,
a, img, strong, ol, ul, li, form, label,
aside, footer, header, menu, nav, section {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}

html, body {
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
}

body {
  overflow-y: overlay;
  scrollbar-gutter: stable;
  @include scroll(#b4b4b4);
}

*, *::before, *::after {
  box-sizing: border-box;
}

.app {
  display: flex;
  flex-wrap: wrap;
  background-color: #F6F7F8;
}

.main {
  min-height: 100vh;
  width: 1%;
  flex: 1 1;
  padding: 2rem;
  margin-top: 100px;
}
</style>
