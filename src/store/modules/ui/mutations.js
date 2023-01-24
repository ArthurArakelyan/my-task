import { setState } from '@/utils';

export default {
  setSideMenuOpen(state, payload) {
    state.sideMenuOpen = payload;
  },
  setResponsiveSideMenuOpen(state, payload) {
    state.responsiveSideMenuOpen = payload;
  },
  setLayout(state, payload) {
    state.layout = payload;
  },
  setCompletedTodosOpen(state, payload) {
    state.completedTodosOpen = payload;
  },
  setDeviceTypes(state, payload) {
    state.deviceTypes = payload;
  },
  setState,
};
