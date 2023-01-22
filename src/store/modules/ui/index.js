import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// Utils
import { initializeDeviceTypes } from '@/utils';

export default {
  namespaced: true,
  state() {
    return {
      sideMenuOpen: true,
      responsiveSideMenuOpen: false,
      layout: 'grid',
      deviceTypes: initializeDeviceTypes(),
    };
  },
  actions,
  getters,
  mutations,
};
