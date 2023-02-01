import mutations from './mutations';
import getters from './getters';
import actions from './actions';

// Utils
import { copyObject } from '@/utils';

const initialState = {
  attachments: [],
  loading: {
    getAttachments: false,
    addAttachment: false,
    deleteAttachment: false,
  },
};

export const getAttachmentsState = () => {
  return copyObject(initialState);
};

export default {
  namespaced: true,
  state() {
    return {
      ...initialState,
    };
  },
  getters,
  actions,
  mutations,
};
