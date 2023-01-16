import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      labels: [],
      loading: {
        getLabels: false,
        addLabel: false,
        deleteLabel: false,
      },
    };
  },
  getters,
  actions,
  mutations,
};