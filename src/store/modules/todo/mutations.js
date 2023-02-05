// Utils
import { setLoading, setState } from '@/utils';

export default {
  setTodos(state, payload) {
    state.todos = payload;
  },
  setCompletedTodos(state, payload) {
    state.completedTodos = payload;
  },
  setTodoEntry(state, payload) {
    state.todoEntry = payload;
  },
  addTodo(state, payload) {
    state.todos.unshift(payload);
  },
  addCompletedTodo(state, payload) {
    state.completedTodos.unshift(payload);
  },
  deleteTodo(state, payload) {
    state.todos = state.todos.filter((todo) => todo.id !== payload);
  },
  deleteCompletedTodo(state, payload) {
    state.completedTodos = state.completedTodos.filter(
      (todo) => todo.id !== payload
    );
  },
  changeTodos(state, payload) {
    state.todos = state.todos.map((todo) =>
      todo.id === payload.id
        ? {
            ...todo,
            ...payload,
          }
        : todo
    );
  },
  changeCompletedTodos(state, payload) {
    state.completedTodos = state.completedTodos.map((todo) =>
      todo.id === payload.id
        ? {
            ...todo,
            ...payload,
          }
        : todo
    );
  },
  setLoading,
  setState,
};
