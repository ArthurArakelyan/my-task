// Utils
import { setLoading, setState } from '@/utils';

export default {
  setUser(state, payload) {
    state.user = payload;
  },
  setLoading,
  setState,
};
