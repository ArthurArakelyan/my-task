<template>
  <base-modal title="Edit Name" @close="handleClose">
    <form class="user-name-edit" @submit.prevent="handleSubmit">
      <base-input
        v-model="name"
        placeholder="Name"
        type="text"
        id="name"
        auto-focus
        :error="v$.name.$errors[0]?.$message"
      ></base-input>

      <base-button
        :loading="editUserNameLoading"
        class="user-name-edit__submit"
      >
        Edit
      </base-button>
    </form>
  </base-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
  data() {
    return {
      name: '',
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  computed: {
    ...mapGetters('user', ['userName', 'editUserNameLoading']),
  },
  methods: {
    ...mapActions('user', ['editUserName']),
    handleClose() {
      this.$emit('close');
    },
    async handleSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      await this.editUserName(this.name);

      this.handleClose();
    },
  },
  validations: {
    name: { required, maxLength: maxLength(256) },
  },
  created() {
    this.name = this.userName;
  },
};
</script>

<style scoped lang="scss">
.user-name-edit {
  width: 100%;
  @include flex(column, flex-start, flex-start);
}
.user-name-edit__submit {
  margin-top: 2rem;
  margin-left: auto;
}
</style>
