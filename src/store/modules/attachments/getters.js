export default {
  attachments(state) {
    return state.attachments;
  },
  hasAttachments(state) {
    return !!state.attachments.length;
  },
  getAttachmentsLoading(state) {
    return state.loading.getAttachments;
  },
  addAttachmentLoading(state) {
    return state.loading.addAttachment;
  },
  deleteAttachmentLoading(state) {
    return state.loading.deleteAttachment;
  },
};
