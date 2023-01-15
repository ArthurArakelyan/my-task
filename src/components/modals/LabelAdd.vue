<template>
  <base-modal
    :title="labelEditEntry ? 'Edit a Label' : 'Add a Label'"
    @close="close"
  >
    <form @submit.prevent="handleSubmit" class="label-add">
      <base-input
        v-model="name"
        id="label-name"
        placeholder="Label Name"
        auto-focus
        :error="v$.name.$errors[0]?.$message"
      ></base-input>

      <base-input
        v-model="color"
        id="label-color"
        type="color"
        placeholder="Label Color"
        :error="v$.color.$errors[0]?.$message"
      ></base-input>

      <base-button :loading="addLabelLoading" class="label-add__submit">
        {{ labelEditEntry ? 'Edit' : 'Add' }}
      </base-button>
    </form>
  </base-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';

// Mixins
import { modalMixin } from '@/mixins';

// Components
import BaseModal from '@/components/UI/BaseModal.vue';

export default {
  mixins: [modalMixin],
  components: {
    BaseModal,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      name: '',
      color: '#000000',
    };
  },
  computed: {
    ...mapGetters('labels', ['addLabelLoading', 'labelEditEntry']),
    ...mapGetters('boards', ['selectedBoard']),
  },
  methods: {
    ...mapActions('labels', ['addLabel', 'editLabel']),
    close() {
      this.$emit('close');
    },
    async handleSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      if (!this.selectedBoard) {
        return;
      }

      if (this.labelEditEntry) {
        await this.editLabel({
          name: this.name,
          color: this.color,
        });
      } else {
        await this.addLabel({
          name: this.name,
          color: this.color,
          boardId: this.selectedBoard.id,
          count: 0,
        });
      }

      this.close();
    },
  },
  validations: {
    name: { required, maxLength: maxLength(256) },
    color: { required, maxLength: maxLength(256) },
  },
  created() {
    if (this.labelEditEntry) {
      this.name = this.labelEditEntry.name;
      this.color = this.labelEditEntry.color;
    }
  },
};
</script>

<style scoped lang="scss">
.label-add {
  width: 100%;
  row-gap: 2rem;
  @include flex(column, center, center);
}
.label-add__submit {
  margin-left: auto;
}
</style>
