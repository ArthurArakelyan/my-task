<template>
  <textarea
    ref="textarea"
    @input="handleInput"
    :value="modelValue"
  ></textarea>
</template>

<script>
import { autoResize } from '@/utils';

export default {
  props: ['modelValue'],
  emits: ['update:modelValue', 'mount'],
  methods: {
    handleInput(e) {
      this.$emit('update:modelValue', e.target.value);
      autoResize(e.target);
    },
  },
  mounted() {
    autoResize(this.$refs.textarea);
    this.$emit('mount', this.$refs.textarea);
  },
};
</script>
