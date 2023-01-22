import { setLoading, setState } from '@/utils';

export default {
  setLabels(state, payload) {
    state.labels = payload;
  },
  addLabel(state, payload) {
    state.labels.push(payload);
  },
  changeLabel(state, payload) {
    state.labels = state.labels.map((label) => label.id === payload.id ? {
      ...label,
      ...payload,
    } : label);
  },
  deleteLabel(state, payload) {
    state.labels = state.labels.filter((label) => label.id !== payload);
  },
  setLoading,
  setState,
};
