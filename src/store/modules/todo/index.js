import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      todos: [],
      todoEntry: null,
      loading: {
        getTodos: false,
        getTodo: false,
        addTodo: false,
        deleteTodo: false,
      },
    };
  },
  mutations,
  getters,
  actions,
};
