<template>
  <base-modal title="Edit Password" @close="handleClose">
    <form class="user-password-edit" @submit.prevent="handleSubmit">
      <base-input
        v-model="oldPassword"
        placeholder="Old Password"
        type="password"
        id="old-password"
        auto-focus
        :error="v$.oldPassword.$errors[0]?.$message"
      ></base-input>

      <base-input
        v-model="newPassword"
        placeholder="New Password"
        type="password"
        id="new-password"
        :error="v$.newPassword.$errors[0]?.$message"
      ></base-input>

      <base-button
        :loading="editUserPasswordLoading"
        class="user-password-edit__submit"
      >
        Edit
      </base-button>
    </form>
  </base-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';

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
      oldPassword: '',
      newPassword: '',
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  computed: {
    ...mapGetters('user', ['editUserPasswordLoading']),
  },
  methods: {
    ...mapActions('user', ['editUserPassword']),
    handleClose() {
      this.$emit('close');
    },
    async handleSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      await this.editUserPassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      });

      this.handleClose();
    },
  },
  validations: {
    oldPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(256),
    },
    newPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(256),
    },
  },
};
</script>

<style scoped lang="scss">
.user-password-edit {
  width: 100%;
  row-gap: 2rem;
  @include flex(column, flex-start, flex-start);
}
.user-password-edit__submit {
  margin-left: auto;
}
</style>
