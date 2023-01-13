<template>
  <auth-container
    title="Login"
    primary="Login"
    secondary-link="/signup"
    secondary-text="Create an account"
    :loading="loginLoading"
    @submit="submit"
  >
    <div class="login">
      <base-input
        v-model="email"
        placeholder="Email"
        type="email"
        id="email"
        :error="v$.email.$errors[0]?.$message"
      ></base-input>

      <base-input
        v-model="password"
        placeholder="Password"
        type="password"
        id="password"
        :error="v$.password.$errors[0]?.$message"
      ></base-input>
    </div>
  </auth-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength } from '@vuelidate/validators';

import AuthContainer from '@/components/auth/AuthContainer.vue';

export default {
  components: {
    AuthContainer,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['loginLoading']),
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      const response = await this.login({
        email: this.email,
        password: this.password,
      });

      if (response) {
        this.$router.replace('/');
      }
    },
  },
  validations: {
    email: { required, email, maxLength: maxLength(256) },
    password: { required, minLength: minLength(6), maxLength: maxLength(256) },
  },
};
</script>

<style scoped lang="scss">
.login {
  margin-top: 2rem;
  width: 100%;
  row-gap: 2rem;
  @include flex(column, center, center);
}
</style>
