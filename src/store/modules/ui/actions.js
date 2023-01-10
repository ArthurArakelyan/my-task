export default {
  toggleSideMenu(context) {
    context.commit('setSideMenuOpen', !context.state.sideMenuOpen);
  },
};
