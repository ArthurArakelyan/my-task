<template>
  <div class="select-wrapper" ref="selectWrapper" v-click-outside="close">
    <div
      class="select"
      :class="selectClassName"
      @click="open"
    >
      <span class="select__placeholder" ref="placeholder">
        {{ placeholder }}
      </span>

      <span v-if="selectedItem" class="select__value">
        {{ selectedItem[valueName] }}
      </span>

      <transition name="error">
        <p v-if="!!error" class="select__error">{{ error }}</p>
      </transition>
    </div>

    <transition name="select">
      <div v-if="isOpen" class="select-list" :class="selectListClassName">
        <p v-if="!list.length" class="select-list__empty">
          No results available
        </p>
        <div v-else class="select-list__content">
          <div
            v-for="item in list"
            :key="item[this.keyName]"
            class="select-item"
            :class="{ ['select-item--active']: item[this.keyName] === modelValue }"
            @click="handleSelect(item[this.keyName])"
          >
            <slot name="beforeItem" :item="item"></slot>

            <span class="select-item__name">
              {{ item[this.valueName] }}
            </span>
          </div>
        </div>
      </div>
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
    modelValue: {
      required: true,
    },
    error: {
      type: String,
      required: false,
      default: '',
    },
    list: {
      type: Array,
      required: true,
    },
    keyName: {
      type: String,
    },
    valueName: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isOpen: false,
      reverse: false,
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    handleSelect(value) {
      this.close();
      this.$emit('update:modelValue', value);
    },
  },
  computed: {
    selectClassName() {
      return {
        ['select--open']: this.isOpen,
        ['select--divided']: this.modelValue,
        ['select--error']: this.error,
      };
    },
    selectListClassName() {
      return {
        ['select-list--reverse']: this.reverse,
      };
    },
    selectedItem() {
      return this.list.find((item) => item[this.keyName] === this.modelValue);
    },
  },
  mounted() {
    const selectWrapperElement = this.$refs.selectWrapper;
    const rect = selectWrapperElement.getBoundingClientRect();
    const top = rect.top + window.scrollY + 192;
    const screenHeight = window.screen.height;

    this.reverse = top > (screenHeight / 2);
  },
};
</script>

<style scoped lang="scss">
.select-wrapper {
  position: relative;
  width: 100%;
  @include flex(column, center, center);
}
.select {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 3.25rem;
  max-height: 3.25rem;
  padding: 1rem 0.75rem;
  border: 1px solid #A2ACC0;
  border-radius: 3.3px;
  cursor: pointer;
  @include flex(row, center, flex-start);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;

  &--open {
    border-radius: 3.3px 3.3px 0 0;
  }

  &--divided,
  &--focus {
    .select__placeholder {
      padding: 0 0.5rem;
      background-color: $white;
      transform: translateY(-1.7rem) translateX(-0.5rem) scale(0.8);
    }
  }

  &--error {
    border-color: red !important;

    .select__placeholder {
      color: red !important;
    }
  }
}
.select__placeholder {
  position: absolute;
  user-select: none;
  line-height: 1.125rem;
  @include font(1rem, 400, #A2ACC0);
  transition: all .2s ease-in-out;
}
.select__value {
  user-select: none;
  line-height: 1.125rem;
  @include font(1rem, 400, $primary-text-color);
}
.select__error {
  position: absolute;
  top: calc(100% + 0.2rem);
  left: 0;
  @include font(0.8rem, 400, red);
  transition: opacity .3s ease-in-out;
}

.select-list {
  position: absolute;
  z-index: 10;
  top: 100%;
  background-color: $white;
  width: 100%;
  min-height: 7rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 6px 6px;
  transition: opacity .3s ease-in-out, transform .3s ease-in-out;

  &--reverse {
    top: initial;
    border-radius: 6px 6px 0 0;
    bottom: calc(100% - 0.3rem);
  }
}
.select-list__empty {
  @include absoluteCenter();
  @include font(2rem, 300, $primary-text-color, center);
}
.select-list__content {
  padding: 0.5rem 0;
  overflow-y: auto;
  max-height: 12rem;
  @include scroll($primary-color);
}
.select-item {
  width: 100%;
  cursor: pointer;
  padding: 0.5rem 1rem;
  @include flex(row, center, flex-start);
  transition: background-color .3s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &--active {
    background-color: rgba(0, 0, 0, 0.07) !important;
  }
}
.select-item__name {
  width: 100%;
  line-height: initial;
  user-select: none;
  @include ellipsis();
  @include font(1rem, 400, $primary-text-color);
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.select-enter-to,
.select-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
}
.error-enter-to,
.error-leave-from {
  opacity: 1;
}
</style>
