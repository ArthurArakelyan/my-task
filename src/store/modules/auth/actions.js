import { toast } from 'vue3-toastify';

// Store
import { getAuthState } from './index';

// Services
import { AuthService } from '@/services';

// Utils
import { getError } from '@/utils';

// Constants
import { authErrors } from '@/constants';

export default {
  updateAuth(context) {
    const user = AuthService.authUser();

    context.commit('setId', user?.uid || null);
    context.commit('setIsAuth', !!user);
  },
  async login(context, payload) {
    try {
      context.commit('setLoading', { name: 'login', value: true });

      const response = await AuthService.login(payload.email, payload.password);

      await context.dispatch('updateAuth');

      return response;
    } catch (e) {
      console.log('login', e);
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

      const response = await AuthService.signup(
        payload.email,
        payload.password
      );

      await context.dispatch(
        'user/addUser',
        {
          id: response.user.uid,
          name: payload.name,
          email: payload.email,
          avatar: '',
        },
        { root: true }
      );

      await context.dispatch('updateAuth');

      return response;
    } catch (e) {
      console.log('signup', e);
      toast(getError(e.message, authErrors), {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'signup', value: false });
    }
  },
  async logout(context) {
    try {
      await AuthService.logout();
      await context.dispatch('resetState', {}, { root: true });
    } catch (e) {
      console.log('logout', e);
    }
  },
  reset(context) {
    context.commit('setState', getAuthState());
  },
};
