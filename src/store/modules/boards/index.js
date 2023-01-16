import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      boards: [],
      board: JSON.parse(localStorage.getItem('board')) || null,
      loading: {
        getBoards: false,
        addBoard: false,
        deleteBoard: false,
      },
    };
  },
  getters,
  actions,
  mutations,
};
