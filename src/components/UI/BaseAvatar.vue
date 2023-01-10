<template>
  <img class="avatar" :src="avatarSrc" alt="Avatar" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  computed: {
    avatarSrc() {
      if (!this.src) {
        return require('../../assets/images/avatar.jpg');
      }

      return this.src;
    },
  },
};
</script>

<style scoped lang="scss">
.avatar {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  display: block;
}
</style>
