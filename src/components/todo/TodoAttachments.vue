<template>
  <div class="todo-attachments-wrapper">
    <transition-group tag="div" class="todo-attachments" name="attachment">
      <todo-attachment
        v-for="attachment in todoAttachments"
        :key="attachment.id"
        :id="attachment.id"
        :name="attachment.name"
        :type="attachment.type"
        :size="attachment.size"
        :path="attachment.path"
        @delete="handleDelete"
      ></todo-attachment>
    </transition-group>

    <base-modal-wrapper>
      <confirm-modal
        v-if="deleteEntry"
        content="Are you sure? Do you wanna delete this attachment?"
        :loading="deleteAttachmentLoading"
        @submit="handleDeleteOk"
        @close="handleDeleteCancel"
      ></confirm-modal>
    </base-modal-wrapper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import TodoAttachment from '@/components/todo/TodoAttachment.vue';
import BaseModalWrapper from '@/components/UI/BaseModalWrapper.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';

export default {
  components: {
    ConfirmModal,
    BaseModalWrapper,
    TodoAttachment,
  },
  data() {
    return {
      deleteEntry: null,
    };
  },
  computed: {
    ...mapGetters('attachments', ['attachments', 'deleteAttachmentLoading']),
    ...mapGetters('todo', ['todoEntry']),
    todoAttachments() {
      return this.attachments.filter((attachment) => attachment.todoId === this.todoEntry.id);
    },
  },
  methods: {
    ...mapActions('attachments', ['deleteAttachment']),
    handleDelete(attachment) {
      this.deleteEntry = attachment;
    },
    handleDeleteCancel() {
      this.deleteEntry = null;
    },
    async handleDeleteOk() {
      await this.deleteAttachment(this.deleteEntry);

      this.handleDeleteCancel();
    },
  },
};
</script>

<style scoped lang="scss">
.todo-attachments-wrapper {
  width: 100%;
  margin-top: 0.1rem;
}
.todo-attachments {
  width: 100%;
  row-gap: 1.5rem;
  @include flex(column, flex-start, flex-start);
}

.attachment-enter-from,
.attachment-leave-to {
  opacity: 0;
}
.attachment-enter-active,
.attachment-leave-active {
  transition: opacity .8s ease-in-out;
}
.attachment-enter-to,
.attachment-leave-from {
  opacity: 1;
}

.attachment-move {
  transition: transform .5s ease-in-out;
}
</style>
