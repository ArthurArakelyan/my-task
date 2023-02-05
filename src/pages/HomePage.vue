<template>
  <div v-if="selectedBoard" class="home">
    <h2 v-if="!isMobile" class="home__title" :class="titleClassName">
      Welcome back, <b>{{ userName }}</b>
    </h2>

    <home-actions @add="openAddModal"></home-actions>

    <todo-list @add="openAddModal"></todo-list>

    <completed-todo-list></completed-todo-list>

    <base-modal-wrapper>
      <todo-add v-if="isAddModalOpen"  @close="closeAddModal"></todo-add>
    </base-modal-wrapper>
  </div>
  <empty-home-page v-else></empty-home-page>
</template>

<script>
import { mapGetters } from 'vuex';

// Components
import HomeActions from '@/components/home/HomeActions.vue';
import TodoList from '@/components/home/TodoList.vue';
import BaseModalWrapper from '@/components/UI/BaseModalWrapper.vue';
import TodoAdd from '@/components/modals/TodoAdd.vue';
import EmptyHomePage from '@/components/home/EmptyHomePage.vue';
import CompletedTodoList from '@/components/home/CompletedTodoList.vue';

// Constants
import { pageTitle } from '@/constants';

export default {
  components: {
    EmptyHomePage,
    TodoAdd,
    BaseModalWrapper,
    HomeActions,
    TodoList,
    CompletedTodoList,
  },
  data() {
    return {
      isAddModalOpen: false,
    };
  },
  computed: {
    ...mapGetters('ui', ['isMobile']),
    ...mapGetters('user', ['userName']),
    ...mapGetters('boards', ['selectedBoard']),
    titleClassName() {
      return {
        ['home__title--hide']: !this.userName,
      };
    },
  },
  watch: {
    selectedBoard(current) {
      this.changeTitle(current);
    },
  },
  methods: {
    openAddModal() {
      this.isAddModalOpen = true;
    },
    closeAddModal() {
      this.isAddModalOpen = false;
    },
    changeTitle(board) {
      if (!board) {
        document.title = pageTitle
        return;
      }

      document.title = `${board.name} | ${pageTitle}`;
    },
  },
  mounted() {
    this.changeTitle(this.selectedBoard);
  },
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  @include flex(column, flex-start, flex-start);
}

.home__title {
  opacity: 1;
  transition: opacity .3s ease-in-out;
  @include font(2.25rem, 300, $primary-text-color);

  &--hide {
    opacity: 0;
  }
}
</style>
