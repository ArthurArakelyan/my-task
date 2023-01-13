import { setLoading } from '@/utils';

export default {
  setUser(state, payload) {
    state.user = payload;
  },
  setIsAuth(state, payload) {
    state.isAuth = payload;
  },
  setLoading,
};
