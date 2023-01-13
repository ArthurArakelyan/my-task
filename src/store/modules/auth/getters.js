export default {
  user(state) {
    return state.user;
  },
  isAuth(state) {
    return state.isAuth;
  },
  loginLoading(state) {
    return state.loading.login;
  },
  signupLoading(state) {
    return state.loading.signup;
  },
};
