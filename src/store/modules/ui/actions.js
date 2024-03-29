// State
import { getUiState } from './index';

// Utils
import { initializeDeviceTypes } from '@/utils';

export default {
  toggleSideMenu(context) {
    context.commit('setSideMenuOpen', !context.state.sideMenuOpen);
  },
  openResponsiveSideMenuOpen(context) {
    context.commit('setSideMenuOpen', true);
    context.commit('setResponsiveSideMenuOpen', true);
  },
  closeResponsiveSideMenuOpen(context) {
    context.commit('setResponsiveSideMenuOpen', false);
  },
  changeLayout(context, payload) {
    context.commit('setLayout', payload);
  },
  toggleCompletedTodosOpen(context) {
    context.commit(
      'setCompletedTodosOpen',
      !context.getters.completedTodosOpen
    );
  },
  changeDeviceTypes(context) {
    context.commit('setDeviceTypes', initializeDeviceTypes());
  },
  changeConnection(context) {
    context.commit('setConnection', navigator.onLine);
  },
  reset(context) {
    context.commit('setState', getUiState());
  },
};
