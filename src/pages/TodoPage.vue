<template>
  <div class="todo">
    <base-back class="todo__back" to="/"></base-back>

    <base-loader v-if="getTodoLoading" class="todo__loader" size="large"></base-loader>
    <p v-if="!getTodoLoading && !todoEntry" class="todo__error">Something went wrong</p>
    <div v-if="!getTodoLoading && todoEntry" class="todo__content">
      <base-dropdown-button class="todo__dropdown" :items="dropdownItems"></base-dropdown-button>

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
        :loading="false"
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
  },
  props: {
    id: {},
  },
  data() {
    return {
      isEdit: false,
      isDelete: null,
      isDescriptionEdit: false,
    };
  },
  computed: {
    ...mapGetters('todo', ['todoEntry', 'getTodoLoading']),
    ...mapGetters('labels', ['labels']),
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
    ...mapActions('todo', ['getTodo', 'resetTodoEntry', 'deleteTodo']),
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
    async handleDeleteOk() {
      await this.deleteTodo(this.id);
      this.handleDeleteCancel();
      this.$router.replace('/');
    },
  },
  created() {
    this.getTodo(this.id);
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
  margin-bottom: 1rem;
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
  @include flex(column, flex-start, flex-start);
}

.todo__dropdown {
  position: absolute;
  top: 0;
  right: 0;
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
  margin-top: 1rem;
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
