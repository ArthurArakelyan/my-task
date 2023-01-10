<template>
  <aside class="side-menu">
    <div class="side-menu__header">
      <div @click="toggleSideMenu" class="side-menu__header-logo">
        <img class="side-menu__header-logo-img" :src="logoSrc" alt="Logo" width="60" height="60" />
      </div>
    </div>

    <div class="side-menu__content">
      <div @click="handleAdd" class="side-menu__content-add">
        <base-icon class="side-menu__content-add-icon" name="PlusIcon"></base-icon>
      </div>
    </div>

    <div class="side-menu__footer">
      <div @click="handleLogout" class="side-menu__footer-logout">
        <base-icon name="LogoutIcon" class="side-menu__footer-logout-icon"></base-icon>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    logoSrc() {
      return require('../../assets/images/logo.png');
    },
  },
  methods: {
    ...mapActions('ui', ['toggleSideMenu']),
    handleAdd() {

    },
    handleLogout() {

    },
  },
};
</script>

<style scoped lang="scss">
.side-menu {
  position: relative;
  z-index: 1;
  width: 6.25rem;
  height: 100vh;
  background-color: #1665d8;
  @include flex(column, flex-start, flex-start);
}

.side-menu__header {
  width: 100%;
  height: 6.25rem;
  border-bottom: 1px solid #2D74DC;
  @include flex(column, center, center);
}
.side-menu__header-logo {
  width: 3.75rem;
  height: 3.75rem;
  cursor: pointer;
  @include flex(column, center, center);
}
.side-menu__header-logo-img {
  @include image(100%, 100%);
}

.side-menu__content {
  width: 100%;
  padding: 2rem 0;
  @include flex(column, center, center);
}
.side-menu__content-add {
  cursor: pointer;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 6.6px;
  background-color: #145BC3;
  @include flex(row, center, center);
  transition: background-color .3s ease-in-out;

  &:hover {
    background-color: #1854a8;
  }
}
.side-menu__content-add-icon {
  width: 2rem;
  height: 2rem;
  fill: #fff;
}

.side-menu__footer {
  margin-top: auto;
  width: 100%;
  height: 6.25rem;
  border-top: 1px solid #2D74DC;
  @include flex(column, center, center);
}
.side-menu__footer-logout {
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  border-radius: 6.6px;
  @include flex(row, center, center);
  transition: background-color .3s ease-in-out;

  &:hover {
    background-color: #2D74DC;

    .side-menu__footer-logout-icon {
      stroke: $white;
    }
  }
}
.side-menu__footer-logout-icon {
  width: 2rem;
  height: 2rem;
  stroke: #6EA0E7;
  transition: stroke .3s ease-in-out;
}
</style>
