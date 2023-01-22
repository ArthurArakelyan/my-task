<template>
  <div class="app">
    <user-layout></user-layout>
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
    ...mapActions('ui', ['changeDeviceTypes']),
  },
  mounted() {
    window.addEventListener('resize', this.changeDeviceTypes);

    AuthService.onAuthChanged((user) => {
      this.updateAuth();

      if (!user && this.$router.currentRoute.value.meta.auth) {
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

@media (min-width: 1919px) {
  html, body {
    font-size: 20px;
  }
}

@media (min-width: 2399px) {
  html, body {
    font-size: 24px;
  }
}

@media (min-width: 2999px) {
  html, body {
    font-size: 28px;
  }
}

@media (min-width: 3499px) {
  html, body {
    font-size: 32px;
  }
}

@media (min-width: 3999px) {
  html, body {
    font-size: 36px;
  }
}

@media (min-width: 4400px) {
  html, body {
    font-size: 40px;
  }
}
</style>
