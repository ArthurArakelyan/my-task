import mutations from './mutations';
import getters from './getters';
import actions from './actions';

// Utils
import { copyObject } from '@/utils';

const initialState = {
  labels: [],
  loading: {
    getLabels: false,
    addLabel: false,
    deleteLabel: false,
  },
};

export const getLabelsState = () => {
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
