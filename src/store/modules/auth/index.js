import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      isAuth: !!localStorage.getItem('token'),
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
