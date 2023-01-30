<template>
  <form
    class="todo-checklist-add"
    :class="formClassName"
    v-click-outside="handleSubmit"
    @submit.prevent="handleSubmit"
  >
    <base-checkbox disabled></base-checkbox>

    <input
      ref="input"
      type="text"
      class="todo-checklist-add__input"
      v-model="name"
    />

    <base-button type="submit" class="todo-checklist-add__submit">
      Add
    </base-button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';

// Components
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue';

export default {
  components: {
    BaseCheckbox,
  },
  emits: ['close'],
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      name: '',
    };
  },
  computed: {
    ...mapGetters('todo', ['todoEntry']),
    ...mapGetters('checklist', ['addChecklistItemLoading']),
    formClassName() {
      return {
        ['todo-checklist-add--loading']: this.addChecklistItemLoading,
      };
    },
  },
  methods: {
    ...mapActions('checklist', ['addChecklistItem']),
    handleClose() {
      this.$emit('close');
    },
    handleEscClick(e) {
      if (e.key === 'Escape') {
        this.handleSubmit();
      }
    },
    async handleSubmit() {
      if (this.addChecklistItemLoading) {
        return;
      }

      if (!(await this.v$.$validate())) {
        return this.handleClose();
      }

      await this.addChecklistItem({
        name: this.name,
        todoId: this.todoEntry.id,
      });

      this.name = '';

      setTimeout(() => {
        this.$refs.input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    },
  },
  mounted() {
    this.$refs.input.focus();
    this.$refs.input.scrollIntoView({ behavior: 'smooth', block: 'center' });

    document.addEventListener('keydown', this.handleEscClick);
  },
  unmounted() {
    document.removeEventListener('keydown', this.handleEscClick);
  },
  validations: {
    name: { required, maxLength: maxLength(512) },
  },
};
</script>

<style scoped lang="scss">
.todo-checklist-add {
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid #A2ACC0;
  @include flex(row, center, flex-start);
  transition: opacity .3s ease-in-out;

  &--loading {
    opacity: 0.6;
  }
}
.todo-checklist-add__input {
  width: 80%;
  margin-left: 1rem;
  outline: none;
  border: none;
  padding: 0.56rem 0;
  line-height: initial;
  background-color: transparent;
  @include font(1rem, 400, $primary-text-color);
}
.todo-checklist-add__submit {
  margin-left: auto;
  padding: 0.5rem 0.9rem;
}
</style>
