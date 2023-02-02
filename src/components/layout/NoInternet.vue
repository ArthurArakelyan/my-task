<template>
  <div class="no-internet">
    <p class="no-internet__text">
      You have no internet connection
    </p>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped lang="scss">
.no-internet {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);
}
.no-internet__text {
  transform: translateY(-1.5rem);
  line-height: 1.3;
  @include font(2rem, 300, $primary-text-color, center);
}
</style>
