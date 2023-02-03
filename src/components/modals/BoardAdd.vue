<template>
  <base-modal
    :title="editEntry ? 'Edit a Board' : 'Add a Board'"
    @close="$emit('close')"
  >
    <form class="board-add" @submit.prevent="handleSubmit">
      <base-input
        v-model="name"
        placeholder="Board Name"
        id="board-name"
        auto-focus
        :error="v$.name.$errors[0]?.$message"
      ></base-input>

      <base-upload-input
        v-model="image"
        placeholder="Board Image"
        id="board-image"
      ></base-upload-input>

      <base-button :loading="addBoardLoading" class="board-add__submit">
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
import BaseUploadInput from '@/components/UI/BaseUploadInput.vue';

export default {
  mixins: [modalMixin],
  components: {
    BaseUploadInput,
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
      image: null,
    };
  },
  computed: {
    ...mapGetters('boards', ['addBoardLoading']),
  },
  methods: {
    ...mapActions('boards', ['addBoard', 'editBoard']),
    async handleSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      if (this.editEntry) {
        await this.editBoard({
          ...this.editEntry,
          name: this.name,
          image: this.image?.size ? this.image : this.editEntry.image,
        });
      } else {
        await this.addBoard({
          name: this.name,
          image: this.image,
        });
      }

      this.$emit('close');
    },
  },
  validations: {
    name: { required, maxLength: maxLength(64) },
  },
  created() {
    if (this.editEntry) {
      this.name = this.editEntry.name;

      if (this.editEntry.imageName) {
        this.image = { name: this.editEntry.imageName };
      }
    }
  },
};
</script>

<style scoped lang="scss">
.board-add {
  width: 100%;
  row-gap: 2rem;
  @include flex(column, center, center);
}
.board-add__submit {
  margin-left: auto;
}
</style>
