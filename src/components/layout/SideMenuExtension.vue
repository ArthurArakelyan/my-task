<template>
  <transition name="menu">
    <div v-if="isSideMenuOpen" class="side-menu-extension">
      <div class="side-menu-extension__header">
        <h1 class="side-menu-extension__header-title">My Task</h1>
      </div>

      <div class="side-menu-extension__content">
        <div class="side-menu-extension__label" v-for="label in labels" :key="label.id">
          <p class="side-menu-extension__label-name">
            {{ label.name }}
          </p>

          <div class="side-menu-extension__label-count" :style="{ backgroundColor: label.color }">
            <span class="side-menu-extension__label-count-text">
              {{ label.count }}
            </span>
          </div>
        </div>

        <div class="side-menu-extension__label-add">
          <base-icon class="side-menu-extension__label-add-icon" name="PlusIcon"></base-icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      labels: [
        { id: 1, name: 'All Tasks', count: 122, color: '#172B4D' },
        { id: 2, name: 'Management', count: 20, color: '#1665D8' },
        { id: 3, name: 'Sales', count: 32, color: '#F6C056' },
        { id: 4, name: 'Operations', count: 27, color: '#F85252' },
        { id: 5, name: 'Marketing', count: 20, color: '#6F48E1' },
        { id: 6, name: 'Human Resources', count: 5, color: '#F19445' },
        { id: 7, name: 'Finance', count: 8, color: '#60C354' },
        { id: 8, name: 'Service', count: 10, color: '#AA44F6' },
      ],
    };
  },
  computed: {
    ...mapGetters('ui', ['isSideMenuOpen']),
  },
};
</script>

<style scoped lang="scss">
.side-menu-extension {
  left: 6.25rem;
  width: 12.5rem;
  height: 100vh;
  background-color: #E9EEF6;
  transition: opacity .3s ease-in-out, transform .3s ease-in-out;
}

.side-menu-extension__header {
  width: 100%;
  height: 6.25rem;
  border-bottom: 1px solid #E0E6F0;
  background-color: #E3EAF5;
  padding: 0.75rem;
  @include flex(row, center, flex-start);
}
.side-menu-extension__header-title {
  @include font(2rem, 600, $primary-text-color);
}

.side-menu-extension__content {
  width: 100%;
  max-height: calc(100vh - 6.75rem);
  padding: 0.25rem 0.75rem;
  overflow-y: auto;
  @include flex(column, flex-start, flex-start);
  @include scroll();
}
.side-menu-extension__label {
  width: 100%;
  padding: 0.75rem 0;
  @include flex(row, center, space-between);
}
.side-menu-extension__label-name {
  width: 80%;
  line-height: initial;
  @include ellipsis();
  @include font(1rem, 400, $primary-text-color);
}
.side-menu-extension__label-count {
  border-radius: 30px;
  width: 2rem;
  height: 1.2rem;
  @include flex(row, center, center);
}
.side-menu-extension__label-count-text {
  line-height: 1.063rem;
  @include font(0.625rem, 500, $white, center);
}

.side-menu-extension__label-add {
  width: 100%;
  background-color: $white;
  margin-top: 0.1rem;
  border-radius: 50px;
  padding: 0.05rem 0;
  cursor: pointer;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  @include flex(row, center, center);
  transition: background-color .3s ease-in-out;

  &:hover {
    background-color: $primary-color;

    .side-menu-extension__label-add-icon {
      fill: $white;
    }
  }

  &:active {
    background-color: $primary-color-active;
  }
}
.side-menu-extension__label-add-icon {
  width: 1.2rem;
  height: 1.2rem;
  fill: #A2ACC0;
  transition: fill .3s ease-in-out;
}

.menu-enter-from,
.menu-leave-to {
  z-index: 0;
  position: absolute;
  opacity: 0;
  transform: translateX(-200px);
}
.menu-enter-to,
.menu-leave-from {
  z-index: 1;
  opacity: 1;
  transform: translateX(0);
}
</style>
