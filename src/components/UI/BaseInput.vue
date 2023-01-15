<template>
  <div
    class="input-wrapper"
    :class="wrapperClassName"
    @click="focus"
    @mousedown="handleMouseDown"
  >
    <span class="input__placeholder" ref="placeholder">
      {{ placeholder }}
    </span>

    <div v-if="type === 'color'" class="input__color" :style="{ backgroundColor: this.modelValue }"></div>

    <input
      class="input"
      :class="inputClassName"
      ref="input"
      :type="type"
      :id="id"
      :value="modelValue"
      :autofocus="autoFocus"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @animationstart="checkAnimation"
    />

    <transition name="error">
      <p v-if="!!error" class="input__error">{{ error }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    modelValue: {
      type: String,
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
    autoFocus: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isFocused: false,
      isDivided: false,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit('update:modelValue', e.target.value);
    },
    handleFocus() {
      this.isFocused = true;
      this.isDivided = true;
    },
    handleBlur() {
      const input = this.$refs.input;

      this.isDivided = !!input?.value;

      this.isFocused = false;
    },
    handleMouseDown() {
      setTimeout(() => {
        this.isFocused = true;
        this.isDivided = true;
      }, 0);
    },
    focus() {
      if (this.type === 'color') {
        this.$refs.input.click();
      } else {
        this.$refs.input.focus();
      }
    },
    checkAnimation(e) {
      if (e.animationName.includes('onAutoFillStart')) {
        this.isDivided = true;
      }
    },
  },
  computed: {
    inputClassName() {
      return {
        ['input--color']: this.type === 'color',
      };
    },
    wrapperClassName() {
      return {
        ['input-wrapper--color']: this.type === 'color',
        ['input-wrapper--focus']: this.isFocused,
        ['input-wrapper--divided']: this.isDivided,
        ['input-wrapper--error']: this.error,
      };
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
  z-index: 1;
  width: 100%;
  padding: 1rem 0.75rem;
  border: 1px solid #A2ACC0;
  border-radius: 3.3px;
  cursor: text;
  @include flex(row, center, flex-start);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;

  &--color {
    border-color: #A2ACC0 !important;

    .input__placeholder {
      color: #A2ACC0 !important;
    }
  }

  &--divided,
  &--focus {
    .input__placeholder {
      padding: 0 0.5rem;
      background-color: $white;
      transform: translateY(-1.7rem) translateX(-0.5rem) scale(0.8);
    }
  }

  &--focus {
    border-color: $primary-color;

    .input__placeholder {
      color: $primary-color;
    }
  }

  &--error {
    border-color: red !important;

    .input__placeholder {
      color: red !important;
    }
  }
}
.input__placeholder {
  position: absolute;
  user-select: none;
  line-height: 1.125rem;
  @include font(1rem, 400, #A2ACC0);
  transition: all .2s ease-in-out;
}
.input {
  border: none;
  outline: none;
  padding: 0;
  width: 100%;
  height: 100%;
  line-height: 1.125rem;
  @include font(1rem, 400, $primary-text-color);

  &--color {
    opacity: 0;
    visibility: hidden;
    position: absolute;
  }
}
.input__color {
  width: 100%;
  height: 1.125rem;
  border-radius: 3px;
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
