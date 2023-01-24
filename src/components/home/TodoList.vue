<template>
  <transition name="list" mode="out-in">
    <div v-if="emptyCondition" class="todo-list-empty">
      <p class="todo-list-empty__text">
        There are no to-dos in <b>{{ selectedBoard.name }}</b> board.
      </p>

      <base-button @click="handleAdd">
        Add To-do
      </base-button>
    </div>
    <transition-group v-else tag="div" name="todo" class="todo-list">
      <todo-item
        v-for="todo in todos"
        :key="todo.id"
        :id="todo.id"
        :name="todo.name"
        :label-id="todo.label"
        :completed="todo.completed"
        :comments-count="todo.comments.length"
        :attachments-count="todo.attachments.length"
      ></todo-item>
    </transition-group>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import TodoItem from './TodoItem.vue';

export default {
  components: {
    TodoItem,
  },
  emits: ['add'],
  computed: {
    ...mapGetters('todo', ['todos', 'hasTodos', 'getTodosLoading', 'hasCompletedTodos', 'getCompletedTodosLoading']),
    ...mapGetters('boards', ['selectedBoard']),
    emptyCondition() {
      return (!this.hasTodos && !this.getTodosLoading) && (!this.hasCompletedTodos && !this.getCompletedTodosLoading);
    },
  },
  methods: {
    ...mapActions('todo', ['getTodos']),
    handleAdd() {
      this.$emit('add');
    },
  },
  created() {
    this.getTodos();
  },
};
</script>

<style scoped lang="scss">
.todo-list {
  width: 100%;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  @include flex(row, flex-start, flex-start);
}
.todo-list-empty {
  width: 100%;
  margin-top: 6rem;
  @include flex(column, center, center);
}
.todo-list-empty__text {
  margin-bottom: 1rem;
  @include font(2rem, 300, $primary-text-color, center);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.list-enter-active,
.list-leave-active {
  transition: opacity .5s ease-in-out;
}
.list-enter-to,
.list-leave-from {
  opacity: 1;
}

.todo-enter-from,
.todo-leave-to {
  opacity: 0;
}
.todo-enter-active,
.todo-leave-active {
  transition: opacity .8s ease-in-out;
}
.todo-enter-to,
.todo-leave-from {
  opacity: 1;
}

.todo-move {
  transition: transform .5s ease-in-out;
}
</style>
