<template>
  <teleport to="#modal">
    <transition name="modal">
      <slot></slot>
    </transition>
  </teleport>
</template>

<script>
export default {

};
</script>
