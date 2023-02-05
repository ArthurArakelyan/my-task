<template>
  <div class="side-menu__board" :class="className" @click="handleSelectBoard">
    <img
      v-if="board.image"
      class="side-menu__board-image"
      :src="board.image"
      :alt="board.name"
    />

    <span v-else class="side-menu__board-name">
      {{ board.name[0].toUpperCase() }}
    </span>

    <base-dropdown :items="dropdownItems" fixed class="side-menu__board-menu">
      <base-icon class="side-menu__board-menu-icon" name="MenuIcon"></base-icon>
    </base-dropdown>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// Components
import BaseDropdown from '@/components/UI/BaseDropdown.vue';

export default {
  components: {
    BaseDropdown,
  },
  emits: {
    edit(data) {
      return !!data?.id;
    },
    delete(data) {
      return !!data?.id;
    },
  },
  props: {
    board: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters('boards', ['selectedBoard']),
    className() {
      return {
        ['side-menu__board--active']: this.selectedBoard?.id === this.board.id,
      };
    },
    dropdownItems() {
      return [
        { icon: 'EditIcon', name: 'Edit', action: this.handleEdit },
        { icon: 'DeleteIcon', name: 'Delete', action: this.handleDelete },
      ];
    },
  },
  methods: {
    ...mapActions('boards', ['selectBoard']),
    handleEdit() {
      this.$emit('edit', this.board);
    },
    handleDelete() {
      this.$emit('delete', this.board);
    },
    handleSelectBoard() {
      if (this.selectedBoard?.id === this.board.id) {
        return;
      }

      this.$router.replace('/');

      this.selectBoard(this.board);
    },
  },
};
</script>

<style scoped lang="scss">
.side-menu__board {
  position: relative;
  margin: 0 auto 1rem auto;
  cursor: pointer;
  width: 3.75rem;
  height: 3.75rem;
  min-height: 3.75rem;
  border-radius: 6.6px;
  background-color: #145bc3;
  @include flex(row, center, center);
  transition: background-color 0.3s ease-in-out;

  &--active {
    background-color: #274e85 !important;
  }

  &:hover {
    background-color: #1854a8;

    .side-menu__board-menu {
      opacity: 1;
    }
  }

  &:active {
    background-color: #274e85;
  }
}
.side-menu__board-image {
  width: 100%;
  height: 100%;
  border-radius: 6.6px;
  object-fit: cover;
  display: block;
}
.side-menu__board-name {
  user-select: none;
  line-height: initial;
  @include font(2rem, 300, $white);
}
.side-menu__board-menu {
  position: absolute !important;
  right: -0.1rem;
  top: 0.1rem;
  width: 1.25rem;
  height: 1.25rem;
  opacity: 0;
  @include flex(row, center, center);
  transition: opacity 0.3s ease-in-out;
}
.side-menu__board-menu-icon {
  width: 1rem;
  height: 1rem;
  fill: $white;
}
</style>
