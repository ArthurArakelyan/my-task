import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// Utils
import { copyObject, initializeDeviceTypes } from '@/utils';

const initialState = {
  sideMenuOpen: true,
  responsiveSideMenuOpen: false,
  layout: 'grid',
  completedTodosOpen: true,
  connection: navigator.onLine,
  deviceTypes: initializeDeviceTypes(),
};

export const getUiState = () => {
  return copyObject(initialState);
};

export default {
  namespaced: true,
  state() {
    return {
      ...initialState,
    };
  },
  actions,
  getters,
  mutations,
};
