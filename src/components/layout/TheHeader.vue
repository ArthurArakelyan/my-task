<template>
  <header class="header" :class="{ ['header--menu-closed']: !isSideMenuOpen }">
    <div
      v-if="!isDesktop"
      class="header__menu"
      @click="openResponsiveSideMenuOpen"
    >
      <base-icon class="header__menu-icon" name="BurgerMenuIcon"></base-icon>
    </div>

    <div class="header__content">
      <div class="header__search">
        <base-icon
          @click="handleSearchIcon"
          class="header__search-icon"
          name="SearchIcon"
        ></base-icon>

        <input
          type="text"
          class="header__search-input"
          placeholder="Search task"
          ref="searchInput"
        />
      </div>

      <the-header-user></the-header-user>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import TheHeaderUser from '@/components/layout/TheHeaderUser.vue';

export default {
  components: {
    TheHeaderUser,
  },
  methods: {
    ...mapActions('ui', ['openResponsiveSideMenuOpen']),
    handleSearchIcon() {
      this.$refs.searchInput.focus();
    },
  },
  computed: {
    ...mapGetters('ui', ['isSideMenuOpen', 'isDesktop']),
  },
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  z-index: 1;
  right: 0;
  width: calc(100% - 6.25rem - 12.5rem);
  height: 6.25rem;
  padding: 0 2rem;
  background-color: #f6f7f8;
  box-shadow: 3px -2px 5px rgba(0, 0, 0, 0.2);
  @include flex(row, center, center);
  transition: width 0.3s ease-in-out;

  &--menu-closed {
    width: calc(100% - 6.25rem);
  }
}
.header__content {
  width: 100%;
  @include flex(row, center, space-between);
}

.header__menu {
  width: 6.25rem;
  height: 100%;
  cursor: pointer;
  border-right: 1px solid $secondary-text-color;
  @include flex(row, center, center);
}
.header__menu-icon {
  width: 2.7rem;
  height: 2.7rem;
  fill: $primary-text-color;
  stroke: $primary-text-color;
}

.header__search {
  @include flex(row, center, center);
}
.header__search-icon {
  width: 2rem;
  height: 2rem;
  fill: #9fa9be;
  margin-right: 0.75rem;
}
.header__search-input {
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0 0 0.2rem 0;
  width: 18rem;
  margin-top: 0.2rem;
  border-bottom: 1px solid transparent;
  @include font(1rem, 400, $primary-text-color);
  transition: border 0.3s ease-in-out;

  &:focus {
    border-bottom: 1px solid #9fa9be;
  }

  &::placeholder {
    @include font(1rem, 400, #9fa9be);
  }
}

@include small-desktop-media {
  .header {
    width: 100%;
    height: 5rem;
    padding-left: 0;
  }
  .header__content {
    padding-left: 1rem;
  }
}

@include mobile-media {
  .header {
    padding-right: 1.5rem;
  }
}

@media (max-width: 540px) {
  .header__search-input {
    width: 12rem;
  }
}

@media (max-width: 450px) {
  .header__search-input {
    width: 9rem;
  }
}

@media (max-width: 374px) {
  .header__search-input {
    width: 7rem;
  }
}
</style>
