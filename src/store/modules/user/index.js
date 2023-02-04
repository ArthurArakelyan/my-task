import mutations from './mutations';
import actions from './actions';
import getters from './getters';

// Utils
import { copyObject } from '@/utils';

const initialState = {
  user: null,
  loading: {
    user: false,
    deleteAvatar: false,
    editUserName: false,
    editUserPassword: false,
    editUserEmail: false,
  },
};

export const getUserState = () => {
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
