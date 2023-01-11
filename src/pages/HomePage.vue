<template>
  <div class="home">
    <h2 class="home__title">Welcome back, <b>Michael</b></h2>

    <home-actions></home-actions>

    <todo-list></todo-list>
  </div>
</template>

<script>
import HomeActions from '@/components/home/HomeActions.vue';
import TodoList from '@/components/home/TodoList.vue';

export default {
  components: {
    HomeActions,
    TodoList,
  },
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  @include flex(column, flex-start, flex-start);
}

.home__title {
  @include font(2.25rem, 300, $primary-text-color);
}
</style>
