import mutations from './mutations';
import getters from './getters';
import actions from './actions';

// Utils
import { copyObject } from '@/utils';

const initialState = {
  boards: [],
  board: null,
  loading: {
    getBoards: false,
    addBoard: false,
    deleteBoard: false,
  },
};

export const getBoardsState = () => {
  return copyObject(initialState);
};

export default {
  namespaced: true,
  state() {
    return {
      ...initialState,
    };
  },
  getters,
  actions,
  mutations,
};
