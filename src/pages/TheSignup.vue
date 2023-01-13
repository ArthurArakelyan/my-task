<template>
  <auth-container
    title="Sign up"
    primary="Sign up"
    secondary-link="/login"
    secondary-text="Login"
    :loading="signupLoading"
    @submit="submit"
  >
    <div class="signup">
      <base-input
        v-model="name"
        placeholder="Name"
        id="name"
        :error="v$.name.$errors[0]?.$message"
      ></base-input>

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

      <base-input
        v-model="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        id="confirm-password"
        :error="v$.confirmPassword.$errors[0]?.$message"
      ></base-input>
    </div>
  </auth-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, email, minLength, maxLength } from '@vuelidate/validators';

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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['signupLoading']),
  },
  methods: {
    ...mapActions('auth', ['signup']),
    async submit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      const response = await this.signup({
        name: this.name,
        email: this.email,
        password: this.password,
      });

      if (response) {
        this.$router.replace('/');
      }
    },
  },
  validations: {
    name: { required, maxLength: maxLength(256) },
    email: { required, email, maxLength: maxLength(256) },
    password: { required, minLength: minLength(6), maxLength: maxLength(256) },
    confirmPassword: { required, custom: helpers.withMessage('Value should be the same as password', (value, fields) => value === fields.password) },
  },
};
</script>

<style scoped lang="scss">
.signup {
  margin-top: 2rem;
  width: 100%;
  row-gap: 2rem;
  @include flex(column, center, center);
}
</style>
