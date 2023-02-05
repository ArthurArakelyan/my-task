import { setLoading, setState } from '@/utils';

export default {
  setChecklist(state, payload) {
    state.checklist = payload;
  },
  addChecklistItem(state, payload) {
    state.checklist.push(payload);
  },
  changeChecklistItem(state, payload) {
    state.checklist = state.checklist.map((item) =>
      item.id === payload.id
        ? {
            ...item,
            ...payload,
          }
        : item
    );
  },
  deleteChecklistItem(state, payload) {
    state.checklist = state.checklist.filter((item) => item.id !== payload);
  },
  setLoading,
  setState,
};
