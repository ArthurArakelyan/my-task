<template>
  <div class="side-menu-extension__label">
    <p class="side-menu-extension__label-name">
      {{ label.name }}
    </p>

    <div class="side-menu-extension__label-count" :style="{ backgroundColor: label.color }">
      <span class="side-menu-extension__label-count-text">
        {{ label.count }}
      </span>
    </div>

    <base-dropdown class="side-menu-extension__label-menu" :items="dropdownItems">
      <base-icon class="side-menu-extension__label-menu-icon" name="MenuIcon"></base-icon>
    </base-dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

// Components
import BaseDropdown from '@/components/UI/BaseDropdown.vue';

export default {
  components: {
    BaseDropdown,
  },
  props: {
    label: {
      type: Object,
    },
  },
  computed: {
    dropdownItems() {
      return [
        { icon: 'EditIcon', name: 'Edit', action: this.handleEdit },
        { icon: 'DeleteIcon', name: 'Delete', action: this.handleDelete },
      ];
    },
  },
  methods: {
    ...mapActions('labels', ['selectEditEntry', 'selectDeleteEntry']),
    handleEdit() {
      this.selectEditEntry(this.label);
    },
    handleDelete() {
      this.selectDeleteEntry(this.label);
    },
  },
};
</script>

<style scoped lang="scss">
.side-menu-extension__label {
  width: 100%;
  padding: 0.75rem 0;
  @include flex(row, center, space-between);

  &:hover {
    .side-menu-extension__label-count {
      margin-right: 1.5rem;
    }
    .side-menu-extension__label-menu {
      opacity: 1;
      transition-delay: .3s;
    }
  }
}
.side-menu-extension__label-name {
  width: calc(100% - 3.5rem);
  line-height: initial;
  @include ellipsis();
  @include font(1rem, 400, $primary-text-color);
}
.side-menu-extension__label-count {
  border-radius: 30px;
  width: 2rem;
  height: 1.2rem;
  @include flex(row, center, center);
  transition: margin-right .3s ease-in-out;
}
.side-menu-extension__label-count-text {
  line-height: 1.063rem;
  @include font(0.625rem, 500, $white, center);
}
.side-menu-extension__label-menu {
  opacity: 0;
  position: absolute;
  right: 0.75rem;
  transition: opacity .3s ease-in-out;
}
.side-menu-extension__label-menu-icon {
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  fill: $primary-text-color;
}
</style>
