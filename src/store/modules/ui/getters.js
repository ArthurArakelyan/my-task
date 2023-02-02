export default {
  isSideMenuOpen(state) {
    return state.sideMenuOpen;
  },
  isResponsiveSideMenuOpen(state) {
    return state.responsiveSideMenuOpen;
  },
  layout(state) {
    return state.layout;
  },
  completedTodosOpen(state) {
    return state.completedTodosOpen;
  },
  connection(state) {
    return state.connection;
  },
  isMobile(state) {
    return state.deviceTypes.isMobile;
  },
  isTablet(state) {
    return state.deviceTypes.isTablet;
  },
  isSmallDesktop(state) {
    return state.deviceTypes.isSmallDesktop;
  },
  isDesktop(state) {
    return state.deviceTypes.isDesktop;
  },
};
