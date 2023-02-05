<template>
  <div
    v-if="!todoEntry.description && !isEdit"
    class="todo__description-empty"
    @click="handleEdit"
  >
    <p class="todo__description-empty-text">
      Add a more detailed description...
    </p>
  </div>
  <div
    v-if="todoEntry.description && !isEdit"
    class="todo__description-text-wrapper"
    @click="handleEdit"
  >
    <p class="todo__description-text">
      {{ todoEntry.description }}
    </p>
  </div>
  <form
    v-if="isEdit"
    class="todo__description-form"
    @submit.prevent="handleSave"
    v-click-outside="handleSave"
  >
    <textarea-auto-resize
      class="todo__description-form-textarea"
      :class="textareaClassName"
      placeholder="Add a more detailed description..."
      v-model="description"
      autofocus
      @mount="handleTextareaMount"
    ></textarea-auto-resize>

    <transition name="error-message">
      <p
        v-if="v$.description.$errors[0]?.$message"
        class="todo__description-form-error"
      >
        {{ v$.description.$errors[0].$message }}
      </p>
    </transition>

    <div class="todo__description-form-actions">
      <base-button :loading="addTodoLoading">Save</base-button>
      <base-button
        class="todo__description-form-actions-cancel"
        type="button"
        @click="handleCancelEdit"
      >
        Cancel
      </base-button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { maxLength } from '@vuelidate/validators';

// Components
import TextareaAutoResize from '@/components/UI/TextareaAutoResize.vue';

export default {
  components: {
    TextareaAutoResize,
  },
  props: {
    isEdit: {
      type: Boolean,
    },
  },
  emits: {
    edit: (payload) => {
      return typeof payload === 'boolean';
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      description: '',
    };
  },
  computed: {
    ...mapGetters('todo', ['todoEntry', 'addTodoLoading']),
    textareaClassName() {
      return {
        ['todo__description-form-textarea--error']:
          this.v$.description.$errors[0]?.$message,
      };
    },
  },
  watch: {
    isEdit(current) {
      if (current) {
        this.description = this.todoEntry.description || '';
      }
    },
  },
  methods: {
    ...mapActions('todo', ['editTodo']),
    handleTextareaMount(element) {
      element.focus();
    },
    handleEdit() {
      this.$emit('edit', true);
    },
    handleCancelEdit() {
      this.$emit('edit', false);
    },
    async handleSave() {
      if (!(await this.v$.$validate())) {
        return;
      }

      if (this.description === this.todoEntry.description) {
        return this.handleCancelEdit();
      }

      await this.editTodo({
        ...this.todoEntry,
        description: this.description,
      });

      this.handleCancelEdit();
    },
  },
  validations: {
    description: { maxLength: maxLength(1028) },
  },
};
</script>

<style scoped lang="scss">
.todo__description-empty {
  width: 100%;
  border-radius: 3.3px;
  padding: 0.8rem;
  min-height: 5.625rem;
  background-color: #e6e6e6;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #dcdcdc;
  }

  &:active {
    background-color: #d2d2d2;
  }
}
.todo__description-empty-text {
  user-select: none;
  @include font(1rem, 400, $primary-text-color);
}

.todo__description-text-wrapper {
  width: 100%;
}
.todo__description-text {
  width: 100%;
  word-break: break-word;
  line-height: 1.5;
  white-space: pre-line;
  @include font(0.875rem, 400, $primary-text-color);
}

.todo__description-form {
  width: 100%;
  @include flex(column, flex-start, flex-start);
}
.todo__description-form-textarea {
  width: 100%;
  padding: 0.8rem;
  min-height: 5.625rem;
  border-radius: 3.3px;
  outline: none;
  background-color: $white;
  resize: none;
  overflow: hidden;
  border: 1px solid $primary-text-color;
  @include font(0.875rem, 400, $primary-text-color);
  transition: border-color 0.3s ease-in-out;

  &::placeholder {
    @include font(1rem, 400, $secondary-text-color);
  }

  &--error {
    border-color: red;
  }
}
.todo__description-form-error {
  margin-top: 0.25rem;
  @include font(1rem, 400, red);
  transition: opacity 0.3s ease-in-out;
}
.todo__description-form-actions {
  width: 100%;
  margin-top: 0.8rem;
  @include flex(row, center, flex-start);
}
.todo__description-form-actions-cancel {
  margin-left: 1rem;
  background-color: #bebebe;

  &:hover {
    background-color: #9f9d9d;
  }

  &:active {
    background-color: #858484;
  }
}

.error-message-enter-from,
.error-message-leave-to {
  opacity: 0;
}
.error-message-enter-to,
.error-message-leave-from {
  opacity: 1;
}
</style>
