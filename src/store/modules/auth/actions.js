import { toast } from 'vue3-toastify';

// Services
import { AuthService } from '@/services';

// Utils
import { getError } from '@/utils';

// Constants
import { authErrors } from '@/constants';

export default {
  updateAuth(context) {
    context.commit('setIsAuth', !!localStorage.getItem('token'));
    context.commit('setUser', AuthService.authUser());
  },
  async login(context, payload) {
    try {
      context.commit('setLoading', { name: 'login', value: true });

      const response = await AuthService.login(payload.email, payload.password);

      localStorage.setItem('token', response._tokenResponse.idToken);

      await context.dispatch('updateAuth');

      return response;
    } catch (e) {
      toast(getError(e.message, authErrors), {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'login', value: false });
    }
  },
  async signup(context, payload) {
    try {
      context.commit('setLoading', { name: 'signup', value: true });

      const response = await AuthService.signup(payload.email, payload.password);

      localStorage.setItem('token', response._tokenResponse.idToken);

      await context.dispatch('updateAuth');

      return response;
    } catch (e) {
      toast(getError(e.message, authErrors), {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'signup', value: false });
    }
  },
  async logout() {
    try {
      localStorage.removeItem('token');

      await AuthService.logout();
    } catch (e) {
      console.log(e);
    }
  },
};
