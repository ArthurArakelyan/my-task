<template>
  <base-modal
    :title="editEntry ? 'Edit a Label' : 'Add a Label'"
    @close="handleClose"
  >
    <form class="todo-label-add" @submit.prevent="handleSubmit">
      <base-select
        v-model="label"
        placeholder="Label"
        key-name="id"
        value-name="name"
        :list="labels"
      >
        <template #beforeItem="beforeItemProps">
          <div
            class="todo-label-add__label"
            :style="{ backgroundColor: beforeItemProps.item.color }"
          />
        </template>
      </base-select>

      <base-button
        class="todo-label-add__submit"
        :loading="addTodoLoading || addLabelLoading"
      >
        {{ editEntry ? 'Edit' : 'Add' }}
      </base-button>
    </form>
  </base-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import BaseModal from '@/components/UI/BaseModal.vue';
import BaseSelect from '@/components/UI/BaseSelect.vue';

// Mixins
import { modalMixin } from '@/mixins';

export default {
  mixins: [modalMixin],
  components: {
    BaseSelect,
    BaseModal,
  },
  props: {
    editEntry: [null, Object],
  },
  data() {
    return {
      label: null,
    };
  },
  computed: {
    ...mapGetters('labels', ['labels', 'addLabelLoading']),
    ...mapGetters('todo', ['todoEntry', 'addTodoLoading']),
  },
  methods: {
    ...mapActions('todo', ['editTodo']),
    ...mapActions('labels', ['editLabel']),
    handleClose() {
      this.$emit('close');
    },
    async handleDecrementCountForLabel() {
      const previousLabel = this.todoEntry.label;
      const nextLabel = this.label;

      if (!previousLabel || previousLabel === nextLabel) {
        return;
      }

      const label = this.labels.find((l) => l.id === previousLabel);

      if (!label) {
        return;
      }

      await this.editLabel({
        ...label,
        count: label.count - 1,
      });
    },
    async handleAddCountForLabel(previousLabel) {
      const nextLabel = this.label;

      if (!nextLabel || nextLabel === previousLabel) {
        return;
      }

      const label = this.labels.find((l) => l.id === nextLabel);

      if (!label) {
        return;
      }

      await this.editLabel({
        ...label,
        count: label.count + 1,
      });
    },
    async handleSubmit() {
      await this.handleDecrementCountForLabel();

      const previousLabel = this.todoEntry.label;

      await this.editTodo({
        ...this.todoEntry,
        label: this.label,
      });

      await this.handleAddCountForLabel(previousLabel);

      this.handleClose();
    },
  },
  created() {
    if (this.editEntry) {
      this.label = this.editEntry.id;
    }
  },
};
</script>

<style scoped lang="scss">
.todo-label-add {
  width: 100%;
  @include flex(column, flex-start, flex-start);
}
.todo-label-add__label {
  width: 1.2rem;
  height: 1.2rem;
  min-width: 1.2rem;
  min-height: 1.2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.todo-label-add__submit {
  margin-top: 2rem;
}
</style>
