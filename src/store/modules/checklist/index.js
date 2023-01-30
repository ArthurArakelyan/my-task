import mutations from './mutations';
import actions from './actions';
import getters from './getters';

// Utils
import { copyObject } from '@/utils';

const initialState = {
  checklist: [],
  loading: {
    getChecklist: false,
    addChecklistItem: false,
    deleteChecklistItem: false,
  },
};

export const getChecklistState = () => {
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
