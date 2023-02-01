<template>
  <div
    class="input-wrapper"
    :class="wrapperClassName"
    @click="handleClick"
  >
    <div class="input__icon-wrapper">
      <base-icon class="input__icon" name="AddPhotoIcon"></base-icon>
    </div>

    <span class="input__placeholder">
      {{ placeholder }}
    </span>

    <span class="input__value">
      {{ modelValue?.name }}
    </span>

    <input
      class="input"
      ref="input"
      type="file"
      :id="id"
      @input="handleInput"
      @animationstart="checkAnimation"
    />

    <transition name="error">
      <p v-if="!!error" class="input__error">{{ error }}</p>
    </transition>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import {maxFileSize} from "@/constants";

export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    modelValue: {
      required: true,
    },
    error: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: String,
      required: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isDivided: false,
    };
  },
  methods: {
    handleInput(e) {
      const file = e.target.files[0];

      if (!file || !file.type.includes('image')) {
        return toast('The file should be an image.', {
          type: 'error',
          hideProgressBar: true,
        });
      }

      if (file.size > maxFileSize) {
        return toast('The file should be less than 3MB', {
          type: 'error',
          hideProgressBar: true,
        });
      }

      this.$emit('update:modelValue', file);
    },
    handleClick() {
      this.$refs.input.click();
    },
    checkAnimation(e) {
      if (e.animationName.includes('onAutoFillStart')) {
        this.isDivided = true;
      }
    },
  },
  computed: {
    wrapperClassName() {
      return {
        ['input-wrapper--divided']: this.isDivided,
        ['input-wrapper--error']: this.error,
      };
    },
  },
  watch: {
    modelValue(value) {
      if (value) {
        this.isDivided = true;
      }
    },
  },
  mounted() {
    if (this.modelValue) {
      this.isDivided = true;
    }
  },
};
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  min-height: 3.25rem;
  max-height: 3.25rem;
  z-index: 1;
  width: 100%;
  padding: 1rem 0.75rem;
  border: 1px solid #A2ACC0;
  border-radius: 3.3px;
  cursor: pointer;
  @include flex(row, center, flex-start);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;

  &--divided {
    .input__placeholder {
      background-color: $white;
      padding: 0 0.5rem;
      left: initial;
      transform: translateY(-1.7rem) translateX(-0.5rem) scale(0.8);
    }
  }

  &--error {
    border-color: red !important;

    .input__placeholder {
      color: red !important;
    }
  }
}
.input__icon-wrapper {
  position: absolute;
  transform: translateY(0.1rem);
  width: 1.7rem;
  height: 1.7rem;
  @include flex(row, center, center);
}
.input__icon {
  width: 100%;
  height: 100%;
  fill: $primary-text-color;
}
.input__placeholder {
  position: absolute;
  user-select: none;
  line-height: 1.125rem;
  left: 2.8rem;
  @include font(1rem, 400, #A2ACC0);
  transition: all .2s ease-in-out;
}
.input__value {
  margin-left: 2rem;
  line-height: initial;
  @include ellipsis();
  @include font(1rem, 400, $primary-text-color);
}
.input {
  display: none;
}
.input__error {
  position: absolute;
  top: calc(100% + 0.2rem);
  left: 0;
  @include font(0.8rem, 400, red);
  transition: opacity .3s ease-in-out;
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
}
.error-enter-to,
.error-leave-from {
  opacity: 1;
}

:-webkit-autofill {
  animation-name: onAutoFillStart;
}
:not(:-webkit-autofill) {
  animation-name: onAutoFillCancel;
}

@keyframes onAutoFillStart {}
@keyframes onAutoFillCancel {}
</style>
