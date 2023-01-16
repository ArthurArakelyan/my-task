<template>
  <transition name="menu">
    <div v-if="isSideMenuOpen" class="side-menu-extension">
      <div class="side-menu-extension__header">
        <h1 class="side-menu-extension__header-title">
          {{ selectedBoard ? selectedBoard.name : 'My Task' }}
        </h1>
      </div>

      <div class="side-menu-extension__content">
        <p v-if="!getLabelsLoading && !hasLabels" class="side-menu-extension__empty">
          There are no labels
        </p>

        <side-menu-extension-label
          v-for="label in labels"
          :key="label.id"
          :label="label"
          @edit="handleEdit"
          @delete="handleDelete"
        ></side-menu-extension-label>

        <div class="side-menu-extension__label-add" @click="openAddModal">
          <base-icon class="side-menu-extension__label-add-icon" name="PlusIcon"></base-icon>
        </div>
      </div>

      <base-modal-wrapper>
        <label-add v-if="isAddModalOpen" @close="closeAddModal" :edit-entry="editEntry"></label-add>
      </base-modal-wrapper>

      <base-modal-wrapper>
        <confirm-modal
          v-if="deleteEntry"
          content="Are you sure? Do you wanna delete this label?"
          :loading="deleteLabelLoading"
          @submit="handleDeleteLabelOk"
          @close="handleDeleteLabelCancel"
        ></confirm-modal>
      </base-modal-wrapper>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import BaseModalWrapper from '@/components/UI/BaseModalWrapper.vue';
import LabelAdd from '@/components/modals/LabelAdd.vue';
import SideMenuExtensionLabel from '@/components/layout/SideMenuExtensionLabel.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';

export default {
  components: {
    ConfirmModal,
    SideMenuExtensionLabel,
    LabelAdd,
    BaseModalWrapper,
  },
  data() {
    return {
      editEntry: null,
      deleteEntry: null,
      isAddModalOpen: false,
    };
  },
  computed: {
    ...mapGetters('ui', ['isSideMenuOpen']),
    ...mapGetters('boards', ['selectedBoard']),
    ...mapGetters('labels', ['labels', 'hasLabels', 'getLabelsLoading', 'deleteLabelLoading']),
  },
  methods: {
    ...mapActions('labels', ['getLabels', 'deleteLabel']),
    openAddModal() {
      this.isAddModalOpen = true;
    },
    closeAddModal() {
      this.isAddModalOpen = false;
      this.editEntry = null;
    },
    handleEdit(data) {
      this.editEntry = data;
      this.openAddModal();
    },
    handleDelete(data) {
      this.deleteEntry = data;
    },
    handleDeleteLabelCancel() {
      this.deleteEntry = null;
    },
    async handleDeleteLabelOk() {
      await this.deleteLabel(this.deleteEntry.id);
      this.handleDeleteLabelCancel();
    },
  },
  created() {
    this.getLabels();
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
  line-height: initial;
  @include ellipsis();
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
.side-menu-extension__empty {
  margin: 0.5rem 0;
  width: 100%;
  @include font(1rem, 400, $primary-text-color, center);
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
