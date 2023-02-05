<template>
  <div class="todo-actions-bar">
    <div class="todo-actions-bar__content">
      <base-dropdown
        trigger-click
        :items="labelDropdownItems"
        :dropdown-style="labelDropdownStyles"
      >
        <button class="todo-actions-bar__action" title="Label">
          <base-icon name="TagIcon" class="todo-actions-bar__action-icon"></base-icon>
        </button>
      </base-dropdown>

      <button class="todo-actions-bar__action" title="Check List" @click="handleChecklist">
        <base-icon name="ChecklistIcon" class="todo-actions-bar__action-icon"></base-icon>
      </button>

      <button class="todo-actions-bar__action" :class="attachmentButtonClassName" title="Attachments" @click="handleAttachment">
        <input
          v-show="false"
          type="file"
          ref="attachment"
          class="todo-actions-bar__action-file"
          @change="handleFileChange"
        />

        <base-icon name="AttachmentIcon" class="todo-actions-bar__action-icon"></base-icon>
      </button>
    </div>

    <base-modal-wrapper>
      <todo-label-add
        v-if="isLabelModalOpen"
        :edit-entry="editLabelEntry"
        @close="handleCloseLabelModal"
      ></todo-label-add>
    </base-modal-wrapper>

    <base-modal-wrapper>
      <confirm-modal
        v-if="isLabelDeleteOpen"
        content="Are you sure? Do you wanna delete this label from to-do?"
        :loading="addTodoLoading"
        @submit="handleOkDeleteLabel"
        @close="handleCloseDeleteLabel"
      ></confirm-modal>
    </base-modal-wrapper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { toast } from 'vue3-toastify';

// Components
import BaseDropdown from '@/components/UI/BaseDropdown.vue';
import BaseModalWrapper from '@/components/UI/BaseModalWrapper.vue';
import TodoLabelAdd from '@/components/modals/TodoLabelAdd.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';

// Utils
import { compressImage } from '@/utils';

// Constants
import { maxFileSize } from '@/constants';

export default {
  components: {
    ConfirmModal,
    TodoLabelAdd,
    BaseDropdown,
    BaseModalWrapper,
  },
  emits: ['checklist'],
  data() {
    return {
      isLabelModalOpen: false,
      editLabelEntry: null,
      isLabelDeleteOpen: false,
    };
  },
  computed: {
    ...mapGetters('todo', ['todoEntry', 'addTodoLoading']),
    ...mapGetters('labels', ['labels']),
    ...mapGetters('attachments', ['addAttachmentLoading']),
    label() {
      return this.labels.find((label) => label.id === this.todoEntry.label);
    },
    labelDropdownItems() {
      if (this.label) {
        return [
          { icon: 'EditIcon', name: 'Edit Label', action: this.handleEditLabel },
          { icon: 'DeleteIcon', name: 'Delete Label', action: this.handleOpenDeleteLabel },
        ];
      }

      return [
        { icon: 'PlusIcon', iconFill: true, name: 'Add Label', action: this.handleOpenLabelModal },
      ];
    },
    labelDropdownStyles() {
      return {
        width: '140px',
        top: 'initial',
        bottom: '100%',
        left: '0',
      };
    },
    attachmentButtonClassName() {
      return {
        ['todo-actions-bar__action--loading']: this.addAttachmentLoading,
      };
    },
  },
  methods: {
    ...mapActions('todo', ['editTodo']),
    ...mapActions('labels', ['editLabel']),
    ...mapActions('attachments', ['addAttachment']),
    handleOpenLabelModal() {
      this.isLabelModalOpen = true;
    },
    handleCloseLabelModal() {
      this.isLabelModalOpen = false;
      this.editLabelEntry = null;
    },
    handleEditLabel() {
      this.editLabelEntry = this.label;
      this.handleOpenLabelModal();
    },
    handleOpenDeleteLabel() {
      this.isLabelDeleteOpen = true;
    },
    handleCloseDeleteLabel() {
      this.isLabelDeleteOpen = false;
    },
    handleChecklist() {
      this.$emit('checklist');
    },
    handleAttachment() {
      if (this.addAttachmentLoading) {
        return;
      }

      this.$refs.attachment.click();
    },
    async handleFileChange(e) {
      const file = e.target.files[0];

      if (!file) {
        return;
      }

      const newFile = await (file.type.includes('image') ? compressImage(file, { quality: 0.6, type: file.type }) : file);

      if (newFile.size > maxFileSize) {
        return toast('The file should be less than 3MB', {
          type: 'error',
          hideProgressBar: true,
        });
      }

      await this.addAttachment({
        file: newFile,
        todoId: this.todoEntry.id,
      });
    },
    async handleOkDeleteLabel() {
      const label = this.labels.find((label) => label.id === this.todoEntry.label);

      if (!label) {
        return this.handleCloseDeleteLabel();
      }

      await this.editLabel({
        ...label,
        count: label.count - 1,
      });

      await this.editTodo({
        ...this.todoEntry,
        label: null,
      });

      this.handleCloseDeleteLabel();
    },
  },
};
</script>

<style scoped lang="scss">
.todo-actions-bar {
  position: fixed;
  bottom: 0;
  right: 0;
  width: calc(100% - 6.25rem - 12.5rem);
  height: 4rem;
  background-color: #F6F7F8;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  transition: width .3s ease-in-out;

  &--menu-closed {
    width: calc(100% - 6.25rem);
  }
}
.todo-actions-bar__content {
  width: 100%;
  height: 100%;
  padding: 0.5rem 2rem;
  column-gap: 0.5rem;
  @include flex(row, center, flex-start);
}
.todo-actions-bar__action {
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  border-radius: 50%;
  outline: none;
  border: none;
  background-color: transparent;
  @include flex(row, center, center);
  transition: background-color .3s ease-in-out, opacity .3s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &--loading {
    cursor: default;
    opacity: 0.6;
    background-color: transparent !important;
  }
}
.todo-actions-bar__action-file {
  display: none;
}
.todo-actions-bar__action-icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: $primary-text-color;
}

@include small-desktop-media {
  .todo-actions-bar {
    width: 100%;
  }
  .todo-actions-bar__content {
    padding: 0.5rem 1.5rem;
  }
}
</style>
