import mutations from './mutations';
import actions from './actions';
import getters from './getters';

// Utils
import { copyObject } from '@/utils';

const initialState = {
  todos: [],
  todoEntry: null,
  loading: {
    getTodos: false,
    getTodo: false,
    addTodo: false,
    deleteTodo: false,
  },
};

export const getTodoState = () => {
  return copyObject(initialState);
};

export default {
  namespaced: true,
  state() {
    return {
      ...initialState,
    };
  },
  mutations,
  getters,
  actions,
};
