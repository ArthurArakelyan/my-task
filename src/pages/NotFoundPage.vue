<template>
  <div class="not-found">
    <div class="not-found__content">
      <h2 class="not-found__title">Page not found</h2>
      <router-link class="not-found__link" to="/">Go to home page</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.not-found {
  width: 100%;
  height: 100%;
  @include flex(column, center, center);
}
.not-found__content {
  width: 100%;
  transform: translateY(-2rem);
  @include flex(column, center, center);
}
.not-found__title {
  @include font(2rem, 300, $primary-text-color);
}
.not-found__link {
  margin-top: 1.5rem;
  @include font(1rem, 700, $primary-text-color, center);
}

@include tablet-media {
  .not-found__content {
    transform: translateY(0);
  }
}
</style>
