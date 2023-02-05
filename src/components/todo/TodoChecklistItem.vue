<template>
  <div class="todo-checklist-item" :class="itemClassName">
    <base-checkbox
      :value="completed"
      :disabled="isCompleteLoading"
      @check="handleComplete"
    ></base-checkbox>

    <p v-if="!isEdit" class="todo-checklist-item__name" @click="handleEdit">
      {{ name }}
    </p>
    <todo-checklist-item-input
      v-else
      :id="id"
      :name="name"
      @close="handleCloseEdit"
    ></todo-checklist-item-input>

    <button class="todo-checklist-item__delete" @click="handleDelete">
      <base-icon
        name="CloseIcon"
        class="todo-checklist-item__delete-icon"
      ></base-icon>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue';
import TodoChecklistItemInput from '@/components/todo/TodoChecklistItemInput.vue';

export default {
  components: {
    BaseCheckbox,
    TodoChecklistItemInput,
  },
  emits: ['delete'],
  props: {
    id: String,
    name: String,
    completed: Boolean,
  },
  data() {
    return {
      isCompleteLoading: false,
      isEdit: false,
    };
  },
  computed: {
    ...mapGetters('todo', ['todoEntry']),
    ...mapGetters('checklist', ['addChecklistItemLoading']),
    itemClassName() {
      return {
        ['todo-checklist-item--completed']: this.completed,
      };
    },
  },
  methods: {
    ...mapActions('checklist', ['completeChecklistItem']),
    async handleComplete(value) {
      this.isCompleteLoading = true;

      await this.completeChecklistItem({
        id: this.id,
        completed: value,
      });

      this.isCompleteLoading = false;
    },
    handleDelete() {
      this.$emit('delete', this.id);
    },
    handleEdit() {
      this.isEdit = true;
    },
    handleCloseEdit() {
      this.isEdit = false;
    },
  },
};
</script>

<style scoped lang="scss">
.todo-checklist-item {
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #a2acc0;
  @include flex(row, center, flex-start);
  transition: opacity 0.3s ease-in-out;

  &:first-of-type {
    padding-top: 0.5rem;
  }

  &--completed {
    opacity: 0.6;
  }
}
.todo-checklist-item__name {
  width: 80%;
  word-break: break-word;
  margin-left: 1rem;
  cursor: text;
  line-height: 1.5rem;
  @include font(1rem, 400, $primary-text-color);
}
.todo-checklist-item__input {
  width: 80%;
  margin-left: 1rem;
  line-height: 1.5rem;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  @include font(1rem, 400, $primary-text-color);
}
.todo-checklist-item__delete {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: auto;
  cursor: pointer;
  border-radius: 50%;
  outline: none;
  border: none;
  background-color: transparent;
  padding: 0;
  @include flex(row, center, center);
}
.todo-checklist-item__delete-icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: $primary-text-color;
}
</style>
