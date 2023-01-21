export default {
  isAuth(state) {
    return state.isAuth;
  },
  id(state) {
    return state.id;
  },
  loginLoading(state) {
    return state.loading.login;
  },
  signupLoading(state) {
    return state.loading.signup;
  },
};
