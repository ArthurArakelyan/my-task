export default {
  todos(state) {
    return state.todos;
  },
  completedTodos(state) {
    return state.completedTodos;
  },
  hasTodos(state) {
    return !!state.todos.length;
  },
  hasCompletedTodos(state) {
    return !!state.completedTodos.length;
  },
  completedTodosCount(state) {
    return state.completedTodos.length;
  },
  todoEntry(state) {
    return state.todoEntry;
  },
  getTodosLoading(state) {
    return state.loading.getTodos;
  },
  getCompletedTodosLoading(state) {
    return state.loading.getCompletedTodos;
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
