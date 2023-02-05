import { setLoading, setState } from '@/utils';

export default {
  setAttachments(state, payload) {
    state.attachments = payload;
  },
  addAttachment(state, payload) {
    state.attachments.push(payload);
  },
  deleteAttachment(state, payload) {
    state.attachments = state.attachments.filter(
      (attachment) => attachment.id !== payload
    );
  },
  setLoading,
  setState,
};
