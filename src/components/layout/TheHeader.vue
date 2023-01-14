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
        <base-avatar :src="userAvatar"></base-avatar>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

// Components
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
    ...mapGetters('user', ['userAvatar']),
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
  background-color: #F6F7F8;
  box-shadow: 3px -2px 5px rgba(0, 0, 0, 0.2);
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
  padding: 0 0 0.2rem 0;
  width: 18rem;
  margin-top: 0.2rem;
  border-bottom: 1px solid transparent;
  @include font(1rem, 400, $primary-text-color);
  transition: border .3s ease-in-out;

  &:focus {
    border-bottom: 1px solid #9FA9BE;
  }

  &::placeholder {
    @include font(1rem, 400, #9FA9BE);
  }
}
</style>
