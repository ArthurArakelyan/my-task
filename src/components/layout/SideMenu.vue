<template>
  <aside class="side-menu">
    <div class="side-menu__header">
      <div @click="toggleSideMenu" class="side-menu__header-logo">
        <img
          class="side-menu__header-logo-img"
          :src="logoSrc"
          alt="Logo"
          width="60"
          height="60"
        />
      </div>
    </div>

    <div class="side-menu__content">
      <side-menu-item
        v-for="board in boards"
        :key="board.id"
        :board="board"
        @edit="handleEdit"
        @delete="handleDelete"
      ></side-menu-item>

      <div
        @click="openAddModal"
        class="side-menu__content-add"
        title="Add a Board"
      >
        <base-icon
          class="side-menu__content-add-icon"
          name="PlusIcon"
        ></base-icon>
      </div>
    </div>

    <div class="side-menu__footer">
      <div @click="logout" class="side-menu__footer-logout">
        <base-icon
          name="LogoutIcon"
          class="side-menu__footer-logout-icon"
        ></base-icon>
      </div>
    </div>

    <base-modal-wrapper>
      <board-add
        v-if="isAddModalOpen"
        @close="closeAddModal"
        :edit-entry="editEntry"
      ></board-add>
    </base-modal-wrapper>

    <base-modal-wrapper>
      <confirm-modal
        v-if="deleteEntry"
        content="Are you sure? Do you wanna delete this board?"
        :loading="deleteBoardLoading"
        @close="handleDeleteCancel"
        @submit="handleDeleteOk"
      ></confirm-modal>
    </base-modal-wrapper>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// Components
import BoardAdd from '@/components/modals/BoardAdd.vue';
import BaseModalWrapper from '@/components/UI/BaseModalWrapper.vue';
import SideMenuItem from '@/components/layout/SideMenuItem.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';

export default {
  components: {
    ConfirmModal,
    BoardAdd,
    BaseModalWrapper,
    SideMenuItem,
  },
  data() {
    return {
      editEntry: null,
      deleteEntry: null,
      isAddModalOpen: false,
    };
  },
  computed: {
    ...mapGetters('boards', ['boards', 'selectedBoard', 'deleteBoardLoading']),
    logoSrc() {
      return require('../../assets/images/logo.png');
    },
  },
  methods: {
    ...mapActions('ui', ['toggleSideMenu']),
    ...mapActions('auth', ['logout']),
    ...mapActions('boards', ['selectBoard', 'deleteBoard']),
    openAddModal() {
      this.isAddModalOpen = true;
    },
    closeAddModal() {
      this.editEntry = null;
      this.isAddModalOpen = false;
    },
    handleEdit(data) {
      this.editEntry = data;
      this.openAddModal();
    },
    handleDelete(data) {
      this.deleteEntry = data;
    },
    handleDeleteCancel() {
      this.deleteEntry = null;
    },
    async handleDeleteOk() {
      await this.deleteBoard(this.deleteEntry.id);
      this.handleDeleteCancel();
    },
  },
};
</script>

<style scoped lang="scss">
.side-menu {
  position: relative;
  z-index: 1;
  min-width: 6.25rem;
  width: 6.25rem;
  height: 100vh;
  background-color: #1665d8;
  @include flex(column, flex-start, flex-start);
}

.side-menu__header {
  width: 100%;
  height: 6.25rem;
  border-bottom: 1px solid #2d74dc;
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
  max-height: calc(100vh - 12.5rem);
  overflow-y: auto;
  @include scroll(#ffffff);
}

.side-menu__content-add {
  margin: 0 auto;
  cursor: pointer;
  width: 3.75rem;
  height: 3.75rem;
  min-height: 3.75rem;
  border-radius: 6.6px;
  background-color: #145bc3;
  @include flex(row, center, center);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #1854a8;
  }

  &:active {
    background-color: #274e85;
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
  border-top: 1px solid #2d74dc;
  @include flex(column, center, center);
}
.side-menu__footer-logout {
  cursor: pointer;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 6.6px;
  @include flex(row, center, center);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #2d74dc;

    .side-menu__footer-logout-icon {
      stroke: $white;
    }
  }

  &:active {
    background-color: #4285e5;
  }
}
.side-menu__footer-logout-icon {
  width: 2rem;
  height: 2rem;
  stroke: #6ea0e7;
  transition: stroke 0.3s ease-in-out;
}

@include small-desktop-media {
  .side-menu__header {
    height: 5rem;
  }
  .side-menu__footer {
    height: 5rem;
  }
}
</style>
