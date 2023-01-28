<template>
  <base-modal
    :title="editEntry ? 'Edit a to-do' : 'Add a to-do'"
    @close="close"
  >
    <form @submit.prevent="handleSubmit" class="todo-add">
      <base-input
        v-model="name"
        placeholder="Name"
        auto-focus
        id="todo-name"
        :error="v$.name.$errors[0]?.$message"
      ></base-input>

      <base-select
        v-model="label"
        placeholder="Label"
        key-name="id"
        value-name="name"
        :list="labels"
        :error="v$.label.$errors[0]?.$message"
      >
        <template #beforeItem="beforeItemProps">
          <div class="todo-add__label" :style="{ backgroundColor: beforeItemProps.item.color }" />
        </template>
      </base-select>

      <base-button :loading="addTodoLoading || addLabelLoading" class="todo-add__submit">
        {{ editEntry ? 'Edit' : 'Add' }}
      </base-button>
    </form>
  </base-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';

// Mixins
import { modalMixin } from '@/mixins';

// Components
import BaseModal from '@/components/UI/BaseModal.vue';
import BaseSelect from '@/components/UI/BaseSelect.vue';

export default {
  components: {
    BaseSelect,
    BaseModal,
  },
  mixins: [modalMixin],
  props: {
    editEntry: {},
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      name: '',
      label: null,
    };
  },
  computed: {
    ...mapGetters('labels', ['labels', 'addLabelLoading']),
    ...mapGetters('todo', ['addTodoLoading']),
  },
  methods: {
    ...mapActions('todo', ['addTodo', 'editTodo']),
    ...mapActions('labels', ['editLabel']),
    close() {
      this.$emit('close');
    },
    async handleUpdateLabelsCount() {
      const previousLabelId = this.editEntry.label;
      const nextLabelId = this.label;

      if (previousLabelId === nextLabelId) {
        return;
      }

      let previousLabel = this.labels.find((label) => label.id === previousLabelId);
      let nextLabel = this.labels.find((label) => label.id === nextLabelId);

      if (!previousLabel || !nextLabel) {
        return;
      }

      previousLabel = { ...previousLabel };
      nextLabel = { ...nextLabel };

      return await Promise.all([
        this.editLabel({
          ...previousLabel,
          count: previousLabel.count - 1,
        }),
        this.editLabel({
          ...nextLabel,
          count: nextLabel.count + 1,
        }),
      ]);
    },
    async handleSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      const data = {
        name: this.name,
        label: this.label,
      };

      if (this.editEntry) {
        await this.handleUpdateLabelsCount();

        await this.editTodo({
          ...this.editEntry,
          ...data,
        });
      } else {
        await this.addTodo(data);
      }

      this.close();
    },
  },
  validations: {
    name: { required, maxLength: maxLength(256) },
    label: {},
  },
  mounted() {
    if (this.editEntry) {
      this.name = this.editEntry.name;
      this.label = this.editEntry.label;
    }
  },
};
</script>

<style scoped lang="scss">
.todo-add {
  width: 100%;
  row-gap: 2rem;
  @include flex(column, center, center);
}
.todo-add__label {
  width: 1.2rem;
  height: 1.2rem;
  min-width: 1.2rem;
  min-height: 1.2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.todo-add__submit {
  margin-left: auto;
}
</style>
