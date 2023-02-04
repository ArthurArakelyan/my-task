import { toast } from 'vue3-toastify';

// Store
import { getUserState } from './index';

// Services
import { AuthService, UsersService } from '@/services';

// Utils
import { getError } from '@/utils';

// Constants
import { authErrors } from '@/constants';

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
  async editUser(context, payload) {
    try {
      const user = context.getters.user;

      if (!user) {
        throw new Error('Something went wrong');
      }

      const data = {
        ...user,
        ...payload,
      };

      delete data.id;

      await UsersService.editUser(user.id, data);

      data.id = user.id;

      context.commit('setUser', data);

      return data;
    } catch (e) {
      console.log('editUser', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    }
  },
  async uploadAvatar(context, payload) {
    try {
      const userId = context.rootGetters['auth/id'];

      await UsersService.addAvatar(payload, userId);

      const avatar = await UsersService.getAvatar(userId);

      await context.dispatch('editUser', {
        avatar,
      });

      toast('Avatar has been uploaded successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return avatar;
    } catch (e) {
      console.log('uploadAvatar', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    }
  },
  async deleteAvatar(context) {
    try {
      context.commit('setLoading', { name: 'deleteAvatar', value: true });

      const userId = context.rootGetters['auth/id'];

      await UsersService.deleteAvatar(userId);

      await context.dispatch('editUser', {
        avatar: '',
      });

      toast('Avatar has been deleted successfully.', {
        type: 'success',
        hideProgressBar: true,
      });
    } catch (e) {
      console.log('deleteAvatar', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'deleteAvatar', value: false });
    }
  },
  async editUserName(context, payload) {
    try {
      context.commit('setLoading', { name: 'editUserName', value: true });

      const data = await context.dispatch('editUser', {
        name: payload,
      });

      toast('Name has been updated successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return data;
    } catch (e) {
      console.log('editUserName', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'editUserName', value: false });
    }
  },
  async editUserPassword(context, payload) {
    try {
      context.commit('setLoading', { name: 'editUserPassword', value: true });

      const { oldPassword, newPassword } = payload;

      const email = context.getters.userEmail;

      await AuthService.login(email, oldPassword);

      await AuthService.changePassword(newPassword);

      toast('Password has been updated successfully.', {
        type: 'success',
        hideProgressBar: true,
      });
    } catch (e) {
      console.log('editUserPassword', e);
      toast(getError(e.message, authErrors), {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'editUserPassword', value: false });
    }
  },
  async editUserEmail(context, payload) {
    try {
      context.commit('setLoading', { name: 'editUserEmail', value: true });

      const { email, password } = payload;

      const oldEmail = context.getters.userEmail;

      await AuthService.login(oldEmail, password);

      await AuthService.changeEmail(email);

      await context.dispatch('editUser', {
        email: email,
      });

      toast('Email has been updated successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return payload;
    } catch (e) {
      console.log('editUserEmail', e);
      toast(getError(e.message, authErrors), {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'editUserEmail', value: false });
    }
  },
  reset(context) {
    context.commit('setState', getUserState());
  },
};
