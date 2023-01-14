<template>
  <div class="app">
    <user-layout v-if="isAuth"></user-layout>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import UserLayout from '@/components/layout/UserLayout.vue';

// Services
import { AuthService } from '@/services';

export default {
  components: {
    UserLayout,
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
</style>
