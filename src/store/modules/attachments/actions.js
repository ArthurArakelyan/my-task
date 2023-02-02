import { toast } from 'vue3-toastify';

// Store
import { getAttachmentsState } from './index';

// Services
import { AttachmentService } from '@/services';

export default {
  async getAttachments(context) {
    try {
      context.commit('setLoading', { name: 'getAttachments', value: true });

      const board = context.rootGetters['boards/selectedBoard'];
      const user = context.rootGetters['user/user'];

      if (!board || !user) {
        return;
      }

      const response = await AttachmentService.getAttachments(board.id, user.id);

      context.commit('setAttachments', response);

      return response;
    } catch (e) {
      console.log('getAttachments', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'getAttachments', value: false });
    }
  },
  async addAttachment(context, payload) {
    try {
      context.commit('setLoading', { name: 'addAttachment', value: true });

      const { file, todoId } = payload;

      const board = context.rootGetters['boards/selectedBoard'];
      const userId = context.rootGetters['auth/id'];

      if (!board || !userId) {
        throw new Error('Before attach a file, make sure you do have a selected board.');
      }

      const data = {
        name: file.name,
        type: file.type,
        size: file.size,
        todoId,
        userId,
        boardId: board.id,
        path: '',
        createdAt: Date.now(),
      };

      const response = await AttachmentService.addAttachment(data);

      const id = response.id;

      await AttachmentService.addFile(file, id, userId);

      data.path = await AttachmentService.getFile(id);

      await AttachmentService.editAttachment(id, data);

      data.id = id;

      context.commit('addAttachment', data);

      toast('Attachment has been attached successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return data;
    } catch (e) {
      console.log('addAttachment', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'addAttachment', value: false });
    }
  },
  async deleteAttachment(context, payload) {
    try {
      context.commit('setLoading', { name: 'deleteAttachment', value: true });

      await AttachmentService.deleteAttachment(payload);

      await AttachmentService.deleteFile(payload);

      context.commit('deleteAttachment', payload);

      toast('Attachment has been deleted successfully.', {
        type: 'success',
        hideProgressBar: true,
      });

      return payload;
    } catch (e) {
      console.log('deleteAttachment', e);
      toast(e.message, {
        type: 'error',
        hideProgressBar: true,
      });
    } finally {
      context.commit('setLoading', { name: 'deleteAttachment', value: false });
    }
  },
  reset(context) {
    context.commit('setState', getAttachmentsState());
  },
};
