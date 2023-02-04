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
  userEmail(state) {
    return state.user?.email || '';
  },
  userLoading(state) {
    return state.loading.user;
  },
  deleteAvatarLoading(state) {
    return state.loading.deleteAvatar;
  },
  editUserNameLoading(state) {
    return state.loading.editUserName;
  },
  editUserPasswordLoading(state) {
    return state.loading.editUserPassword;
  },
  editUserEmailLoading(state) {
    return state.loading.editUserEmail;
  },
};
