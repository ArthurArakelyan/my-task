export default {
  toggleSideMenu(context) {
    context.commit('setSideMenuOpen', !context.state.sideMenuOpen);
  },
  changeLayout(context, payload) {
    localStorage.setItem('layout', payload);

    context.commit('setLayout', payload);
  },
};
