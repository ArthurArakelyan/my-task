<template>
  <div class="home-empty">
    <p v-if="hasBoards" class="home-empty__text">Please select a board</p>
    <div v-else class="home-empty__info">
      <p class="home-empty__info-text">You have no boards</p>

      <base-button @click="open">
        Create Board
      </base-button>

      <base-modal-wrapper>
        <board-add v-if="isAddModalOpen" @close="close" :edit-entry="null"></board-add>
      </base-modal-wrapper>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

// Components
import BaseModalWrapper from '@/components/UI/BaseModalWrapper.vue';
import BoardAdd from '@/components/modals/BoardAdd.vue';

export default {
  components: {
    BaseModalWrapper,
    BoardAdd,
  },
  data() {
    return {
      isAddModalOpen: false,
    };
  },
  computed: {
    ...mapGetters('boards', ['hasBoards']),
  },
  methods: {
    open() {
      this.isAddModalOpen = true;
    },
    close() {
      this.isAddModalOpen = false;
    },
  },
};
</script>

<style scoped lang="scss">
.home-empty {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);
}
.home-empty__text {
  transform: translateY(-3rem);
  @include font(2rem, 300, $primary-text-color, center);
}
.home-empty__info {
  transform: translateY(-3rem);
  @include flex(column, center, center);
}
.home-empty__info-text {
  margin-bottom: 1rem;
  @include font(2rem, 300, $primary-text-color, center);
}
</style>
