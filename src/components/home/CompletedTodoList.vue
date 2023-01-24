<template>
  <div class="completed-todo-list-wrapper">
    <div v-if="hasCompletedTodos" class="completed-todo-list__header">
      <h3 class="completed-todo-list__header-title">
        Completed
      </h3>

      <span class="completed-todo-list__header-count">
        {{ completedTodosCount }}
      </span>

      <div class="completed-todo-list__header-toggle" :class="toggleClassName" @click="toggleCompletedTodosOpen">
        <base-icon name="ExpandIcon" class="completed-todo-list__header-toggle-icon"></base-icon>
      </div>
    </div>

    <transition-group v-if="completedTodosOpen" tag="div" name="todo" class="completed-todo-list">
      <todo-item
        v-for="todo in completedTodos"
        :key="todo.id"
        :id="todo.id"
        :name="todo.name"
        :label-id="todo.label"
        :completed="todo.completed"
        :comments-count="todo.comments.length"
        :attachments-count="todo.attachments.length"
      ></todo-item>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Components
import TodoItem from '@/components/home/TodoItem.vue';

export default {
  components: {
    TodoItem,
  },
  computed: {
    ...mapGetters('ui', ['completedTodosOpen']),
    ...mapGetters('todo', ['completedTodos', 'completedTodosCount', 'hasCompletedTodos']),
    toggleClassName() {
      return {
        ['completed-todo-list__header-toggle--close']: !this.completedTodosOpen,
      };
    },
  },
  methods: {
    ...mapActions('ui', ['toggleCompletedTodosOpen']),
    ...mapActions('todo', ['getCompletedTodos']),
  },
  created() {
    this.getCompletedTodos();
  },
};
</script>

<style scoped lang="scss">
.completed-todo-list-wrapper {
  margin-top: 2rem;
  width: 100%;
  @include flex(column, flex-start, flex-start);
}
.completed-todo-list__header {
  width: 100%;
  @include flex(row, center, flex-start);
}
.completed-todo-list__header-title {
  @include font(1.6rem, 500, $primary-text-color);
}
.completed-todo-list__header-count {
  margin-left: 1rem;
  @include font(1.5rem, 400, #8a8c9f);
}
.completed-todo-list__header-toggle {
  margin-left: auto;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  border-radius: 50%;
  @include flex(row, center, center);
  transition: transform .3s ease-in-out;

  &--close {
    transform: rotate(180deg);
  }
}
.completed-todo-list__header-toggle-icon {
  width: 2rem;
  height: 2rem;
  fill: $primary-text-color;
}
.completed-todo-list {
  width: 100%;
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  @include flex(row, flex-start, flex-start);
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
