import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      id: null,
      isAuth: false,
      loading: {
        login: false,
        signup: false,
      },
    };
  },
  getters,
  actions,
  mutations,
};
