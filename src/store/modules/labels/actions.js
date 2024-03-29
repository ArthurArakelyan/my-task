import { toast } from 'vue3-toastify';

// Store
import { getLabelsState } from './index';

// Services
import { LabelsService } from '@/services';

export default {
  async getLabels(context) {
    try {
      context.commit('setLoading', { name: 'getLabels', value: true });

      const board = context.rootGetters['boards/selectedBoard'];
      const user = context.rootGetters['user/user'];

      if (!board?.id || !user?.id) {
        return;
      }

      const response = await LabelsService.getLabels(board.id, user.id);

      context.commit('setLabels', response);

      return response;
    } catch (e) {
      console.log('getLabels', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'getLabels', value: false });
    }
  },
  async addLabel(context, payload) {
    try {
      context.commit('setLoading', { name: 'addLabel', value: true });

      const board = context.rootGetters['boards/selectedBoard'];
      const user = context.rootGetters['user/user'];

      if (!board || !user) {
        throw new Error(
          'Before create a label, make sure you do have a selected board.'
        );
      }

      const data = {
        ...payload,
        boardId: board.id,
        userId: user.id,
        createdAt: Date.now(),
      };

      const response = await LabelsService.addLabel(data);

      data.id = response.id;

      context.commit('addLabel', data);

      toast('Label has been added successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return data;
    } catch (e) {
      console.log('addLabel', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'addLabel', value: false });
    }
  },
  async editLabel(context, payload) {
    try {
      context.commit('setLoading', { name: 'addLabel', value: true });

      const data = { ...payload };

      delete data.id;

      await LabelsService.editLabel(payload.id, data);

      data.id = payload.id;

      context.commit('changeLabel', data);

      toast('Label has been updated successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return data;
    } catch (e) {
      console.log('editLabel', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'addLabel', value: false });
    }
  },
  async deleteLabel(context, payload) {
    try {
      context.commit('setLoading', { name: 'deleteLabel', value: true });

      await LabelsService.deleteLabel(payload);

      context.commit('deleteLabel', payload);

      toast('Label has been deleted successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return payload;
    } catch (e) {
      console.log('deleteLabel', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'deleteLabel', value: false });
    }
  },
  reset(context) {
    context.commit('setState', getLabelsState());
  },
};
