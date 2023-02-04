<template>
  <img
    class="avatar"
    alt="Avatar"
    :src="avatarSrc"
    @error="handleError"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      error: false,
    };
  },
  computed: {
    defaultAvatar() {
      return require('../../assets/images/avatar.jpg');
    },
    avatarSrc() {
      if (!this.src) {
        return this.defaultAvatar;
      }

      if (this.error) {
        return this.defaultAvatar;
      }

      return this.src;
    },
  },
  methods: {
    handleError() {
      this.error = true;
    },
  },
};
</script>

<style scoped lang="scss">
.avatar {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>
