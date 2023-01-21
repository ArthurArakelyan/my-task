<template>
  <base-dropdown
    :items="items"
    trigger-click
    :dropdown-style="{ right: 0, top: 'calc(100% + 3px)' }"
  >
    <div class="dropdown-button">
      <base-icon class="dropdown-button__icon" name="MenuIcon"></base-icon>
    </div>
  </base-dropdown>
</template>

<script>
import BaseDropdown from '@/components/UI/BaseDropdown.vue';

export default {
  components: {
    BaseDropdown,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.dropdown-button {
  width: 2.5rem;
  height: 2.5rem;
  background-color: $white;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  @include flex(row, center, center);
  transition: background-color .3s ease-in-out;

  &:hover {
    background-color: rgb(248, 248, 248);
  }

  &:active {
    background-color: rgb(242, 242, 242);
  }
}
.dropdown-button__icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: $primary-text-color;
}
</style>
