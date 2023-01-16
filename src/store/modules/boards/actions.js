import { toast } from 'vue3-toastify';

// Services
import { BoardsService } from '@/services';

export default {
  async getBoards(context) {
    try {
      context.commit('setLoading', { name: 'getBoards', value: true });

      const userId = context.rootGetters['auth/id'];

      const response = await BoardsService.getBoards(userId);

      context.commit('setBoards', response);

      return response;
    } catch (e) {
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'getBoards', value: false });
    }
  },
  async addBoard(context, payload) {
    try {
      context.commit('setLoading', { name: 'addBoard', value: true });

      const userId = context.rootGetters['auth/id'];

      const data = {
        ...payload,
        image: '',
        imageName: '',
        userId,
      };

      const response = await BoardsService.addBoard(data);

      const id = response.id;

      if (payload.image?.size) {
        await BoardsService.addImage(payload.image, id);
        data.image = await BoardsService.getImage(id);
        data.imageName = payload.image.name;
        await BoardsService.editBoard(id, data);
      }

      const board = {
        ...data,
        id,
      };

      context.commit('addBoard', board);

      await context.dispatch('selectBoard', board);

      toast('Board has been added successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return board;
    } catch (e) {
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'addBoard', value: false });
    }
  },
  async editBoard(context, payload) {
    try {
      context.commit('setLoading', { name: 'addBoard', value: true });

      const data = { ...payload };

      delete data.id;

      if (payload.image?.size) {
        await BoardsService.addImage(payload.image, payload.id);
        data.image = await BoardsService.getImage(payload.id);
        data.imageName = payload.image.name;
      }

      await BoardsService.editBoard(payload.id, data);

      data.id = payload.id;

      context.commit('changeBoards', data);

      toast('Board has been updated successfully.', {
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
      context.commit('setLoading', { name: 'addBoard', value: false });
    }
  },
  async deleteBoard(context, payload) {
    try {
      context.commit('setLoading', { name: 'deleteBoard', value: true });

      await BoardsService.deleteBoard(payload);

      await context.dispatch('deleteBoardLabels', payload);

      const selectedBoard = context.getters.selectedBoard;

      if (selectedBoard?.id === payload) {
        await context.dispatch('resetSelectedBoard');
      }

      context.commit('deleteBoard', payload);

      await BoardsService.deleteImage(payload);

      toast('Board has been deleted successfully.', {
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
      context.commit('setLoading', { name: 'deleteBoard', value: false });
    }
  },
  async deleteBoardLabels(context, payload) {
    const labels = context.rootGetters['labels/labels'];

    return Promise.all(
      labels.map((label) => {
        if (label.boardId === payload) {
          return context.dispatch('labels/deleteLabel', label.id, { root: true });
        }
      }),
    );
  },
  selectBoard(context, payload) {
    localStorage.setItem('board', JSON.stringify(payload));
    context.commit('setBoard', payload);
  },
  resetSelectedBoard(context) {
    localStorage.removeItem('board');
    context.commit('setBoard', null);
  },
};
