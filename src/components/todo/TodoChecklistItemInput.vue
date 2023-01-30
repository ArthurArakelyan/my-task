<template>
  <input
    type="text"
    ref="input"
    class="todo-checklist-item__input"
    v-model="value"
    v-click-outside="handleEditSubmit"
    @keydown.enter="handleEditSubmit"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';

export default {
  props: {
    id: String,
    name: String,
  },
  emits: ['close'],
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      value: this.name,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('checklist', ['checklist']),
  },
  methods: {
    ...mapActions('checklist', ['editChecklistItem']),
    handleEdit() {
      this.value = this.name;
    },
    handleEditCancel() {
      this.$emit('close');
    },
    async handleEditSubmit() {
      if (this.loading) {
        return;
      }

      if (this.value === this.name) {
        return this.handleEditCancel();
      }

      if (!(await this.v$.$validate())) {
        return this.handleEditCancel();
      }

      this.loading = true;

      const item = this.checklist.find((item) => item.id === this.id);

      if (!item) {
        return this.handleEditCancel();
      }

      await this.editChecklistItem({
        ...item,
        name: this.value,
      });

      this.loading = false;

      this.handleEditCancel();
    },
  },
  mounted() {
    this.$refs.input.focus();
    this.$refs.input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },
  validations: {
    value: { required, maxLength: maxLength(512) },
  },
};
</script>

<style scoped lang="scss">
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
</style>
