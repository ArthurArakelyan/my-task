<template>
  <div class="auth">
    <form @submit.prevent="handleSubmit" class="auth__content">
      <h1 class="auth__title">{{ title }}</h1>

      <slot></slot>

      <div class="auth__actions">
        <base-button :loading="loading">
          {{ primary }}
        </base-button>

        <router-link class="auth__actions-secondary" :to="secondaryLink">
          {{ secondaryText }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ['submit'],
  props: {
    title: {
      type: String,
      required: true,
    },
    primary: {
      type: String,
      required: true,
    },
    secondaryLink: {
      type: String,
      required: true,
    },
    secondaryText: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('submit');
    },
  },
};
</script>

<style scoped lang="scss">
.auth {
  width: 100%;
  min-height: 100vh;
  padding: 2rem 0;
  @include flex(row, center, center);
}
.auth__content {
  width: 500px;
  min-height: 70%;
  background-color: $white;
  border-radius: 6.6px;
  padding: 1.5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.auth__title {
  width: 100%;
  line-height: initial;
  @include font(2rem, 500, $primary-text-color, center);
}
.auth__actions {
  margin-top: 2rem;
  @include flex(row, center, flex-start);
}
.auth__actions-secondary {
  margin-left: 1rem;
  font-size: 1rem;
  font-weight: 400;
  transition: color .15s ease-in-out;

  &:active {
    color: $primary-text-color;
  }
}
</style>
