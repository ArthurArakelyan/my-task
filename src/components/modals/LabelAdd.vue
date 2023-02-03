<template>
  <base-modal
    :title="editEntry ? 'Edit a Label' : 'Add a Label'"
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
        {{ editEntry ? 'Edit' : 'Add' }}
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

// Utils
import { getRandomColor } from '@/utils';

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
  props: {
    editEntry: {},
  },
  data() {
    return {
      name: '',
      color: getRandomColor(),
    };
  },
  computed: {
    ...mapGetters('labels', ['addLabelLoading']),
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

      if (this.editEntry) {
        await this.editLabel({
          ...this.editEntry,
          name: this.name,
          color: this.color,
        });
      } else {
        await this.addLabel({
          name: this.name,
          color: this.color,
          count: 0,
        });
      }

      this.close();
    },
  },
  validations: {
    name: { required, maxLength: maxLength(64) },
    color: { required, maxLength: maxLength(64) },
  },
  created() {
    if (this.editEntry) {
      this.name = this.editEntry.name;
      this.color = this.editEntry.color;
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
