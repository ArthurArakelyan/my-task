import { toast } from 'vue3-toastify';

// Services
import { LabelsService } from '@/services';

export default {
  async getLabels(context) {
    try {
      context.commit('setLoading', { name: 'getLabels', value: true });

      const board = context.rootGetters['boards/selectedBoard'];

      if (!board?.id) {
        throw new Error('Board is not selected!');
      }

      const response = await LabelsService.getLabels(board.id);

      context.commit('setLabels', response);

      return response;
    } catch (e) {
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

      const response = await LabelsService.addLabel(payload);

      const data = {
        ...payload,
        id: response.id,
      };

      context.commit('addLabel', data);

      toast('Label has been added successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return data;
    } catch (e) {
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

      const originalData = context.getters.labelEditEntry;

      const data = {
        ...originalData,
        ...payload,
      };

      await LabelsService.editLabel(data.id, data);

      context.commit('changeLabel', data);

      toast('Label has been updated successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return data;
    } catch (e) {
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

      await context.dispatch('resetDeleteEntry');

      context.commit('deleteLabel', payload);

      toast('Label has been deleted successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return payload;
    } catch (e) {
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'deleteLabel', value: false });
    }
  },
  selectEditEntry(context, payload) {
    context.commit('setLabelEditEntry', payload);
  },
  selectDeleteEntry(context, payload) {
    context.commit('setLabelDeleteEntry', payload);
  },
  resetEditEntry(context) {
    context.commit('setLabelEditEntry', null);
  },
  resetDeleteEntry(context) {
    context.commit('setLabelDeleteEntry', null);
  },
};
