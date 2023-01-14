<template>
  <div class="home">
    <h2 class="home__title" :class="titleClassName">
      Welcome back, <b>{{ userName }}</b>
    </h2>

    <home-actions></home-actions>

    <todo-list></todo-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import HomeActions from '@/components/home/HomeActions.vue';
import TodoList from '@/components/home/TodoList.vue';

export default {
  components: {
    HomeActions,
    TodoList,
  },
  computed: {
    ...mapGetters('user', ['userName']),
    titleClassName() {
      return {
        ['home__title--hide']: !this.userName,
      };
    },
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
