<template>
  <header class="header" :class="{ ['header--menu-closed']: !isSideMenuOpen }">
    <div class="header__content">
      <div class="header__search">
        <base-icon @click="handleSearchIcon" class="header__search-icon" name="SearchIcon"></base-icon>

        <input
          type="text"
          class="header__search-input"
          placeholder="Search task"
          ref="searchInput"
        />
      </div>

      <div class="header__user">
        <base-avatar src=""></base-avatar>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseAvatar from '@/components/UI/BaseAvatar.vue';

export default {
  components: {
    BaseAvatar,
  },
  methods: {
    handleSearchIcon() {
      this.$refs.searchInput.focus();
    },
  },
  computed: {
    ...mapGetters('ui', ['isSideMenuOpen']),
  },
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  right: 0;
  width: calc(100% - 6.25rem - 12.5rem);
  height: 6.25rem;
  padding: 0 2.5rem;
  @include flex(row, center, center);
  transition: width .3s ease-in-out;

  &--menu-closed {
    width: calc(100% - 6.25rem);
  }
}
.header__content {
  width: 100%;
  @include flex(row, center, space-between);
}

.header__search {
  @include flex(row, center, center);
}
.header__search-icon {
  width: 2rem;
  height: 2rem;
  fill: #9FA9BE;
  margin-right: 0.75rem;
}
.header__search-input {
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0;
  width: 18rem;
  @include font(1rem, 400, $primary-text-color);

  &::placeholder {
    @include font(1rem, 400, #9FA9BE);
  }
}
</style>
