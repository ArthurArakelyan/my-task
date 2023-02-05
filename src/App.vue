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
    ...mapActions('ui', ['changeDeviceTypes', 'changeConnection']),
  },
  mounted() {
    this.changeDeviceTypes();
    this.changeConnection();

    window.addEventListener('resize', this.changeDeviceTypes);

    window.addEventListener('offline', this.changeConnection);

    window.addEventListener('online', this.changeConnection);

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
@import './assets/sass/base/reset';

html,
body {
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
}

body {
  overflow-y: overlay;
  scrollbar-gutter: stable;
  @include scroll(#b4b4b4);
}

.app {
  display: flex;
  flex-wrap: wrap;
  background-color: #f6f7f8;
}

@media (min-width: 1919px) {
  html,
  body {
    font-size: 20px;
  }
}

@media (min-width: 2399px) {
  html,
  body {
    font-size: 24px;
  }
}

@media (min-width: 2999px) {
  html,
  body {
    font-size: 28px;
  }
}

@media (min-width: 3499px) {
  html,
  body {
    font-size: 32px;
  }
}

@media (min-width: 3999px) {
  html,
  body {
    font-size: 36px;
  }
}

@media (min-width: 4400px) {
  html,
  body {
    font-size: 40px;
  }
}
</style>
