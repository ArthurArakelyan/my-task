<template>
  <div
    class="dropdown-wrapper"
    v-click-outside="handleClickOutside"
    @click.stop
    @mouseenter="open"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="dropdown-wrapper__content"
      ref="content"
      @click="toggle"
    >
      <slot></slot>
    </div>

    <transition name="dropdown">
      <div v-if="isOpen" class="dropdown" :class="dropdownClassName" :style="dropdownStyles">
        <div class="dropdown__content">
          <div
            v-for="item in items"
            :key="item.name"
            class="dropdown__item"
            @click="handleSelect(item)"
          >
            <div class="dropdown__item-icon-wrapper">
              <base-icon
                class="dropdown__item-icon"
                :class="{ 'dropdown__item-icon--fill': item.iconFill }"
                :name="item.icon"
              ></base-icon>
            </div>

            <span class="dropdown__item-name">
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  emits: ['select'],
  props: {
    items: {
      type: Array,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    triggerClick: {
      type: Boolean,
      required: false,
      default: false,
    },
    dropdownStyle: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isOpen: false,
      top: '',
      left: '',
    };
  },
  computed: {
    dropdownClassName() {
      return {
        ['dropdown--fixed']: this.fixed,
      };
    },
    dropdownStyles() {
      const styles = this.dropdownStyle || {};

      if (this.fixed) {
        return {
          ...styles,
          top: this.top,
          left: this.left,
        };
      }

      return styles;
    },
  },
  methods: {
    calculatePosition() {
      const rect = this.$refs.content.getBoundingClientRect();

      this.top = `${rect.top + rect.height}px`;
      this.left = `${rect.left - rect.width - 30}px`;
    },
    open(type) {
      if (this.triggerClick) {
        if (type === 'click') {
          this.isOpen = true;
        }
      } else {
        this.isOpen = true;
      }

      if (this.fixed) {
        this.calculatePosition();
      }
    },
    close() {
      this.isOpen = false;
    },
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open('click');
      }
    },
    handleMouseLeave() {
      if (this.triggerClick) {
        return;
      }

      this.close();
    },
    handleClickOutside() {
      if (this.triggerClick && this.isOpen) {
        this.isOpen = false;
      }
    },
    handleSelect(item) {
      this.$emit('select', item);
      item.action?.();
      this.close();
    },
  },
};
</script>

<style scoped lang="scss">
.dropdown-wrapper {
  position: relative;
  @include flex(row, center, center);
}
.dropdown-wrapper__content {

}

.dropdown {
  position: absolute;
  z-index: 10;
  top: 100%;
  width: 7.5rem;
  min-height: 4rem;
  border-radius: 6px;
  background-color: $white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: opacity .3s ease-in-out, transform .3s ease-in-out;

  &--fixed {
    position: fixed !important;
  }
}
.dropdown__content {
  width: 100%;
  padding: 1rem 0;
  @include flex(column, center, center);
}
.dropdown__item {
  cursor: pointer;
  padding: 0.5rem 0.7rem;
  width: 100%;
  background-color: $white;
  @include flex(row, center, flex-start);
  transition: background-color .3s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.25);
  }
}
.dropdown__item-icon-wrapper {
  width: 1rem;
  height: 1rem;
  @include flex(row, center, center);
}
.dropdown__item-icon {
  width: 1rem;
  height: 1rem;
  stroke: $primary-text-color;

  &--fill {
    fill: $primary-text-color;
    stroke: transparent !important;
  }
}
.dropdown__item-name {
  user-select: none;
  margin-left: 0.5rem;
  line-height: initial;
  @include ellipsis();
  @include font(1rem, 400, $primary-text-color);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
