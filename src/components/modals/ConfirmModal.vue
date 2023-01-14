<template>
  <base-modal
    title="Confirm"
    @close="close"
  >
    <div class="confirm-modal">
      <h2 class="confirm-modal__title">
        {{ content }}
      </h2>

      <div class="confirm-modal__footer">
        <base-button @click="close" class="confirm-modal__footer-close">
          Cancel
        </base-button>

        <base-button :loading="loading" @click="$emit('submit')">
          Confirm
        </base-button>
      </div>
    </div>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/UI/BaseModal.vue';

// Mixins
import { modalMixin } from '@/mixins';

export default {
  mixins: [modalMixin],
  components: {
    BaseModal,
  },
  emits: ['submit'],
  props: {
    content: {
      type: String,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.confirm-modal {
  width: 100%;
  @include flex(column, center, center);
}
.confirm-modal__title {
  margin-bottom: 3rem;
  @include font(1.5rem, 500, $primary-text-color, center);
}
.confirm-modal__footer {
  width: 100%;
  column-gap: 1rem;
  @include flex(row, center, flex-end);
}
.confirm-modal__footer-close {
  background-color: #e11717 !important;

  &:hover {
    background-color: #cb1d1d !important;
  }

  &:active {
    background-color: #ad1818 !important;
  }
}
</style>
