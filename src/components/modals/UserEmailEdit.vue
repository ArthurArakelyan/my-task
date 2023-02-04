<template>
  <base-modal
    title="Edit Email"
    @close="handleClose"
  >
    <form class="user-email-edit" @submit.prevent="handleSubmit">
      <base-input
        v-model="email"
        placeholder="Email"
        type="email"
        id="email"
        auto-focus
        :error="v$.email.$errors[0]?.$message"
      ></base-input>

      <base-input
        v-model="password"
        placeholder="Password"
        type="password"
        id="password"
        :error="v$.password.$errors[0]?.$message"
      ></base-input>

      <base-button :loading="editUserEmailLoading" class="user-email-edit__submit">
        Edit
      </base-button>
    </form>
  </base-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { email, maxLength, minLength, required } from '@vuelidate/validators';

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
      email: '',
      password: '',
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  computed: {
    ...mapGetters('user', ['userEmail', 'editUserEmailLoading']),
  },
  methods: {
    ...mapActions('user', ['editUserEmail']),
    handleClose() {
      this.$emit('close');
    },
    async handleSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      await this.editUserEmail({
        email: this.email,
        password: this.password,
      });

      this.handleClose();
    },
  },
  validations: {
    email: { required, email, maxLength: maxLength(256) },
    password: { required, minLength: minLength(6), maxLength: maxLength(256) },
  },
  created() {
    this.email = this.userEmail;
  },
};
</script>

<style scoped lang="scss">
.user-email-edit {
  width: 100%;
  row-gap: 2rem;
  @include flex(column, flex-start, flex-start);
}
.user-email-edit__submit {
  margin-left: auto;
}
</style>
