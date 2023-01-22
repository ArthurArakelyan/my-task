import mutations from './mutations';
import getters from './getters';
import actions from './actions';

// Utils
import { copyObject } from '@/utils';

const initialState = {
  id: null,
  isAuth: false,
  loading: {
    login: false,
    signup: false,
  },
};

export const getAuthState = () => {
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
