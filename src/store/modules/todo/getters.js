export default {
  todos(state) {
    return state.todos;
  },
  hasTodos(state) {
    return !!state.todos.length;
  },
  todoEntry(state) {
    return state.todoEntry;
  },
  getTodosLoading(state) {
    return state.loading.getTodos;
  },
  getTodoLoading(state) {
    return state.loading.getTodo;
  },
  addTodoLoading(state) {
    return state.loading.addTodo;
  },
  deleteTodoLoading(state) {
    return state.loading.deleteTodo;
  },
};
