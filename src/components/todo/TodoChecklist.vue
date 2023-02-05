<template>
  <div class="todo-checklist" ref="checklist">
    <transition-group tag="div" name="check" class="todo-checklist__list">
      <todo-checklist-item
        v-for="item in todoChecklist"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :completed="item.completed"
        @delete="handleDelete"
      ></todo-checklist-item>
    </transition-group>

    <todo-checklist-add
      v-if="addOpen"
      @close="handleAddClose"
    ></todo-checklist-add>
    <base-button v-else class="todo-checklist__add" @click="handleAddOpen">
      Add Item
    </base-button>

    <base-modal-wrapper>
      <confirm-modal
        v-if="deleteEntry"
        content="Are you sure? Do you wanna delete this check list item?"
        :loading="deleteChecklistItemLoading"
        @close="handleDeleteClose"
        @submit="handleDeleteOk"
      ></confirm-modal>
    </base-modal-wrapper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import TodoChecklistAdd from '@/components/todo/TodoChecklistAdd.vue';
import TodoChecklistItem from '@/components/todo/TodoChecklistItem.vue';
import BaseModalWrapper from '@/components/UI/BaseModalWrapper.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';

export default {
  components: {
    ConfirmModal,
    BaseModalWrapper,
    TodoChecklistAdd,
    TodoChecklistItem,
  },
  emits: ['close', 'stopScroll'],
  props: {
    isScroll: Boolean,
  },
  data() {
    return {
      addOpen: false,
      deleteEntry: null,
    };
  },
  computed: {
    ...mapGetters('todo', ['todoEntry']),
    ...mapGetters('checklist', ['checklist', 'deleteChecklistItemLoading']),
    todoChecklist() {
      return this.checklist.filter((item) => item.todoId === this.todoEntry.id);
    },
    hasTodoChecklistItem() {
      return !!this.todoChecklist.length;
    },
  },
  watch: {
    isScroll(current) {
      if (current) {
        this.$refs.checklist.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        this.$emit('stopScroll');
      }
    },
  },
  methods: {
    ...mapActions('checklist', ['deleteChecklistItem']),
    handleClose() {
      this.$emit('close');
    },
    handleAddOpen() {
      this.addOpen = true;
    },
    handleAddClose() {
      this.addOpen = false;

      if (!this.hasTodoChecklistItem) {
        this.handleClose();
      }
    },
    handleDelete(item) {
      this.deleteEntry = item;
    },
    handleDeleteClose() {
      this.deleteEntry = null;
    },
    async handleDeleteOk() {
      await this.deleteChecklistItem(this.deleteEntry);

      this.handleDeleteClose();
    },
  },
  mounted() {
    if (!this.hasTodoChecklistItem) {
      this.handleAddOpen();
    }
  },
};
</script>

<style scoped lang="scss">
.todo-checklist {
  width: 100%;
  @include flex(column, flex-start, flex-start);
}
.todo-checklist__list {
  width: 100%;
}
.todo-checklist__add {
  margin-top: 1rem;
}

.check-enter-from,
.check-leave-to {
  opacity: 0;
}
.check-enter-active,
.check-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.check-enter-to,
.check-leave-from {
  opacity: 1;
}

.check-move {
  transition: transform 0.5s ease-in-out;
}
</style>
