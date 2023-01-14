<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal__overlay" @click="handleOverlayClick">
        <div class="modal__content">
          <div v-if="title" class="modal__header">
            <h2 class="modal__header-title">{{ title }}</h2>

            <div class="modal__header-close" @click="close">
              <base-icon class="modal__header-close-icon" name="CloseIcon"></base-icon>
            </div>
          </div>

          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// Mixins
import { modalMixin } from '@/mixins';

export default {
  mixins: [modalMixin],
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleEscClick(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    },
    handleOverlayClick(e) {
      if (e.target === e.currentTarget) {
        this.close();
      }
    },
  },
  mounted() {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleEscClick);
  },
  unmounted() {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleEscClick);
  },
};
</script>

<style scoped lang="scss">
.modal {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  overflow-y: auto;
  transition: background-color .3s ease-in-out;
  @include scroll();
}
.modal__overlay {
  min-height: 100%;
  width: 100%;
  @include flex(row, center, center);
}
.modal__content {
  position: relative;
  max-width: 700px;
  width: 100%;
  border-radius: 6.6px;
  min-height: 1rem;
  padding: 1.7rem;
  margin: 40px 0;
  z-index: 1000;
  background-color: $white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: opacity .3s ease-in-out, transform .3s ease-in-out;
  @include flex(column, center, center);
}
.modal__header {
  width: 100%;
  margin-bottom: 2rem;
  @include flex(row, center, space-between);
}
.modal__header-title {
  user-select: none;
  line-height: initial;
  @include font(2rem, 700, $primary-text-color);
}
.modal__header-close {
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  border-radius: 50%;
  background-color: transparent;
  transform: translateX(0.5rem);
  transition: background-color .3s ease-in-out;
  @include flex(row, center, center);

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.25);
  }
}
.modal__header-close-icon {
  width: 2rem;
  height: 2rem;
  fill: $primary-text-color;
}

.modal-enter-from,
.modal-leave-to {
  background-color: rgba(0, 0, 0, 0);

  .modal__content {
    opacity: 0;
    transform: scale(0.8);
  }
}
.modal-enter-to,
.modal-leave-from {
  background-color: rgba(0, 0, 0, 0.6);

  .modal__content {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
