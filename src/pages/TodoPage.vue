<template>
  <div class="todo">
    <base-back class="todo__back" to="/"></base-back>

    <base-loader v-if="getTodoLoading" class="todo__loader" size="large"></base-loader>
    <p v-if="!getTodoLoading && !todoEntry" class="todo__error">Something went wrong</p>
    <div v-if="!getTodoLoading && todoEntry" class="todo__content">
      <base-dropdown-button class="todo__dropdown" :items="dropdownItems"></base-dropdown-button>

      <div class="todo__header">
        <base-checkbox
          :value="todoEntry.completed"
          :disabled="statusChangeLoading"
          @check="handleComplete"
        ></base-checkbox>
      </div>

      <h2 class="todo__name">{{ todoEntry.name }}</h2>

      <div class="todo__label" :style="{ backgroundColor: `${label.color}33` }">
        <span class="todo__label-name" :style="{ color: label.color }">
          {{ label.name }}
        </span>
      </div>

      <div class="todo__section">
        <div class="todo__section-header">
          <h3 class="todo__section-header-title">Description</h3>
          <base-icon class="todo__description-header-icon" name="EditIcon" @click="changeDescriptionEdit(true)"></base-icon>
        </div>

        <div class="todo__section-content">
          <todo-description :is-edit="isDescriptionEdit" @edit="changeDescriptionEdit"></todo-description>
        </div>
      </div>

      <div v-if="isChecklistOpen || hasTodoChecklistItem" class="todo__section">
        <div class="todo__section-header">
          <h3 class="todo__section-header-title">Check List</h3>
        </div>

        <div class="todo__section-content">
          <todo-checklist
            :is-scroll="scrollToChecklist"
            @close="handleChecklistClose"
            @stop-scroll="handleStopChecklistScroll"
          ></todo-checklist>
        </div>
      </div>

      <div v-if="hasTodoAttachment" class="todo__section">
        <div class="todo__section-header">
          <h3 class="todo__section-header-title">Attachments</h3>
        </div>

        <div class="todo__section-content">
          <todo-attachments></todo-attachments>
        </div>
      </div>

      <todo-actions-bar
        @checklist="handleChecklistOpen"
      ></todo-actions-bar>
    </div>

    <base-modal-wrapper>
      <todo-add
        v-if="isEdit"
        :edit-entry="todoEntry"
        @close="handleCloseEdit"
      ></todo-add>
    </base-modal-wrapper>

    <base-modal-wrapper>
      <confirm-modal
        v-if="isDelete"
        content="Are you sure? Do you wanna delete this to-do?"
        :loading="deleteTodoLoading"
        @close="handleDeleteCancel"
        @submit="handleDeleteOk"
      ></confirm-modal>
    </base-modal-wrapper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import BaseBack from '@/components/UI/BaseBack.vue';
import BaseDropdownButton from '@/components/UI/BaseDropdownButton.vue';
import BaseModalWrapper from '@/components/UI/BaseModalWrapper.vue';
import TodoAdd from '@/components/modals/TodoAdd.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import TodoDescription from '@/components/todo/TodoDescription.vue';
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue';
import TodoActionsBar from '@/components/todo/TodoActionsBar.vue';
import TodoChecklist from '@/components/todo/TodoChecklist.vue';
import TodoAttachments from '@/components/todo/TodoAttachments.vue';

// Constants
import { defaultLabel } from '@/constants';

export default {
  components: {
    TodoDescription,
    ConfirmModal,
    TodoAdd,
    BaseModalWrapper,
    BaseDropdownButton,
    BaseBack,
    BaseCheckbox,
    TodoActionsBar,
    TodoChecklist,
    TodoAttachments,
  },
  props: {
    id: String,
  },
  data() {
    return {
      isEdit: false,
      isDelete: null,
      isDescriptionEdit: false,
      statusChangeLoading: false,
      isChecklistOpen: false,
      scrollToChecklist: false,
    };
  },
  computed: {
    ...mapGetters('todo', ['todoEntry', 'getTodoLoading', 'deleteTodoLoading']),
    ...mapGetters('labels', ['labels']),
    ...mapGetters('checklist', ['checklist', 'hasChecklist']),
    ...mapGetters('attachments', ['attachments', 'hasAttachments']),
    hasTodoChecklistItem() {
      return this.checklist.find((item) => item.todoId === this.todoEntry.id);
    },
    hasTodoAttachment() {
      return this.attachments.find((item) => item.todoId === this.todoEntry.id);
    },
    label() {
      if (!this.todoEntry) {
        return null;
      }

      return this.labels.find((label) => label.id === this.todoEntry.label) || defaultLabel;
    },
    dropdownItems() {
      return [
        { name: 'Edit', icon: 'EditIcon', action: this.handleEdit },
        { name: 'Delete', icon: 'DeleteIcon', action: this.handleDelete },
      ];
    },
  },
  methods: {
    ...mapActions('todo', ['getTodo', 'resetTodoEntry', 'deleteTodo', 'completeTodo']),
    ...mapActions('checklist', ['getChecklist']),
    ...mapActions('attachments', ['getAttachments']),
    changeDescriptionEdit(is) {
      this.isDescriptionEdit = is;
    },
    handleEdit() {
      this.isEdit = true;
    },
    handleCloseEdit() {
      this.isEdit = false;
    },
    handleDelete() {
      this.isDelete = true;
    },
    handleDeleteCancel() {
      this.isDelete = false;
    },
    handleChecklistOpen() {
      if (this.isChecklistOpen || this.hasTodoChecklistItem) {
        return this.scrollToChecklist = true;
      }

      this.isChecklistOpen = true;
    },
    handleChecklistClose() {
      this.isChecklistOpen = false;
    },
    handleStopChecklistScroll() {
      this.scrollToChecklist = false;
    },
    async handleDeleteOk() {
      await this.deleteTodo(this.id);

      this.handleDeleteCancel();

      this.$router.replace('/');
    },
    async handleComplete(value) {
      this.statusChangeLoading = true;

      await this.completeTodo({
        id: this.id,
        completed: value,
      });

      this.statusChangeLoading = false;
    },
  },
  created() {
    this.getTodo(this.id);

    if (!this.hasChecklist) {
      this.getChecklist();
    }

    if (!this.hasAttachments) {
      this.getAttachments();
    }
  },
  unmounted() {
    this.resetTodoEntry();
  },
};
</script>

<style scoped lang="scss">
.todo {
  position: relative;
  width: 100%;
  min-height: 100%;
  @include flex(column, flex-start, flex-start);
}
.todo__back {
  margin-bottom: 0.7rem;
}
.todo__loader {
  padding-bottom: 5rem;
  @include absoluteCenter();
}
.todo__error {
  @include absoluteCenter();
  @include font(2rem, 300, $primary-text-color, center);
}
.todo__content {
  width: 100%;
  margin-bottom: 4rem;
  @include flex(column, flex-start, flex-start);
}

.todo__dropdown {
  position: absolute;
  top: 0;
  right: 0;
}

.todo__header {
  width: 100%;
  margin-bottom: 0.4rem;
  @include flex(row, center, flex-start);
}

.todo__label {
  margin-top: 0.5rem;
  border-radius: 3.3px;
  padding: 0.4rem 0.75rem;
}
.todo__label-name {
  word-break: break-word;
  line-height: initial;
  @include font(0.9rem, 500, initial);
}

.todo__name {
  width: 100%;
  word-break: break-word;
  line-height: 1.3;
  @include font(2rem, 500, $primary-text-color);
}

.todo__section {
  width: 100%;
  margin-top: 1.5rem;
  @include flex(column, flex-start, flex-start);
}
.todo__section-header {
  width: 100%;
  @include flex(row, center, flex-start);
}
.todo__section-header-title {
  @include font(1.4rem, 400, $primary-text-color);
}
.todo__section-content {
  width: 100%;
  margin: 1rem 0;
  @include flex(column, flex-start, flex-start);
}

.todo__description-header-icon {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  stroke: $primary-text-color;
  margin-left: 1rem;
}
</style>
