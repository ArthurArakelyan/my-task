import { setLoading } from '@/utils';

export default {
  setIsAuth(state, payload) {
    state.isAuth = payload;
  },
  setId(state, payload) {
    state.id = payload;
  },
  setLoading,
};
