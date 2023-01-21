<template>
  <router-link :to="to" class="back">
    <base-icon name="ArrowBackIcon" class="back__icon"></base-icon>
    <span class="back__text">Back</span>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.back {
  text-decoration: none;
  @include flex(row, center, center);
}
.back__icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: $primary-text-color;
}
.back__text {
  margin-left: 0.5rem;
  @include font(1.2rem, 500, $primary-text-color);
}
</style>
