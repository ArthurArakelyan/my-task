import { toast } from 'vue3-toastify';

// Services
import { UsersService } from '@/services';

export default {
  async getUser(context) {
    try {
      context.commit('setLoading', { name: 'user', value: true });

      const id = context.rootGetters['auth/id'];

      if (!id) {
        throw new Error('The user is not logged in.');
      }

      const response = await UsersService.getUser(id);

      context.commit('setUser', response);

      return response;
    } catch (e) {
      console.log('getUser', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'user', value: false });
    }
  },
  async addUser(context, payload) {
    try {
      const data = { ...payload };

      delete data.id;

      await UsersService.addUser(data, payload.id);
    } catch (e) {
      console.log('addUser', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    }
  },
};
