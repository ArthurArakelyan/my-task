<template>
  <transition-group tag="div" name="todo" class="todo-list">
    <todo-item
      v-for="todo in todoList"
      :key="todo.id"
      :name="todo.name"
      :label="todo.label"
      :comments-count="todo.commentsCount"
      :attachments-count="todo.attachmentsCount"
    ></todo-item>
  </transition-group>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      todoList: [
        { id: 1, name: 'Finalize the sales plan for new product marketing', label: { name: 'Marketing', color: '#1665D8' }, commentsCount: 4, attachmentsCount: 2 },
        { id: 2, name: 'Finalize the sales plan for new product marketing Finalize the sales plan for new product marketing Finalize the sales plan for new product marketing Finalize the sales plan for new product marketing Finalize the sales plan for new product marketing Finalize the sales plan for new product marketing Finalize the sales plan for new product marketing Finalize the sales plan for new product marketing', label: { name: 'Sales', color: '#F6C056' }, commentsCount: 2, attachmentsCount: 1 },
        { id: 3, name: 'Finalize the sales plan for new product marketing', label: { name: 'Operations', color: '#F85252' }, commentsCount: 4, attachmentsCount: 2 },
        { id: 4, name: 'Finalize the sales plan for new product marketing', label: { name: 'Marketing', color: '#6F48E1' }, commentsCount: 3, attachmentsCount: 6 },
        { id: 5, name: 'Finalize the sales plan for new product marketing', label: { name: 'Human Resources', color: '#F19445' }, commentsCount: 4, attachmentsCount: 2 },
        { id: 6, name: 'Finalize the sales plan for new product marketing', label: { name: 'Management', color: '#1665D8' }, commentsCount: 5, attachmentsCount: 2 },
        { id: 7, name: 'Finalize the sales plan for new product marketing', label: { name: 'Finance', color: '#60C354' }, commentsCount: 4, attachmentsCount: 3 },
        { id: 8, name: 'Finalize the sales plan for new product marketing', label: { name: 'Customer Service', color: '#AA44F6' }, commentsCount: 4, attachmentsCount: 2 },
      ],
    };
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
