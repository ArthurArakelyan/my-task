<template>
  <base-modal
    :title="boardEditEntry ? 'Edit a Board' : 'Add a Board'"
    @close="$emit('close')"
  >
    <form class="board-add" @submit.prevent="handleSubmit">
      <base-input
        v-model="name"
        placeholder="Board Name"
        id="board-name"
        :error="v$.name.$errors[0]?.$message"
      ></base-input>

      <base-upload-input
        v-model="image"
        placeholder="Board Image"
        id="board-image"
      ></base-upload-input>

      <base-button :loading="addBoardLoading" class="board-add__submit">
        {{ boardEditEntry ? 'Edit' : 'Add' }}
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
  data() {
    return {
      name: '',
      image: null,
    };
  },
  computed: {
    ...mapGetters('boards', ['addBoardLoading', 'boardEditEntry']),
  },
  methods: {
    ...mapActions('boards', ['addBoard', 'editBoard']),
    async handleSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      if (this.boardEditEntry) {
        await this.editBoard({
          ...this.boardEditEntry,
          name: this.name,
          image: this.image,
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
    name: { required, maxLength: maxLength(256) },
  },
  created() {
    if (this.boardEditEntry) {
      this.name = this.boardEditEntry.name;

      if (this.boardEditEntry.imageName) {
        this.image = { name: this.boardEditEntry.imageName };
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
