export default {
  user(state) {
    return state.user;
  },
  userName(state) {
    return state.user?.name || '';
  },
  userAvatar(state) {
    return state.user?.avatar || '';
  },
  userLoading(state) {
    return state.loading.user;
  },
};
